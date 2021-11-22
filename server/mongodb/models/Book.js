import mongoose from "mongoose"

const { Schema } = mongoose

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  aboutAuthor: {
    type: String,
    required: false,
  },
})

export default mongoose.models.Book ?? mongoose.model("Book", BookSchema)
