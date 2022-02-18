import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import BookmarksPreview from 'src/components/Home/BookmarksPreview'
import ChapterList from 'src/components/Home/ChapterList'
import ContinueReading from 'src/components/Home/ContinueReading'
import Sidebar from 'src/components/Home/Sidebar'

const Index = () => {
  const USER = 'ISABELLA MOAK'
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
          <ContinueReading />
        </GridItem>
        <GridItem rowSpan={2}>
          <ChapterList />
        </GridItem>
        <GridItem>
          <BookmarksPreview />
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default Index
