import { Box, Flex, Grid, GridItem, Link, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sidebar from 'src/components/Home/Sidebar'
import NextLink from 'next/link'

const Bookmarks = ({ config = {} }) => {
  const [bookmarks, setBookmarks] = useState([])
  useEffect(() => {
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
    setBookmarks(data.bookmarks ?? [])
  }, [])
  return (
    <Flex h={'100%'}>
      <Sidebar />
      <Flex
        bgColor={'white'}
        flexGrow={1}
        direction={'column'}
        borderRadius="2rem 0 0 2rem"
        p={6}
      >
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Your Bookmarks
        </Text>
        <Flex overflow={'hidden'}>
          <Box overflow={'auto'} w={'full'}>
            {bookmarks.map((b, i) => (
              <BookmarkRow key={i} page={b} chapter={config[b]?.chapter} />
            ))}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

const BookmarkRow = ({ page, chapter }) => {
  return (
    <Grid
      templateColumns={'repeat(4, 1fr)'}
      h={16}
      my={2}
      alignItems={'center'}
      gap={8}
    >
      <GridItem colSpan={2} h={'full'}>
        <Flex
          bgColor={'theme.gray'}
          align={'center'}
          h={'full'}
          borderRadius={'2xl'}
          px={8}
        >
          <Text fontWeight={'semibold'}>Page {page}</Text>
          <Text ml={4}>Chapter {chapter}</Text>
        </Flex>
      </GridItem>
      <NextLink href={`/page/${page}?play`} passHref>
        <Link h={'full'}>
          <Flex
            h={'full'}
            bgColor={'theme.lightpurple'}
            color={'white'}
            borderRadius={'2xl'}
            align={'center'}
            textAlign={'center'}
            justify={'center'}
          >
            Continue Reading With Audio
          </Flex>
        </Link>
      </NextLink>
      <NextLink href={`/page/${page}`} passHref>
        <Link h={'full'}>
          <Flex
            h={'full'}
            bgColor={'theme.purple'}
            color={'white'}
            borderRadius={'2xl'}
            align={'center'}
            justify={'center'}
            textAlign={'center'}
          >
            Continue Reading Without Audio
          </Flex>
        </Link>
      </NextLink>
    </Grid>
  )
}

export async function getServerSideProps() {
  const config = require('public/book/config.json')
  return { props: { config: config.pages } }
}

export default Bookmarks
