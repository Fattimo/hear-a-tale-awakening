import { CheckCircleIcon, ChevronDownIcon, StarIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Sidebar from 'src/components/Home/Sidebar'

const Review = () => {
  return (
    <Flex h={'100%'}>
      <Sidebar />
      <Flex bgColor={'white'} flexGrow={1} borderRadius="2rem 0 0 2rem" p={6}>
        <Flex w={'50%'} p={4} direction={'column'}>
          <Text fontWeight={'bold'} fontSize={'xl'}>
            Review For <i>The Awakening</i>
          </Text>
          <Flex>
            <Text fontWeight={'semibold'}>Quiz Results&nbsp;</Text>
            <Text fontWeight={'semibold'} display={'inline'} color={'gray.300'}>
              X Quizzes Taken
            </Text>
          </Flex>
          <Flex my={6}>
            <CircularProgress size={32} value={64} color={'green.400'}>
              <CircularProgressLabel fontSize={'lg'} fontWeight={'bold'}>
                64%
                <br />
                Average
              </CircularProgressLabel>
            </CircularProgress>
            <CircularProgress size={32}>
              <CircularProgressLabel fontSize={'lg'}>
                placeholder
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>
          <Flex direction={'column'}>
            <Flex fontWeight={'semibold'}>
              <Center mr={4} borderRadius={8} bgColor={'gray.200'} minW={8}>
                1
              </Center>
              <Text>Statistic</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex h={'100%'} w={'50%'} direction={'column'} p={4}>
          <Text>Words Cued</Text>
          <Box overflow={'auto'}>
            <CuedWord />
            <CuedWord />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

const CuedWord = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Box borderRadius={10} bgColor={expanded ? 'green.100' : null} my={2}>
      <Flex
        justify={'space-between'}
        align={'center'}
        bgColor={'gray.200'}
        p={2}
        px={4}
        borderRadius={10}
        cursor={'pointer'}
        onClick={() => setExpanded(!expanded)}
      >
        <Text>test</Text>
        <Flex>
          <CheckCircleIcon color={'green.300'} />
          <ChevronDownIcon />
        </Flex>
      </Flex>
      <Flex
        display={expanded ? null : 'none'}
        fontSize={'xs'}
        justify={'space-between'}
        align={'center'}
        px={4}
        py={3}
      >
        <Flex align={'center'} bgColor={'white'} borderRadius={8} px={3} h={5}>
          Score: XX%
        </Flex>
        <Flex
          bgColor={'white'}
          borderRadius={8}
          px={3}
          h={5}
          align={'center'}
          color={'yellow.300'} // todo: move to star level
        >
          <StarIcon /> <StarIcon />
          <StarIcon /> <StarIcon />
          <StarIcon />
        </Flex>
        <Flex
          bgColor={'theme.lightpurple'}
          color={'white'}
          borderRadius={8}
          px={3}
          h={5}
          minW={8}
          align={'center'}
        >
          Review
        </Flex>
      </Flex>
    </Box>
  )
}

export default Review
