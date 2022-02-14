import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { helloWorld } from 'src/actions/General'

const Index = () => {
  const [payload, setPayload] = useState('')

  useEffect(() => {
    // Example how to create page without ssr
    helloWorld().then((resp) => {
      setPayload(resp)
    })
  }, [])

  return (
    <>
      <h2>Welcome to Next.js!</h2>
      <h3>
        This page is static rendered, because all API calls are made in
        useEffect
      </h3>
      <h4>{payload}</h4>
      <p>You can tell because the text above flashes on page refresh</p>
      <p>
        If you are here to assess our 3311 project, please click on the reader
        tag in the header above. This initial template was left intact in order
        to have starter code for less experienced team members to look at in
        preparation for second semester.
      </p>
      <p>
        Similarly, the header of this page is a leftover placeholder and will be
        adjusted going into next semester.
      </p>
      <Link href="/book">
        <a>to book</a>
      </Link>
    </>
  )
}

export default Index
