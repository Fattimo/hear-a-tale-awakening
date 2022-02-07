import Link from 'next/link'
import React from 'react'

const Book = () => {
  return (
    <div>
      <Link href="/book/1">
        <a>chapter 1</a>
      </Link>
    </div>
  )
}

export default Book
