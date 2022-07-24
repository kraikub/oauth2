import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getSigninUrl } from "../src/utils/path";
import HomePage from "../src/views/home";


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Katrade Accounts</title>
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
