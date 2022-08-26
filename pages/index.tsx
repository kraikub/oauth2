import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../src/layouts/Footer";
import StaticNavbar from "../src/layouts/StaticNavbar";
import { getSigninUrl } from "../src/utils/path";
import HomePage from "../src/views/home";


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kraikub - Authenticate any KU students.</title>
      </Head>
      <StaticNavbar />
      <HomePage />
      <Footer />
    </>
  );
};

export default Home;
