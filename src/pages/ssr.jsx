import React from "react"
import SSRPage from "src/screens/SSR"
import PropTypes from "prop-types"
import { exampleServerCall } from "./api/example"
import { teamByNameServerCall } from "./api/testteam/by-name"

export async function getServerSideProps() {
  const r = await Promise.all([
    exampleServerCall(),
    teamByNameServerCall({ name: "matt" }),
  ])
  const props = {}
  if (r[0].success) props.message = r[0].payload
  else props.errorMessage = r[0].message
  if (r[1].success) props.member = JSON.parse(JSON.stringify(r[1].payload))
  else props.errorMessage = r[1].message
  return { props }
}

const SSR = (props) => <SSRPage {...props} />

SSR.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  member: PropTypes.object,
}

SSR.defaultProps = {
  message: null,
  errorMessage: null,
  member: null,
}

export default SSR
