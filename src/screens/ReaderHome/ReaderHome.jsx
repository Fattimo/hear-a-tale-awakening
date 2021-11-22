import React from "react"
import PropTypes from "prop-types"
import styles from "./ReaderHome.module.css"

const ReaderHome = ({ book, chapters, errorMessage }) => {
  if (errorMessage) return <div>There was an error. {errorMessage}</div>
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeSelects}>
        <h1>{book.title}</h1>
        <h4>{book.author}</h4>
        <button>Continue Reading</button>
        <button>About the Author</button>
        <button>Preferences</button>
        <button>Review Quiz Results</button>
        <button>Help</button>
      </div>
      <div>
        <h3>Chapters</h3>
        <div>
          {chapters.length === 0
            ? "No chapters found"
            : chapters.map((c) => (
                <div key={c.number + c.name} className={styles.homeChapter}>
                  <p>
                    Chapter {c.number}: {c.name}
                  </p>
                  <CompletedTag status="complete" />
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

const CompletedTag = ({ status }) => (
  <div className={`${styles[status]} ${styles.homeTag}`}>
    {status === "complete" ? "Finished" : "In Progress"}
  </div>
)

CompletedTag.propTypes = { status: PropTypes.string }

ReaderHome.propTypes = {
  book: PropTypes.object,
  chapters: PropTypes.array,
  errorMessage: PropTypes.string,
}

export default ReaderHome
