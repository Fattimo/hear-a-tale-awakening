import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Page = ({ text, ...props }) => {
  const words = text.split('\n').map((para) => para.split(' '))
  return (
    <Box
      w={{ base: '90%', xl: '45%' }}
      h="100%"
      borderWidth="1px"
      borderColor="red.500"
      overflowX="hidden"
      overflowY={'auto'}
      {...props}
    >
      {words.map((paragraph, i) => (
        <Text key={i} whiteSpace={'pre-wrap'} maxW={'100%'} w={'100%'} my={2}>
          {paragraph.map((word, j) => (
            <span key={j} style={{ whiteSpace: 'pre' }}>
              {word}&nbsp;
            </span>
          ))}
        </Text>
      ))}
    </Box>
  )
}

export default Page
