const withImages = require("next-images")

module.exports = withImages({
  env: {
    BASE_URL: process.env.BASE_URL,
    MONGO_DB: process.env.MONGO_DB,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  build: {
    env: {
      BASE_URL: process.env.BASE_URL,
      MONGO_DB: process.env.MONGO_DB,
      JWT_SECRET: process.env.JWT_SECRET,
    },
  },
  images: {
    disableStaticImages: true,
  },
})
