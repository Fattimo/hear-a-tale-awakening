import { Box, CircularProgress, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Chapter = ({ number = 1 }) => {
  return (
    <Box bgColor="theme.gray" m={2} borderRadius="xl" p={2}>
      <Flex justify="space-between" align={'center'} px={2}>
        <Text fontSize={'sm'} fontWeight={'semibold'}>
          Chapter {number}
        </Text>
        <CircularProgress
          color={'theme.purple'}
          value={30}
          thickness={15}
          size={'30px'}
        />
      </Flex>
    </Box>
  )
}

export default Chapter
