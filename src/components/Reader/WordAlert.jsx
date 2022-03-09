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
  const punctuationless = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
  const cleanedWord = punctuationless.replace(/\s{2,}/g, ' ')
  return (
    <Alert
      position={'absolute'}
      w={'80%'}
      bottom={30}
      zIndex={10}
      h={24}
      borderRadius={'3xl'}
      bgColor={'theme.purple'}
      color={'white'}
    >
      <Flex justify={'space-between'} align={'center'} w={'100%'} px={2} pr={8}>
        <Flex direction={'column'}>
          <AlertTitle>{cleanedWord}</AlertTitle>
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
