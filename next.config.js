/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // 미들웨어에서 response를 조작하기위함 (Auth)
    allowMiddlewareResponseBody: true,
  },
  // pageExtensions: ['page.tsx', 'page.jsx',],
}

module.exports = nextConfig
