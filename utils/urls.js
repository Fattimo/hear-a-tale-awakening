export default {
  baseUrl: process.env.BASE_URL
    ? process.env.BASE_URL
    : "http://localhost:3000",
  dbUrl: process.env.MONGO_DB ?? "mongodb://localhost:27017",
  pages: {
    index: "/",
    ssr: "/ssr",
    app: {
      home: "/app",
    },
  },
  api: {
    example: "/api/example",
    testTeam: {
      byName: "/api/testteam/by-name",
    },
  },
}
