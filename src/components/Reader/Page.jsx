import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Page = ({ text, clickWord, selected, pageId, ...props }) => {
  const NO_INDENT_MARKER = '&ni;'
  const JUSTIFY_LAST_MARKER = '&jl;'
  const whitespace = /\s/
  const words = text.split('\n').map((para) => para.split(whitespace))
  return (
    <Box
      h="100%"
      borderWidth="1px"
      borderColor="red.500"
      overflowX="hidden"
      overflowY={'scroll'}
      style={{}}
      {...props}
    >
      {words.map((paragraph, i) => {
        let justifyLast = false
        let indent = true
        if (paragraph[paragraph.length - 1] === JUSTIFY_LAST_MARKER) {
          justifyLast = true
          paragraph.pop()
        }
        if (paragraph[0] === NO_INDENT_MARKER) {
          indent = false
          paragraph.shift()
        }
        return (
          <Text
            key={i}
            fontSize={{ base: '16px', md: '1.95vw', xl: '1.1vw' }}
            whiteSpace={'pre-line'}
            maxW={'100%'}
            w={{ base: '36.36em' }}
            my={2}
            textAlign={'justify'}
            style={{
              textAlignLast: justifyLast ? 'justify' : '',
              textIndent: indent ? '1em' : '',
            }}
          >
            {paragraph.map((word, j) => (
              <span key={j}>
                <span
                  onClick={clickWord(word, i, j)}
                  style={{
                    backgroundColor:
                      selected.word === word &&
                      selected.paragraph === i &&
                      selected.index === j &&
                      selected.page === pageId
                        ? 'yellow'
                        : '',
                  }}
                >
                  {word}
                </span>{' '}
              </span>
            ))}
          </Text>
        )
      })}
    </Box>
  )
}

export default Page
