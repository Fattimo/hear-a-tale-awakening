import mongoose from "mongoose"

const { Schema } = mongoose

const ChapterSchema = new Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  textId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TextBlob",
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
})

export default mongoose.models.Chapter ??
  mongoose.model("Chapter", ChapterSchema)
