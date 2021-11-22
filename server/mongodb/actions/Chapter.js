import mongodb from ".."
import Chapter from "../models/Chapter"
import TextBlob from "../models/TextBlob"

export async function findChaptersByBook({ bookId }) {
  await mongodb()

  const chapters = await Chapter.find({ bookId: bookId })

  return chapters
}

export async function findChapterWithTextBlob({ chapterId }) {
  await mongodb()

  const chapter = Chapter.findById(chapterId)
  const text = TextBlob.findById(chapter.textId)

  return {
    ...chapter,
    text: text.text,
  }
}
