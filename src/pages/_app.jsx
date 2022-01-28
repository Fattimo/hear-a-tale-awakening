import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import Header from "src/components/Header"
import "focus-visible/dist/focus-visible.min.js"
import "normalize.css"
import "public/static/styles/App.css"

const MyApp = ({ Component, pageProps, router, currentUser }) => (
  <>
    <Head>
      <title>Next.js-Starter</title>
    </Head>
    <div className="App">
      <Header loggedIn={currentUser != null} currentRoute={router.asPath} />
      <div className="Content">
        <Component {...pageProps} />
      </div>
    </div>
  </>
)

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
}

MyApp.defaultProps = {
  currentUser: null,
}

export default MyApp
