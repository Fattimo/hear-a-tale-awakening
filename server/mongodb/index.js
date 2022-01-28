import mongoose from "mongoose"
import urls from "../../utils/urls"

export default async () => {
  if (mongoose.connections[0].readyState) return

  await mongoose
    .connect(urls.dbUrl, {
      dbName: process.env.DB_NAME,
    })
    .catch((e) => {
      console.error("Error connecting to database.")
      throw e
    })
}
