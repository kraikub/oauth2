import { GetServerSideProps } from "next";
import { getSigninUrl } from "../../src/utils/path";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: getSigninUrl({}),
    },
    props: {},
  };
};

const Content = () => null;

export default Content;
