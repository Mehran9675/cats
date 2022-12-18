/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
  },

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
