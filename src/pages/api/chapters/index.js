import { findChaptersByBook } from '../../../../server/mongodb/actions/Chapter'

/**
 * Should have bookid if you want to query for chapters of that book
 * @param {*} q: { bookId: required }
 * @returns
 */
export const findChaptersServerCall = async (q = {}) => {
  try {
    const { bookId } = q
    if (!bookId) throw Error('No Book Id')
    const chapters = await findChaptersByBook({ bookId })
    return {
      success: true,
      payload: chapters,
    }
  } catch (e) {
    return {
      success: false,
      message: 'Failed to run action!',
    }
  }
}

// @route   POST api/example
// @desc    Example API
// @access  Public
const handler = (req, res) =>
  findChaptersServerCall(req.query).then((payload) => {
    if (payload.success) res.status(200)
    else res.status(500)
    res.json(payload)
  })

export default handler
