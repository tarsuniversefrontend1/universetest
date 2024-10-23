/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "test2.tarsuniverse.com",
      "test.tarsuniverse.com",
      "tarsuniverse.netlify.app",
    ],
    unoptimized: true,
  },
  // output: "export",
  // reactStrictMode: true,
  // trailingSlash: true,
  // swcMinify: true,
  // distDir: "build",
};

export default nextConfig;
