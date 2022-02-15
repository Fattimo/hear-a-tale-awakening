import { Box, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import Bookmark from './Bookmark'

const BookmarksPreview = () => {
  return (
    <Box>
      <Text fontWeight={'semibold'}>Your bookmarks</Text>
      <Flex justify="space-between" m="3">
        <Bookmark>
          <Text>page 13</Text>
          <Text>1:46</Text>
        </Bookmark>
        <Bookmark>
          <Text>page 21</Text>
          <Text>12:31</Text>
        </Bookmark>
        <Bookmark endLabel>
          <Spacer />
          <Text>+</Text>
          <Spacer />
        </Bookmark>
      </Flex>
    </Box>
  )
}

export default BookmarksPreview
