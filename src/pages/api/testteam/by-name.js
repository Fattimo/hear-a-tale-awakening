import { findTeamMemberByName } from "../../../../server/mongodb/actions/TestTeam"

// @route   GET api/testteam/by-name?name={name}
// @desc    Get current user from cookie
// @access  Public
const handler = (req, res) =>
  findTeamMemberByName({ name: req.query.name })
    .then((member) =>
      res.status(200).json({
        success: true,
        payload: member,
      })
    )
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    })

export default handler
