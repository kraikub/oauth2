import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getSigninUrl } from "../src/utils/path";
import HomePage from "../src/views/home";

interface HomePageProps {
  signinUrl: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      signinUrl: getSigninUrl(),
    },
  };
};

const Home: NextPage<HomePageProps> = ({ signinUrl }) => {
  console.log("env", process.env);
  return (
    <>
      <Head>
        <title>Katrade Accounts</title>
      </Head>
      <HomePage signinUrl={signinUrl} />
    </>
  );
};

export default Home;
