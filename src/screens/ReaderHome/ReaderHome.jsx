import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import styles from "./ReaderHome.module.css"

const ReaderHome = ({ book, chapters, errorMessage }) => {
  if (errorMessage) return <div>There was an error. {errorMessage}</div>
  const [statuses, setStatuses] = useState({})

  useEffect(() => {
    const chapterStatuses = window.localStorage.getItem(book.title)
    if (chapterStatuses === null) {
      window.localStorage.setItem(book.title, JSON.stringify({}))
      return
    }
    setStatuses(JSON.parse(chapterStatuses))
  }, [])
  /**
   * local storage shape:
   * key: title of book
   * value: {
   *  chapter number: status,
   *  chapter number: status
   * }
   */

  const resetLocalStorage = () =>
    window.localStorage.setItem(book.title, JSON.stringify({}))

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeSelects}>
        <h1>{book.title}</h1>
        <h4>{book.author}</h4>
        <button>Continue Reading</button>
        <Link href={`/reader/${book._id}/Background`}><button>About the Author</button></Link>
        <Link href={`/reader/${book._id}/Preferences`}><button>Preferences</button></Link>
        <Link href={`/reader/${book._id}/Review`}><button>Review Quiz Results</button></Link>
        <Link href={`/reader/${book._id}/Help`}><button>Help</button></Link>
      </div>
      <div>
        <h3>Chapters</h3>
        <div>
          {chapters.length === 0
            ? "No chapters found"
            : chapters.map((c) => (
                <div key={c.number + c.name} className={styles.homeChapter}>
                  <Link href={`/reader/${book._id}/${c.number}`}>
                    <a>
                      Chapter {c.number}: {c.name}
                    </a>
                  </Link>

                  <CompletedTag status={statuses[c.number]} />
                </div>
              ))}
          <div onClick={resetLocalStorage}>Reset Local Storage</div>
        </div>
      </div>
    </div>
  )
}

const CompletedTag = ({ status }) => (
  <div className={`${styles[status]} ${styles.homeTag}`}>
    <p>{status === "complete" ? "Finished" : "In Progress"}</p>
  </div>
)

CompletedTag.propTypes = { status: PropTypes.string }

ReaderHome.propTypes = {
  book: PropTypes.object,
  chapters: PropTypes.array,
  errorMessage: PropTypes.string,
}

export default ReaderHome
