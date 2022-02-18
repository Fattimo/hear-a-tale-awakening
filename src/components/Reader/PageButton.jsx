import { Button } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React from 'react'

const PageButton = ({ onClick, left = false, largeScreen = false }) => {
  return (
    <Button
      display={{
        base: largeScreen ? 'none' : 'flex',
        xl: largeScreen ? 'flex' : 'none',
      }}
      borderRadius={'50%'}
      alignItems={'center'}
      justifyContent={'center'}
      w={4}
      _hover={''}
      _focus={''}
      _active={''}
      bgColor={'theme.purple'}
      color="white"
      onClick={onClick}
    >
      {left ? <ChevronLeftIcon m={0} /> : <ChevronRightIcon m={0} />}
    </Button>
  )
}

export default PageButton
