import mongoose from "mongoose"

const { Schema } = mongoose

const TestTeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  favorite_food: {
    type: String,
    required: true,
  },
})

export default mongoose.models.TestTeam ??
  mongoose.model("TestTeam", TestTeamSchema)
