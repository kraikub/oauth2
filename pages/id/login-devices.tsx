import { GetServerSideProps } from "next";
import { FC } from "react";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { logRepository } from "../../api/repositories/log";
import { userRepository } from "../../api/repositories/user";
import { UserProvider } from "../../src/contexts/User";
import { AppLayout } from "../../src/layouts/AppLayout";
import { jsonSerialize } from "../../src/utils/json";
import { UserLogsPage } from "../../src/views/kraikub-id/login-devices";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid, ssid } = PageAuthMiddleware(context.req.cookies.access);
  const user = await userRepository.findOne({ uid });
  if (!uid || !user) {
    return {
      props: {
        user: null,
        logs: null,
        ssid: "",
      },
    };
  }
  const devices = await logRepository.getUserLogsWithApps(uid);
  return {
    props: {
      user: jsonSerialize(user),
      logs: jsonSerialize(devices),
      ssid: ssid || "",
    },
  };
};

interface LoginDevicesProps {
  user: UserVariant;
  logs: LogDTO[];
  ssid: string;
}

const LoginDevice: FC<LoginDevicesProps> = ({ user, logs, ssid }) => {
  return (
    <UserProvider user={user}>
      <AppLayout>
        <UserLogsPage logs={logs} ssid={ssid} />
      </AppLayout>
    </UserProvider>
  );
};
export default LoginDevice;
