/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['docs.google.com', 'gotaku1.com', 'www3.gogoanimes.f', 'gogocdn.net']
    },
    async redirects() {
        return [
            {
            source: '/',
            destination: '/Anime',
            permanent: false,
            },
            {
            source: '/admin',
            destination: '/api/auth',
            permanent: false,
            },
            {
            source: '/status',
            destination: '/Adm/AnimeStatus',
            permanent: false,
            },
        ]
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
