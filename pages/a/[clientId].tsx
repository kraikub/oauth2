import { GetServerSideProps, NextPage } from "next";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { applicationRepository } from "../../api/repositories/application";
import { roleRepo } from "../../api/repositories/role";
import { userRepository } from "../../api/repositories/user";
import { applicationUsecase, userUsecase } from "../../api/usecases";
import { isAppManager } from "../../api/utils/role";

import { UserProvider } from "../../src/contexts/User";
import { jsonSerialize } from "../../src/utils/json";
import ClientPage from "../../src/views/projects/manager/client";

export const getServerSideProps: GetServerSideProps<
  ClientPageServerSideProps
> = async (context) => {
  const { uid } = PageAuthMiddleware(context.req.cookies.access);
  const clientId = context.params?.clientId;
  if (!uid || typeof clientId !== "string") {
    return {
      props: {
        user: null,
        app: null,
      },
    };
  }
  const user = await userRepository.findOne({ uid });
  const app = await applicationRepository.findOneApp({ clientId: clientId });
  
  if (!user || !app) {
    return {
      props: {
        user: null,
        app: null,
      },
    };
  }

  if (app.refType === "user") {
    if (user.uid !== app.ownerId) {
      return {
        props: {
          user: null,
          app: null,
          permission: false,
        },
      };
    }
  } else if (app.refType === "org") {
    const role = await roleRepo.getOrgRole(user.orgId, user.uid);
    if (!role) {
      return {
        props: {
          user: null,
          app: null,
          permission: false,
        },
      };
    }
    if (!isAppManager(role.priority)) {
      return {
        props: {
          user: null,
          app: null,
          permission: false,
        },
      };
    }
  } 

  return {
    props: {
      user: jsonSerialize(user),
      app: jsonSerialize(app),
      permission: true,
    },
  };
};

const Client: NextPage<ClientPageServerSideProps> = (props) => {
  return (
    <UserProvider user={props.user}>
      <ClientPage {...props} />
    </UserProvider>
  );
};

export default Client;
