import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

const Bookmark = ({ endLabel = false, children }) => {
  return (
    <Box
      bgColor={endLabel ? 'theme.gray' : 'theme.purple'}
      minW={16}
      maxW="40"
      textColor={'white'}
      w="30%"
      style={{ aspectRatio: '1 / 1' }}
      borderRadius="2xl"
    >
      <Flex align="center" justify="center" h="100%" direction="column">
        {children}
      </Flex>
    </Box>
  )
}

export default Bookmark
