import React from 'react'
import Head from 'next/head'
import { Box, ChakraProvider } from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible.min.js'
import 'normalize.css'
import 'public/static/styles/App.css'

const MyApp = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Head>
      <title>The Awakening</title>
    </Head>
    <div className="App">
      <Box className="Content" bgColor="gray.200">
        <Component {...pageProps} />
      </Box>
    </div>
  </ChakraProvider>
)

export default MyApp
