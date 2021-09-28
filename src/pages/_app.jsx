import React from "react"
import PropTypes from "prop-types"
import App from "next/app"
import Head from "next/head"
import Header from "../components/Header"
import "focus-visible/dist/focus-visible.min.js"
import "normalize.css"
import "../../public/static/styles/App.css"

const MyApp = ({ Component, pageProps, router, currentUser }) => (
  <>
    <Head>
      <title>Next.js-Starter</title>
    </Head>
    <div className="App">
      <Header loggedIn={currentUser != null} currentRoute={router.asPath} />
      <div className="Content">
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  </>
)

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  return appProps
}

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
