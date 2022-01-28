import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import styles from "./Reader.module.css"
import { getChapterWithBlob } from "src/actions/Chapters"
import { useRouter } from "next/dist/client/router"
import Paginator from "../../components/Reader/Paginator"

const Reader = ({ initialChapter, initialText, errorMessage, bookTitle }) => {
  const router = useRouter()

  const [optionsIsOpen, setOptionsIsOpen] = useState(false)
  const [options, setOptions] = useState({ readerMode: "page" })

  const changeMode = (e) => {
    setOptions({
      ...options,
      readerMode: e.target.value,
    })
  }

  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(false)
  const [end, setEnd] = useState(false)
  const [currChapter, setCurrentChapter] = useState(0) // index in chapters
  const chapterRange = useRef([])
  useEffect(() => {
    setChapters([{ ...initialChapter, text: initialText }])
    chapterRange.current = [initialChapter.number, initialChapter.number]
    markInProgress(initialChapter.number)
  }, [initialChapter, initialText])

  const markInProgress = (number) => {
    const statuses = JSON.parse(window.localStorage.getItem(bookTitle))
    if (!statuses[number]) statuses[number] = "inprogress"
    window.localStorage.setItem(bookTitle, JSON.stringify(statuses))
  }

  const markComplete = (number) => {
    const statuses = JSON.parse(window.localStorage.getItem(bookTitle))
    statuses[number] = "complete"
    window.localStorage.setItem(bookTitle, JSON.stringify(statuses))
  }

  const getNextChapter = async () => {
    if (end) return
    setLoading(true)
    const nextChapter = await getChapterWithBlob({
      bookId: initialChapter.bookId,
      number: chapterRange.current[1] + 1,
    })
    markComplete(chapterRange.current[1])
    if (nextChapter === "No Chapter Found") {
      setLoading(false)
      setEnd(true)
      return
    }
    setChapters([...chapters, nextChapter])
    markInProgress(chapterRange.current[1] + 1)
    chapterRange.current[1] += 1
  }

  const getPrevChapter = async () => {
    if (chapterRange.current[0] === 1) return
    setLoading(true)
    const prevChapter = await getChapterWithBlob({
      bookId: initialChapter.bookId,
      number: chapterRange.current[0] - 1,
    })
    setChapters([prevChapter, ...chapters])
    const id = `${chapters[0].number}:${chapters[0].name}`
    chapterRange.current[0] -= 1
    markComplete(chapterRange.current[0])
    setCurrentChapter(currChapter + 1)
    return id
  }

  const changeQs = (isNextChapter) => {
    const newChapter = isNextChapter
      ? Math.min(currChapter + 1, chapters.length - 1)
      : Math.max(currChapter - 1, 0)
    setCurrentChapter(newChapter)
    router.replace(
      `/reader/${initialChapter.bookId}/${chapters[newChapter].number}`,
      null,
      { shallow: true }
    )
  }

  const scrollReader = async (e) => {
    changeChapter(e)
    if (loading) return
    if (
      Math.floor(e.target.scrollHeight - e.target.scrollTop) <=
      e.target.clientHeight
    )
      await getNextChapter()
    if (e.target.scrollTop === 0) {
      const id = await getPrevChapter()
      if (id) document.getElementById(id).scrollIntoView()
    }
    setLoading(false)
  }

  const changeChapter = (e) => {
    const curr = chapters[currChapter]
    const currElement = document.getElementById(`${curr.number}:${curr.name}`)
    const top = currElement.offsetTop
    const bottom = currElement.clientHeight + top
    const pos = e.target.scrollTop + e.target.clientHeight
    if (!(pos >= top && pos <= bottom)) {
      changeQs(pos > bottom)
    }
  }

  return (
    <div className={styles.readerContainer}>
      {errorMessage && <div>Error: {errorMessage}</div>}
      <div className={styles.titleHeader}>
        <Link href={`/reader/${initialChapter.bookId}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
            className={styles.readerIcon}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </Link>
        <h1>
          {bookTitle}: Chapter {chapters[currChapter]?.number}
        </h1>
        <div className={styles.sidebarContainer}>
          <span onClick={() => setOptionsIsOpen(!optionsIsOpen)}>options</span>

          <div
            className={`${optionsIsOpen ? styles.open : ""} ${styles.sidebar}`}
          >
            <label htmlFor="pageMode">Reader Mode:</label>
            <select
              name="pageMode"
              id="pageMode"
              value={options.readerMode}
              onChange={changeMode}
            >
              <option value="page">Page</option>
              <option value="scroll">Scroll</option>
            </select>
          </div>
        </div>
      </div>
      {options.readerMode === "scroll" ? (
        <div className={styles.overflowContainer} onScroll={scrollReader}>
          <div className={styles.textContainer} id="readerContainer">
            {chapters.map((chapter) => (
              <div
                id={`${chapter.number}:${chapter.name}`}
                key={`${chapter.number}:${chapter.name}`}
              >
                <h2>
                  Chapter {chapter.number}: {chapter.name}
                </h2>
                <p className={styles.text}>{chapter.text}</p>
              </div>
            ))}
            {end && (
              <p>
                <strong>End of Book</strong>
              </p>
            )}
          </div>
        </div>
      ) : (
        <Paginator
          chapter={chapters[currChapter]}
          getNextChapter={getNextChapter}
          getPrevChapter={getPrevChapter}
          changeQs={changeQs}
        />
      )}
    </div>
  )
}

Reader.propTypes = {
  errorMessage: PropTypes.string,
  initialChapter: PropTypes.object,
  initialText: PropTypes.string,
  bookTitle: PropTypes.string,
}

Reader.defaultProps = {
  errorMessage: null,
  initialChapter: null,
  initialText: "",
  bookTitle: "",
}

export default Reader
