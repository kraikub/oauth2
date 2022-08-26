/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config;
  },
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID: process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID,
    NEXT_PUBLIC_ACCOUNTS_API_CALLBACK_ENV: process.env.NEXT_PUBLIC_ACCOUNTS_API_CALLBACK_ENV,
  },
  env: {
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URL: process.env.MONGODB_URL,
    MYKU_APPKEY: process.env.MYKU_APPKEY,
    MYKU_AUTH_URL: process.env.MYKU_AUTH_URL,
    NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID: process.env.NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID,
    NEXT_PUBLIC_ACCOUNTS_API_CALLBACK_ENV: process.env.NEXT_PUBLIC_ACCOUNTS_API_CALLBACK_ENV,
  }
}

module.exports = nextConfig
