import React, { useEffect, useRef, useState } from "react"
import propTypes from "prop-types"
import styles from "./Paginator.module.css"

const Paginator = ({ chapter = {} }) => {
  const textArea = useRef(null)
  const measurer = useRef(null)
  const [pages, setPages] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!chapter.text || !measurer || !textArea) return
    const ps = []
    const heightLimit = textArea.current.clientHeight
    const chapterHeading = document.createElement("h2")
    const paragraph = document.createElement("p")
    chapterHeading.innerHTML = `Chapter ${chapter.number}: ${chapter.name}`
    measurer.current.appendChild(chapterHeading)
    measurer.current.appendChild(paragraph)
    for (let i = 0; i < chapter.text.length; i++) {
      paragraph.innerHTML += chapter.text.charAt(i)
      if (measurer.current.clientHeight > heightLimit) {
        let p = paragraph.innerHTML
        let c = 0
        while (chapter.text.charAt(i) !== " ") {
          c++
          if (chapter.text.charAt(i) === "\n") {
            break
          }
          i--
        }
        p = p.slice(0, -c)
        ps.push(p)
        chapterHeading.innerHTML = ""
        paragraph.innerHTML = ""
      }
    }
    ps.push(paragraph.innerHTML)
    setPages(ps)
  }, [chapter])

  const pageBack = () => {
    setIndex(Math.max(0, index - 1))
  }

  const pageForward = () => {
    setIndex(Math.min(index + 1, pages.length - 1))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={textArea}>
        <div className={`${styles.measurer} ${styles.text}`} ref={measurer} />
        <div>
          {index === 0 && (
            <h2>
              Chapter {chapter.number}: {chapter.name}
            </h2>
          )}
          <p className={styles.text}>{pages[index]}</p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <span onClick={pageBack}>&lt;</span>
        <span onClick={pageForward}>&gt;</span>
      </div>
    </div>
  )
}

Paginator.propTypes = { chapter: propTypes.object }

export default Paginator
