import mongodb from ".."
import Chapter from "../models/Chapter"
import TextBlob from "../models/TextBlob"

export async function findChaptersByBook({ bookId }) {
  await mongodb()

  const chapters = await Chapter.find({ bookId: bookId })

  return chapters
}

export async function findChapterWithTextBlob({ bookId, number }) {
  await mongodb()

  const chapter = await Chapter.findOne({ bookId, number })
  if (!chapter) return "No Chapter Found"
  const text = await TextBlob.findById(chapter.textId)
  return {
    ...chapter.toObject(),
    text: text.text,
  }
}
