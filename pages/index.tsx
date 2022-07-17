import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import HomePage from '../src/views/home'


const Home: NextPage = () => {
  console.log("env", process.env)
  return (
    <>
      <Head>
        <title>Katrade Accounts</title>
      </Head>
      <HomePage />
    </>
  )
}

export default Home
