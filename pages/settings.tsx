import { GetServerSideProps } from "next";
import { PageAuthMiddleware } from "../api/middlewares/auth.middleware";
import { aggregations } from "../data/aggregations";
import { UserModel } from "../data/models/user";
import { mongodb } from "../data/mongo";
import { jsonSerialize } from "../src/utils/json";

export { SettingPage as default } from "../src/views/settings";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = PageAuthMiddleware(context.req.cookies.access);
  await mongodb.connect();
  if (!uid) {
    return {
      props: {
        user: null,
      },
    };
  }
  const u = await UserModel.aggregate([
    ...aggregations.private.user(uid),
  ]);

  return {
    props: {
      user: u.length ? jsonSerialize(u[0]) : null,
    },
  };
};