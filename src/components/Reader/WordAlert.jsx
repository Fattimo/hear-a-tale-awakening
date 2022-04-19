import { StarIcon } from '@chakra-ui/icons'
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
  definition = { definition: 'Definition', key: '' },
  closeAlert,
  openQuiz,
  playDefinitionAudio,
}) => {
  return (
    <Alert
      position={'absolute'}
      w={'80%'}
      h={'50%'}
      fontSize={{ base: 'xl', xl: '3xl' }}
      bottom={30}
      zIndex={10}
      borderRadius={'3xl'}
      bgColor={definition.french ? 'theme.red' : 'theme.purple'}
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
          <AlertDescription lineHeight={{ base: 6, md: 8, lg: 10 }}>
            {definition.definition} {definition.related ?? ''}
          </AlertDescription>
        </Flex>
        <Flex>
          {!definition.french && (
            <SidebarButton mx={4} onClick={openQuiz} w={12} h={12}>
              <StarIcon w={6} h={6} />
            </SidebarButton>
          )}
          <SidebarButton w={12} h={12}>
            <HeadphonesIcon onClick={playDefinitionAudio} w={6} h={6} />
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
