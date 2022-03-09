import { ArrowRightIcon, CloseIcon, StarIcon } from '@chakra-ui/icons'
import { Box, Flex, Progress, Text } from '@chakra-ui/react'
import React from 'react'
import SidebarButton from '../Reader/SidebarButton'

const Quiz = ({ closeQuiz }) => {
  return (
    <Box
      pos={'absolute'}
      w={'100vw'}
      h={'100vh'}
      bgColor={'gray.100'}
      zIndex={10}
      top={0}
      left={0}
    >
      <Flex
        direction={'column'}
        justify={'space-between'}
        align={'center'}
        h={'full'}
      >
        <Flex mt={10}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </Flex>
        <Progress
          colorScheme={'theme.progress'}
          value={80}
          w={'40%'}
          size={'lg'}
          bgColor={'gray.200'}
          borderRadius={8}
          my={10}
        />
        <Flex
          bgColor={'white'}
          flexGrow={1}
          w={'80%'}
          borderTopRadius={'40'}
          pos={'relative'}
          mt={'60px'}
          boxShadow={'2xl'}
          direction={'column'}
          justify={'space-around'}
          align={'center'}
          _after={{
            w: '90%',
            h: 'full',
            pos: 'absolute',
            bottom: '30px',
            right: '5%',
            bgColor: 'white',
            content: '""',
            zIndex: -1,
            borderTopRadius: '40',
            boxShadow: '2xl'
          }}
          _before={{
            w: '80%',
            h: 'full',
            pos: 'absolute',
            bottom: '55px',
            right: '10%',
            bgColor: 'white',
            content: '""',
            zIndex: -1,
            borderTopRadius: '40',
            boxShadow: '2xl'
          }}
        >
          <Text>Definition</Text>
          <Flex>
            <Box>test</Box>
            <Box>test</Box>
            <Box>test</Box>
            <Box>test</Box>
          </Flex>
        </Flex>
        <SidebarButton pos={'absolute'} top={12} left={16} onClick={closeQuiz}>
          <CloseIcon />
        </SidebarButton>
        <SidebarButton pos={'absolute'} top={12} right={16}>
          <ArrowRightIcon />
        </SidebarButton>
      </Flex>
    </Box>
  )
}

export default Quiz
