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
class OragnizationUsecase {
  isUsernameAvailable = async (orgUsername: string): Promise<UseCaseResult> => {
    if (!testOrgUsername(orgUsername)) {
      return {
        success: true,
        message: "Regex test failed",
        data: {
          available: false,
        },
      };
    }
    const o = await orgRepo.getWithUserName(orgUsername);
    return {
      success: true,
      data: {
        available: o ? false : true,
      },
    };
  };

  isNameAvailable = async (orgName: string): Promise<UseCaseResult> => {
    const o = await orgRepo.getWithName(orgName);
    return {
      success: true,
      data: {
        available: o ? false : true,
      },
    };
  };

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

  inviteNewMember = async (
    orgId: string,
    member: string,
    operator: string,
    role: RolePrototype<OrganizationRoleData>
  ): Promise<UseCaseResult> => {
    const operatorRole = await roleRepo.getRoleOfUserInOrg(orgId, operator);
    if (!operatorRole) {
      return {
        success: false,
        message: "Cannot find operator role",
        httpStatus: 405,
      };
    }
    if (operatorRole.priority > 2) {
      return {
        success: false,
        message: "Require permission",
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

    const fullRole: Role<OrganizationRoleData> = {
      ...role,
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
    await mailService.inviteToOrg(memberData.personalEmail, {
      code: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}${p.organizationInviteLanding}?vssid=${redisKey}`,
      orgName: organization.orgName,
      orgUsername: organization.orgUsername,
      position: role.data.displayPosition,
      by: operatorData.fullName,
    });

    return {
      success: true,
      message: "Member invited",
    };
  };

  activateInvite = async (redisKey: string): Promise<UseCaseResult> => {
    if (!checkRedisTopic(redisKey, "orgjoin")) {
      return {
        success: false,
        message: "Invalid key"
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

  getOrgForDisplay = async (orgId: string) => {
    return await orgRepo.getFullOrg(orgId);
  };
}
export const orgUsecase = new OragnizationUsecase();
