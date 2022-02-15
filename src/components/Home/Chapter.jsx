import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Chapter = ({ number = 1 }) => {
  return (
    <Box bgColor="theme.gray" m={2} borderRadius="lg" p={1.5}>
      <Flex justify="space-between">
        <Text>Chapter {number}</Text>
        <Text>wheel</Text>
      </Flex>
    </Box>
  )
}

export default Chapter
