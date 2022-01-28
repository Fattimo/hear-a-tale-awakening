import React from "react"
import Help from "../../../screens/Help"

export async function getServerSideProps(context) {
  let props = { bookId: context.params.bookId }
  return { props }
}

const H = (props) => <Help {...props}></Help>
export default H
