import React from "react"
import Review from "../../../screens/Review"

export async function getServerSideProps(context) {
  let props = { bookId: context.params.bookId }
  return { props }
}

const R = (props) => <Review {...props}></Review>

export default R
