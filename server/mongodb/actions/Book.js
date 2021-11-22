import mongoDB from "../index"
import Book from "../models/Book"

export async function findBook(query) {
  await mongoDB()

  const book = await Book.findOne(query)

  return book
}

export async function findBookById(id) {
  await mongoDB()

  const book = await Book.findById(id)

  return book
}

export async function findBooksByAuthor({ author }) {
  await mongoDB()

  const books = await Book.find({ author: author })

  return books
}
