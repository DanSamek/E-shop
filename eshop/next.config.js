/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
        {
            source: '/robots.txt',
            destination: '/api/robots'
        },
        {
          source: '/feed.xml',
          destination: '/api/feed'
        }
    ];
}
}

module.exports = nextConfig
