import React from 'react'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible.min.js'
import 'normalize.css'
import 'public/static/styles/App.css'

const MyApp = ({ Component, pageProps /*, router, currentUser*/ }) => (
  <ChakraProvider>
    <Head>
      <title>The Awakening</title>
    </Head>
    <div className="App">
      {/* <Header loggedIn={currentUser != null} currentRoute={router.asPath} /> */}
      <div className="Content">
        <Component {...pageProps} />
      </div>
    </div>
  </ChakraProvider>
)

export default MyApp
