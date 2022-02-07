import {
  findBook,
  findBookById,
} from '../../../../../server/mongodb/actions/Book'

import mongoose from 'mongoose'

export const findBookServerCall = async (q = {}) => {
  try {
    const { bookId, title, author } = q
    let book
    if (mongoose.isValidObjectId(bookId)) book = await findBookById(bookId)
    if (!book) {
      const query = {}
      if (title) query.title = title
      if (author) query.author = author
      book = await findBook(query)
    }
    return {
      success: true,
      payload: book,
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
  findBookServerCall(req.query).then((payload) => {
    if (payload.success) res.status(200)
    else res.status(500)
    res.json(payload)
  })

export default handler
