import { roleMap } from "./../config/org";
import { mailService } from "./../mail/index";
import { appConfig } from "./../config/app";
import { redis } from "./../../data/redis/index";
import { checkRedisTopic, testOrgUsername } from "./../utils/string";
import { userRepository } from "./../repositories/user";
import { roleRepo } from "./../repositories/role";
import { orgRepo } from "./../repositories/organization";
import { random, sha256 } from "./../utils/crypto";
import { builtInRoles } from "../config/org";
import { p } from "../../src/utils/path";
import axios from "axios";
class OragnizationUsecase {
  isUsernameAvailable = async (
    username: string
  ): Promise<UseCaseResult<{ available: boolean }>> => {
    if (!testOrgUsername(username)) {
      return {
        success: true,
        message: "Invalid username pattern (regex test failed)",
        data: {
          available: false,
        },
      };
    }
    const o = await orgRepo.getWithUserName(username);
    const u = await userRepository.findWithUsername(username);
    if (o || u) {
      return {
        success: true,
        message: "Username already taken",
        data: {
          available: false,
        },
      };
    }
    return {
      success: true,
      message: "",
      data: {
        available: true,
      },
    };
  };
  //////////////////////////////////////////////////////////////////////////////////////
  isNameAvailable = async (orgName: string): Promise<UseCaseResult> => {
    const o = await orgRepo.getWithName(orgName);
    return {
      success: true,
      message: o ? "This name is already taken" : "",
      data: {
        available: o ? false : true,
      },
    };
  };
  //////////////////////////////////////////////////////////////////////////////////////
  createNewOrg = async (
    orgName: string,
    orgUsername: string,
    ownerUid: string,
    position: string
  ): Promise<UseCaseResult<{ orgId: string }>> => {
    const generatedId = sha256(ownerUid + random(48));
    const oName = await orgRepo.getWithName(orgName);
    const oUserName = await orgRepo.getWithUserName(orgUsername);
    if (oName || oUserName) {
      return {
        success: false,
        message: "Name or username already taken",
      };
    }
    if (!testOrgUsername(orgUsername)) {
      return {
        success: false,
        message: "Username regex test was not pass",
      };
    }

    const org: Organization = {
      orgId: generatedId,
      orgName,
      orgUsername,
      owner: ownerUid,
      availableRoles: [],
    };
    await orgRepo.create(org);
    await userRepository.setOrgId(ownerUid, org.orgId);
    const ownerRole: Role<OrganizationRoleData> = {
      roleId: sha256(org.orgId + org.owner + random(30)),
      userRef: ownerUid,
      roleRef: org.orgId,
      ...builtInRoles.owner,
      data: {
        displayPosition: position,
      },
    };
    await roleRepo.create(ownerRole);
    return {
      success: true,
      message: "Create complete",
      data: {
        orgId: org.orgId,
      },
    };
  };
  //////////////////////////////////////////////////////////////////////////////////////
  inviteNewMember = async (
    orgId: string,
    member: string,
    operator: string,
    priority: number,
    position: string
  ): Promise<UseCaseResult> => {
    const operatorRole = await roleRepo.getRoleOfUserInOrg(orgId, operator);
    if (!operatorRole) {
      return {
        success: false,
        message: "Cannot find operator role",
        httpStatus: 405,
      };
    }
    if (operatorRole.priority > 2 || priority <= operatorRole.priority) {
      return {
        success: false,
        message: "Require more permission",
        httpStatus: 405,
      };
    }
    const operatorData = await userRepository.findOne({ uid: operator });
    const memberData = await userRepository.findOne({ uid: member });
    const organization = await orgRepo.get(orgId);
    if (
      !memberData ||
      !memberData.personalEmail ||
      !organization ||
      !operatorData
    ) {
      return {
        success: false,
        message: "Unprocessable user(s) or organization",
        httpStatus: 422,
      };
    }

    if (
      memberData.orgId && memberData.orgId !== orgId
    ) {
      return {
        success: false,
        message: "This user is already in another organization",
        httpStatus: 422,
      };
    }

    if (
      memberData.orgId && memberData.orgId === orgId
    ) {
      return {
        success: false,
        message: "This user is already in this organization",
        httpStatus: 422,
      };
    }

    const role = roleMap[priority];
    if (!role) {
      return {
        success: false,
        message: "Undefined role",
        httpStatus: 422,
      };
    }

    const fullRole: Role<OrganizationRoleData> = {
      ...role,
      data: {
        displayPosition: position,
      },
      roleId: sha256(orgId + member + role.priority + operator + random(16)),
      roleRef: orgId,
      userRef: member,
    };

    const redisKey = "orgjoin:" + sha256(orgId + member);

    await redis.set(
      redisKey,
      JSON.stringify(fullRole),
      appConfig.expirations.invites.s
    );
    try {
      await mailService.inviteToOrg(memberData.personalEmail, {
        name: memberData.fullName,
        code: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${p.organizationInviteLanding}?vssid=${redisKey}`,
        orgName: organization.orgName,
        orgUsername: organization.orgUsername,
        position: position,
        by: operatorData.fullName,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: "Operation on mail service failed",
          httpStatus: 500,
          data: {
            mailServiceResponse: error.response
              ? error.response.data
              : undefined,
            mailServiceErrorCode: error.code,
            mailServiceErrorCause: error.cause,
            mailServiceErrorStatus: error.status,
          },
        };
      }
    }

    return {
      success: true,
      message: "Member invited",
    };
  };
  //////////////////////////////////////////////////////////////////////////////////////
  activateInvite = async (redisKey: string): Promise<UseCaseResult> => {
    if (!checkRedisTopic(redisKey, "orgjoin")) {
      return {
        success: false,
        message: "Invalid key",
      };
    }
    const r = await redis.get(redisKey);
    const fullRole = JSON.parse(r) as Role<OrganizationRoleData>;
    await roleRepo.create(fullRole);
    await userRepository.setOrgId(fullRole.userRef, fullRole.roleRef);
    await redis.delete(redisKey);
    return {
      success: true,
    };
  };
  //////////////////////////////////////////////////////////////////////////////////////
  getOrgForDisplay = async (orgId: string) => {
    return await orgRepo.getFullOrg(orgId);
  };
  //////////////////////////////////////////////////////////////////////////////////////
  updateRole = async (
    orgId: string,
    assigneeId: string,
    assignerId: string,
    priority: number
  ): Promise<UseCaseResult> => {
    // Check assigner
    const assigner = await userRepository.findOne({ uid: assignerId });
    if (!assigner) {
      return {
        success: false,
        message: "Unidentify assigner.",
        httpStatus: 422,
      };
    }
    if (assigner.orgId !== orgId) {
      return {
        success: false,
        message: "Organization not matched.",
        httpStatus: 422,
      };
    }

    // Check assignee
    const assignee = await userRepository.findOne({ uid: assigneeId });
    if (!assignee) {
      return {
        success: false,
        message: "Unidentify assignee.",
        httpStatus: 422,
      };
    }
    if (assignee.orgId !== orgId) {
      return {
        success: false,
        message: "Organization not matched.",
        httpStatus: 422,
      };
    }

    /// Check if both users are valid to the org role.
    const assignerRole = await roleRepo.getOrgRole(orgId, assigner.uid);
    const assigneeRole = await roleRepo.getOrgRole(orgId, assignee.uid);
    if (!assignerRole || !assigneeRole) {
      return {
        success: false,
        message: "Cannot compare assigner and assignee roles.",
        httpStatus: 409,
      };
    }

    // Check priority
    if (assignerRole.priority >= assigneeRole.priority) {
      return {
        success: false,
        message:
          "Assigner does not have a permission on this operation. (Assignee has more priority)",
        httpStatus: 405,
      };
    }
    if (priority <= assignerRole.priority) {
      return {
        success: false,
        message:
          "Assigner did not have a permission on this operation. (Out of priority)",
        httpStatus: 405,
      };
    }

    // Handle role changes
    const newRole: BuiltInRole | undefined = roleMap[priority];
    if (!newRole) {
      return {
        success: false,
        message: "Cannot specify the input role.",
        httpStatus: 422,
      };
    }
    const updatedFields = {
      roleName: newRole.roleName,
      roleType: newRole.roleType,
      priority: newRole.priority,
    };

    const updateResult = await roleRepo.updateOrgRole(
      orgId,
      assignee.uid,
      updatedFields
    );
    if (!updateResult) {
      return {
        success: false,
        message:
          "Cannot update role. (Role not matched any entitiy in the collection)",
        httpStatus: 409,
      };
    }
    return {
      success: true,
    };
  };
  //////////////////////////////////////////////////////////////////////////////////////
  leave = async (uid: string): Promise<UseCaseResult> => {
    const user = await userRepository.findOne({ uid });
    if (!user) {
      return {
        success: false,
        message: "Cannot find any matched user.",
        httpStatus: 422,
      };
    }
    const org = await orgRepo.get(user.orgId);
    if (!org) {
      return {
        success: false,
        message: "User is not in any organization.",
        httpStatus: 422,
      };
    }
    const orgRole = await roleRepo.getOrgRole(user.orgId, user.uid);
    if (!orgRole) {
      return {
        success: false,
        message: "Cannot find any matched user's role.",
        httpStatus: 422,
      };
    }
    if (orgRole.priority === 0) {
      return {
        success: false,
        message: "Owner cannot leave org.",
        httpStatus: 422,
      };
    }
    // Handle deletions
    await roleRepo.deleteOrgRole(user.orgId, user.uid);
    await userRepository.setOrgId(user.uid, "");
    return {
      success: true,
      message: "",
    };
  };
  //////////////////////////////////////////////////////////////////////////////////////
  removeMember = async (
    orgId: string,
    assigneeId: string,
    assignerId: string
  ): Promise<UseCaseResult> => {
    // Check assigner
    const assigner = await userRepository.findOne({ uid: assignerId });
    if (!assigner) {
      return {
        success: false,
        message: "Unidentify assigner.",
        httpStatus: 422,
      };
    }
    if (assigner.orgId !== orgId) {
      return {
        success: false,
        message: "Organization not matched.",
        httpStatus: 422,
      };
    }

    // Check assignee
    const assignee = await userRepository.findOne({ uid: assigneeId });
    if (!assignee) {
      return {
        success: false,
        message: "Unidentify assignee.",
        httpStatus: 422,
      };
    }
    if (assignee.orgId !== orgId) {
      return {
        success: false,
        message: "Organization not matched.",
        httpStatus: 422,
      };
    }

    /// Check if both users are valid to the org role.
    const assignerRole = await roleRepo.getOrgRole(orgId, assigner.uid);
    const assigneeRole = await roleRepo.getOrgRole(orgId, assignee.uid);
    if (!assignerRole || !assigneeRole) {
      return {
        success: false,
        message: "Cannot compare assigner and assignee roles.",
        httpStatus: 409,
      };
    }

    // Check priority
    if (assignerRole.priority >= assigneeRole.priority) {
      return {
        success: false,
        message:
          "Assigner does not have a permission on this operation. (Assignee has more priority)",
        httpStatus: 405,
      };
    }
    if (assignerRole.priority > 2) {
      return {
        success: false,
        message:
          "Assigner did not have a permission on this operation. (Out of priority)",
        httpStatus: 405,
      };
    }
    // Handle removal
    await roleRepo.deleteOrgRole(assignee.orgId, assignee.uid);
    await userRepository.setOrgId(assignee.uid, "");
    return {
      success: true,
      message: "",
    };
  };
}
export const orgUsecase = new OragnizationUsecase();
