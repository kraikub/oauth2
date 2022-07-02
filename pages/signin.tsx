import type { NextPage } from 'next'
import Head from 'next/head'
import SigninPage from '../src/views/signin'

const Signin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <SigninPage />
    </>
  )
}

export default Signin
