import { Button } from '@chakra-ui/react'
import React from 'react'

const SidebarButton = ({ icon }) => {
  return (
    <Button
      display="flex"
      borderRadius={'50%'}
      alignItems={'center'}
      justifyContent={'center'}
      w={4}
      _hover={''}
      _focus={''}
      _active={''}
      bgColor={'white'}
      color="black"
      dropShadow={'30px 10px 4px'}
    >
      {icon}
    </Button>
  )
}

export default SidebarButton
