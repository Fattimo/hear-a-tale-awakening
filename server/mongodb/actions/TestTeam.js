import mongoDB from "../index"
import TestTeam from "../models/TestTeam"

export async function findTeamMemberByName({ name }) {
  await mongoDB()

  const member = await TestTeam.find({ name: name })

  return member[0]
}
