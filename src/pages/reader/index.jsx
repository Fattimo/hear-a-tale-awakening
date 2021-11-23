import React from "react"
import PropTypes from "prop-types"
import { findBooksServerCall } from "../api/books"
import Link from "next/link"

export async function getServerSideProps() {
  const props = {}
  const books = await findBooksServerCall()
  if (books.success) props.books = JSON.parse(JSON.stringify(books.payload))
  else return { props: { errorMessage: books.message } }
  return { props }
}

const Reader = ({ books, errorMessage }) => {
  return (
    <div>
      {errorMessage && <div>Error: {errorMessage}</div>}
      {books.map((book) => (
        <Link
          key={book.title + ": " + book.author}
          href={`/reader/${book._id}`}
        >
          <a>{book.title}</a>
        </Link>
      ))}
    </div>
  )
}

Reader.propTypes = {
  errorMessage: PropTypes.string,
  books: PropTypes.array,
}

Reader.defaultProps = {
  errorMessage: null,
  books: [],
}

export default Reader
