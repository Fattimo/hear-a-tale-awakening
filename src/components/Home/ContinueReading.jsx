import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const ContinueReading = () => {
  return (
    <Box>
      <Text>Continue reading</Text>
      <Flex
        m="5"
        p="4"
        bgColor="theme.purple"
        textColor="white"
        borderRadius="3xl"
        justify="space-between"
        align="center"
        h="50%"
      >
        <Box>
          <Text>Chapter X</Text>
          <Text>page 14</Text>
        </Box>
        <Box>sound</Box>
        <Box>no sound</Box>
      </Flex>
    </Box>
  )
}

export default ContinueReading
