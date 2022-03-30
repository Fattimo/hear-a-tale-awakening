import { WarningIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  CloseButton,
  Flex,
} from '@chakra-ui/react'
import React from 'react'
import { HeadphonesIcon } from '../Icons'
import SidebarButton from './SidebarButton'

const WordAlert = ({
  word,
  definition = 'Definition',
  closeAlert,
  openQuiz,
}) => {
  return (
    <Alert
      position={'absolute'}
      w={'80%'}
      h={'50%'}
      fontSize={'xl'}
      bottom={30}
      zIndex={10}
      borderRadius={'3xl'}
      bgColor={'theme.purple'}
      color={'white'}
    >
      <Flex
        justify={'space-between'}
        align={'center'}
        w={'full'}
        h={'full'}
        px={2}
        pr={8}
      >
        <Flex direction={'column'} justify={'center'} h={'full'}>
          <AlertTitle mb={4}>{word}</AlertTitle>
          <AlertDescription>{definition}</AlertDescription>
        </Flex>
        <Flex>
          <SidebarButton mx={2} onClick={openQuiz}>
            <WarningIcon />
          </SidebarButton>
          <SidebarButton>
            <HeadphonesIcon />
          </SidebarButton>
        </Flex>
      </Flex>
      <CloseButton
        onClick={closeAlert}
        position={'absolute'}
        right="8px"
        top="8px"
        bgColor={'red.500'}
        _hover={{ bgColor: 'red.500' }}
      />
    </Alert>
  )
}

export default WordAlert
