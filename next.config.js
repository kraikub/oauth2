/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
}

module.exports = nextConfig
