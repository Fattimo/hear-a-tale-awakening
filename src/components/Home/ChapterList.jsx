import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Chapter from './Chapter'

const ChapterList = ({ chapters, chapterProgress = {} }) => {
  return (
    <Flex h={'100%'} direction={'column'}>
      <Text fontWeight={'semibold'}>Chapters</Text>
      <Box overflow={'auto'}>
        {chapters.map((chap) => (
          <Chapter
            key={chap.chapter}
            number={chap.chapter}
            chapterProgress={chapterProgress[chap.chapter]}
            chapter={chap}
          />
        ))}
      </Box>
    </Flex>
  )
}

export default ChapterList
