import React, { useEffect, useRef, useState } from "react"
import styles from "./Paginator.module.css"

const Paginator = ({
  chapter = {},
  getNextChapter,
  getPrevChapter,
  changeQs,
}) => {
  const textArea = useRef(null)
  const measurer = useRef(null)
  const measurerH = useRef(null)
  const measurerP = useRef(null)
  const [pages, setPages] = useState([])
  const [index, setIndex] = useState(0)
  let fromPrevious = false

  useEffect(() => {
    if (!chapter.text || !measurer || !textArea) return
    const ps = []
    const heightLimit = textArea.current.clientHeight
    const chapterHeading = measurerH.current
    const paragraph = measurerP.current
    paragraph.innerHTML = ""
    chapterHeading.innerHTML = `Chapter ${chapter.number}: ${chapter.name}`
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
    if (fromPrevious) setIndex(ps.length - 1)
    else setIndex(0)
    setPages(ps)
  }, [chapter])

  const pageBack = async () => {
    if (index === 0) {
      fromPrevious = true
      await getPrevChapter()
      changeQs(false)
    } else {
      setIndex(Math.max(0, index - 1))
    }
  }

  const pageForward = async () => {
    if (index === pages.length - 1) {
      fromPrevious = false
      await getNextChapter()
      changeQs(true)
    } else {
      setIndex(Math.min(index + 1, pages.length - 1))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={textArea}>
        <div className={`${styles.measurer} ${styles.text}`} ref={measurer}>
          <h2 ref={measurerH}></h2>
          <p ref={measurerP}></p>
        </div>
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

export default Paginator
