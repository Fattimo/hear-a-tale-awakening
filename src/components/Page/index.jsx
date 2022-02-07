import { Box } from '@chakra-ui/react'
import React from 'react'

const Page = ({ text, ...props }) => {
  return (
    <Box
      w={['90%', '90%', '45%']}
      h="100%"
      borderWidth="1px"
      borderColor="red.500"
      overflow="auto"
      {...props}
    >
      <Box>{text}</Box>
    </Box>
  )
}

export default Page
