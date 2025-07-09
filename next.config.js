/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  output: "export",
  reactStrictMode: true,
  eslint: {
        ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
