
/** @type {import('next').NextConfig} */
const withMakeswift = require('@makeswift/runtime/next/plugin')()

const nextConfig = {
  reactStrictMode: true,
}
module.exports = withMakeswift(nextConfig)


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})