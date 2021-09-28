import React from "react"
import PropTypes from "prop-types"
import classes from "./SSRPage.module.css"
import { helloWorld } from "../../actions/General"
import { getTeamMember } from "../../actions/TestTeam"

const SSRPage = ({ message, errorMessage, member }) => {
  return (
    <>
      <h2 className={classes.CenterText}>Welcome to Next.js!</h2>
      <h3>
        This page is server-side rendered, because all API calls are made in
        getInitialProps
      </h3>
      {errorMessage == null ? (
        <h4>SSR Message: {message}</h4>
      ) : (
        <h4>SSR Error: {errorMessage}</h4>
      )}
      <p>You can tell because the text above does not flash on refresh</p>
      {member && <p>{member.name}</p>}
    </>
  )
}

SSRPage.getInitialProps = async () => {
  try {
    const r = await Promise.all([helloWorld(), getTeamMember("matt")])
    return {
      message: r[0],
      member: r[1],
    }
  } catch (e) {
    return { errorMessage: e.message }
  }
}

SSRPage.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  member: PropTypes.object,
}

SSRPage.defaultProps = {
  message: null,
  errorMessage: null,
  member: null,
}

export default SSRPage
