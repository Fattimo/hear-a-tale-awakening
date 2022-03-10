export default {
  baseUrl: process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000',
  dbUrl: process.env.MONGO_DB ?? 'mongodb://localhost:27017',
  pages: {
    index: '/',
    ssr: '/ssr',
    reader: '/reader',
  },
  api: {
    example: '/api/example',
    testTeam: {
      byName: '/api/testteam/by-name',
    },
    books: {
      index: '/api/books',
    },
    chapters: {
      index: '/api/chapters',
    },
  },
}
