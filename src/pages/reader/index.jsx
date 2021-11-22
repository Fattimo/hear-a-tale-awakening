import React from "react"
import ReaderHome from "../../screens/ReaderHome"
import PropTypes from "prop-types"
import { findBookServerCall } from "../api/books/[bookId]"
import { findChaptersServerCall } from "../api/chapters"

export async function getServerSideProps() {
  const book = await findBookServerCall()
  const props = {}
  if (book.success) props.book = JSON.parse(JSON.stringify(book.payload))
  else return { props: { errorMessage: book.message } }
  const chapters = await findChaptersServerCall({ bookId: book.payload._id })
  if (chapters.success) props.chapters = JSON.parse(JSON.stringify(chapters.payload))
  else return { props: { errorMessage: chapters.message } }
  return { props }
}

const Reader = (props) => <ReaderHome {...props} />

Reader.propTypes = {
  errorMessage: PropTypes.string,
  book: PropTypes.object,
  chapters: PropTypes.array,
}

Reader.defaultProps = {
  errorMessage: null,
  book: null,
  chapters: [],
}

export default Reader
