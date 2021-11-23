import React from "react"
import Reader from "../../../screens/Reader"
import PropTypes from "prop-types"
import { findChapterWithTextBlobServerCall } from "../../api/chapters/[number]"
import { findBookServerCall } from "../../api/books/[bookId]"

export async function getServerSideProps(context) {
  const { bookId, chapterNumber } = context.params
  const props = {}
  //todo: boost efficiency by promise all and find way to save title
  const book = await findBookServerCall({ bookId })
  props.bookTitle = book.payload.title
  const initialChapter = await findChapterWithTextBlobServerCall({
    bookId,
    number: chapterNumber,
  })
  if (initialChapter.success) {
    const { text, ...rest } = initialChapter.payload
    props.initialChapter = JSON.parse(JSON.stringify(rest))
    props.initialText = text
  } else return { props: { errorMessage: initialChapter.message } }
  return { props }
}

const ReaderPage = (props) => <Reader {...props} />

ReaderPage.propTypes = {
  errorMessage: PropTypes.string,
  initialChapter: PropTypes.object,
  initialText: PropTypes.string,
  bookTitle: PropTypes.string,
}

ReaderPage.defaultProps = {
  errorMessage: null,
  initialChapter: null,
  initialText: "",
  bookTitle: "",
}

export default ReaderPage
