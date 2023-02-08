import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/id",
    },
    props: {},
  };
};

const Content = () => null;

export default Content;
