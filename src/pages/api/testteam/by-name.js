import { findTeamMemberByName } from "../../../../server/mongodb/actions/TestTeam"

export const teamByNameServerCall = async ({ name }) => {
  try {
    const member = await findTeamMemberByName({ name })
    return {
      success: true,
      payload: member,
    }
  } catch (e) {
    return {
      success: false,
      message: "Failed to run action!",
    }
  }
}

// @route   POST api/example
// @desc    Example API
// @access  Public
const handler = (req, res) =>
  teamByNameServerCall({ name: req.query.name }).then((payload) => {
    if (payload.success) res.status(200)
    else res.status(500)
    res.json(payload)
  })

export default handler
