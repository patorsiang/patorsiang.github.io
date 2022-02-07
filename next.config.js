/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? 'https://cdn.statically.io/gh/NaveenDA/naveenda.github.io/gh-pages/' : '',
}

module.exports = nextConfig
