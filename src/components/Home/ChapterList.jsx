import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Chapter from './Chapter'

const ChapterList = () => {
  const chapters = [...Array(10).keys()]
  return (
    <Flex h={'100%'} direction={'column'}>
      <Text fontWeight={'semibold'}>Chapters</Text>
      <Box overflow={'auto'}>
        {chapters.map((c) => (
          <Chapter key={c} number={c + 1} />
        ))}
      </Box>
    </Flex>
  )
}

export default ChapterList
