import { findBooks } from "../../../../server/mongodb/actions/Book"

export const findBooksServerCall = async () => {
  try {
    const books = await findBooks()
    return {
      success: true,
      payload: books,
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
  findBooksServerCall().then((payload) => {
    if (payload.success) res.status(200)
    else res.status(500)
    res.json(payload)
  })

export default handler
