import mongoose from "mongoose"

const { Schema } = mongoose

const TextBlobSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
})

export default mongoose.models.TextBlob ??
  mongoose.model("TextBlob", TextBlobSchema)
