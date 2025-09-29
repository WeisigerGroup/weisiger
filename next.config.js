const withMakeswift = require('@makeswift/runtime/next/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/forced-labor-policy',
        destination: 'vendor-code-of-conduct',
        permanent: true
      }
    ]
  }
}

module.exports = withMakeswift(nextConfig)
