/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "test.tarsuniverse.com",
      "test2.tarsuniverse.com",
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
