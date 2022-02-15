import { Button } from '@chakra-ui/react'
import React from 'react'

const SidebarButton = ({ children }) => {
  return (
    <Button
      display="flex"
      borderRadius={'50%'}
      alignItems={'center'}
      justifyContent={'center'}
      w={4}
      my={2}
      _hover={''}
      _focus={''}
      _active={''}
      bgColor={'white'}
      color="black"
      boxShadow={'2xl'}
    >
      {children}
    </Button>
  )
}

export default SidebarButton
