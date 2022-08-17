/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "help.twitter.com",
      "res.cloudinary.com",
      "cdn.cms-twdigitalassets.com",
    ],
  },
};

module.exports = nextConfig;
