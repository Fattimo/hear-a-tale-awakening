import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Quiz = ({ closeQuiz }) => {
  return (
    <Flex
      pos={'absolute'}
      direction={'column'}
      justify={'space-between'}
      align={'center'}
      w={'100vw'}
      h={'100vh'}
      bgColor={'gray.100'}
      zIndex={10}
      top={0}
      left={0}
    >
      <Text onClick={closeQuiz}>hello!</Text>
      <Text>helo</Text>
    </Flex>
  )
}

export default Quiz
