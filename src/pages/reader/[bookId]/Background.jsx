import React from "react"
import Background from "../../../screens/Background"

export async function getServerSideProps(context) {
  let props = { bookId: context.params.bookId }
  return { props }
}

const BG = (props) => <Background {...props}></Background>
export default BG
