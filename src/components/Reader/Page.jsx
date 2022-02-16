import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Page = ({ text, ...props }) => {
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
      <Text whiteSpace={'pre-wrap'} w={'100%'}>
        {text}
      </Text>
    </Box>
  )
}

export default Page
