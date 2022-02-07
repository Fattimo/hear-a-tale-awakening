import React from "react"
import { useRouter } from "next/router"
import Wrapper from "src/components/Page/Wrapper"

const Page = () => {
  const router = useRouter()
  const { page } = router.query

  return <Wrapper />
}

export default Page
