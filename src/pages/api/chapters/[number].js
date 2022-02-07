import { findChapterWithTextBlob } from '../../../../server/mongodb/actions/Chapter'

/**
 * Should have bookid if you want to query for chapters of that book
 * @param {*} q: { bookId: required }
 * @returns
 */
export const findChapterWithTextBlobServerCall = async (q = {}) => {
  try {
    const { bookId, number } = q
    if (!bookId) throw Error('No Book Id')
    if (!number) throw Error('No chapter number')
    const chapter = await findChapterWithTextBlob({ bookId, number })
    if (chapter === 'No Chapter Found')
      return {
        success: true,
        payload: 'No Chapter Found',
      }
    return {
      success: true,
      payload: chapter,
    }
  } catch (e) {
    return {
      success: false,
      message: e.message,
    }
  }
}

// @route   POST api/example
// @desc    Example API
// @access  Public
const handler = (req, res) =>
  findChapterWithTextBlobServerCall(req.query).then((payload) => {
    if (payload.success) res.status(200)
    else res.status(500)
    res.json(payload)
  })

export default handler
