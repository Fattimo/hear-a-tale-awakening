import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import BookmarksPreview from 'src/components/Home/BookmarksPreview'
import ChapterList from 'src/components/Home/ChapterList'
import ContinueReading from 'src/components/Home/ContinueReading'
import Sidebar from 'src/components/Home/Sidebar'

const Index = ({ config = {} }) => {
  const USER = 'ISABELLA MOAK'
  /**
   * Shape of local storage:
   * {
   *  currPage: number,
   *  chapterProgress: {
   *    chapternumber: { page: <absolute page>, progress: proportion}
   *  },
   *  bookmarks: [numbers]
   * }
   * TODO: replace with real user tied data
   */
  const data =
    typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem('awakening')) ?? {}
      : {}
  const [currPage, setCurrPage] = useState(1)
  const [bookmarks, setBookmarks] = useState([])
  useEffect(() => {
    setCurrPage(data.currPage)
    setBookmarks(data.bookmarks)
  }, [data.bookmarks, data.currPage])
  const { chapter } = config.pages[currPage]
  return (
    <Flex h="100%">
      <Sidebar />
      <Grid
        bgColor="white"
        templateColumns="1fr 1fr"
        templateRows="min-content 1fr 1fr"
        flexGrow={1}
        borderRadius="2rem 0 0 2rem"
        p={6}
        rowGap={4}
        columnGap={6}
      >
        <GridItem colSpan={2}>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            Welcome Back, {USER}
          </Text>
        </GridItem>
        <GridItem>
          <ContinueReading chapter={chapter} page={currPage} />
        </GridItem>
        <GridItem rowSpan={2}>
          <ChapterList
            chapters={config.book}
            chapterProgress={data.chapterProgress}
          />
        </GridItem>
        <GridItem>
          <BookmarksPreview
            bookmarks={bookmarks}
            pagesToChapter={config.pages}
          />
        </GridItem>
      </Grid>
    </Flex>
  )
}

export async function getServerSideProps() {
  const config = require('public/book/config.json')
  return { props: { config } }
}

export default Index
