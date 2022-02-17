import { Alert, AlertTitle, CloseButton } from '@chakra-ui/react'
import React from 'react'

const WordAlert = ({ word, closeAlert }) => {
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
      <AlertTitle>{cleanedWord}</AlertTitle>
      <CloseButton onClick={closeAlert} />
    </Alert>
  )
}

export default WordAlert
