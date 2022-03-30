import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Bookmark from './Bookmark'

const BookmarksPreview = ({ pagesToChapter = {}, bookmarks = [] }) => {
  const preview = bookmarks.length > 1 ? bookmarks.slice(0, 2) : bookmarks
  return (
    <Box>
      <Text fontWeight={'semibold'}>Your bookmarks</Text>
      <Flex justify="space-between" m="3">
        {preview.map((page) => (
          <Bookmark key={page} page={page}>
            <Text>page {page}</Text>
            <Text>chapter {pagesToChapter[page].chapter}</Text>
          </Bookmark>
        ))}
        {[...Array(2 - preview.length).keys()].map((_, i) => (
          <Bookmark endLabel key={i}>
            <Text>Empty</Text>
          </Bookmark>
        ))}
        <Bookmark endLabel>
          <Text>+</Text>
        </Bookmark>
      </Flex>
    </Box>
  )
}

export default BookmarksPreview
