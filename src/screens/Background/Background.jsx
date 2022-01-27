import React from "react"
import Link from "next/link"
import styles from "./Background.module.css"

const Background = (props) => {
    return (<div>
        <div className={styles.titleHeader}>
        <Link href={`/reader/${props.bookId}`}>
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
        <h1>Background</h1>
        <div> </div>
      </div><div>KATE CHOPIN (February 8, 1850—August 22, 1904) was known during her time as a local colorist and the author of a somewhat indecent novel but has emerged as a writer far ahead of her time in the South and in the United States.  In her fiction she dealt directly with powerful psychological and sexual emotions.  Although this was characteristic of the novel as practiced in France, it had not been done in the English language.
Kate O’Flaherty Chopin was born in St. Louis, Missouri.  Her father was killed in a railway accident when she was six, and for the next two years she lived at home with her mother, grandmother and great-grandmother, all of them widows.  She grew up surrounded by smart, independent, single women.
In 1870, she married Oscar Chopin, a Louisiana businessman.  The couple lived in New Orleans where Kate had five boys and two girls, all before she was twenty-eight.  Oscar died in 1882 and Kate took over the running of his plantation and general store.  She moved back to St. Louis in 1884 to live with her mother who died the following year, leaving Kate alone with her children again.
To support herself and her young family, she began to write.  By the time The Awakening was published in 1899, Chopin was a well-known writer, having published more than a hundred stories, essays and sketches in literary magazines.  The novel caused an uproar and Chopin was so deeply hurt by the public’s reaction that she wrote very little during the remaining five years of her life.  Chopin died from a cerebral hemorrhage after collapsing at the World’s Fair, two days earlier.

</div></div>)
}

export default Background