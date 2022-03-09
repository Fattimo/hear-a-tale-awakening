import React from 'react'
import Head from 'next/head'
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible.min.js'
import 'normalize.css'
import 'public/static/styles/App.css'

const theme = extendTheme({
  colors: {
    theme: {
      purple: '#666FC1',
      lightpurple: '#838CDF',
      gray: '#E6E9EF',
      progress: { 500: '#666FC1' },
    },
  },
})

const MyApp = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Head>
      <title>The Awakening</title>
    </Head>
    <div className="App">
      <Box className="Content" bgColor="theme.gray">
        <Component {...pageProps} />
      </Box>
    </div>
  </ChakraProvider>
)

export default MyApp
