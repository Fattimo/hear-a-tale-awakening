import React from "react"
import PropTypes from "prop-types"
import classes from "./HomePage.module.css"

const HomePage = ({ currentUser }) => (
  <div className={classes.root}>
    <h2 className={classes.centerText}>
      Welcome to our app, {currentUser.username}!
    </h2>
    <h3>
      This page can only be accessed by logged-in users, because _app.js
      reroutes users who are not logged-in away from this page.
    </h3>
  </div>
)

HomePage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default HomePage
