import { Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from 'src/components/Home/Sidebar'

const Help = () => {
  return (
    <Flex h={'100%'}>
      <Sidebar />
      <Flex
        bgColor={'white'}
        flexGrow={1}
        borderRadius="2rem 0 0 2rem"
        p={6}
      ></Flex>
    </Flex>
  )
}

export default Help
