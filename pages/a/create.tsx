import { GetServerSideProps } from "next";
import { PageAuthMiddleware } from "../../api/middlewares/auth.middleware";
import { userRepository } from "../../api/repositories/user";
import { aggregations } from "../../data/aggregations";
import { jsonSerialize } from "../../src/utils/json";

export { CreateProjectPage as default } from "../../src/views/projects/manager/create";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid, error } = PageAuthMiddleware(context.req.cookies.access);
  if (!uid) {
    return {
      props: {
        data: null,
      },
    };
  }
  const u = await userRepository.useAggregationPipeline([
    ...aggregations.private.user(uid),
    ...aggregations.private.apps,
    ...aggregations.private.student(),
  ]);

  return {
    props: {
      data: u.length ? (jsonSerialize(u[0]) as UserWithApplication) : null,
    },
  };
};