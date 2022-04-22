import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

const Page = ({ text, clickWord, selected, pageId, chapter, ...props }) => {
  const NO_INDENT_MARKER = '&ni;'
  const JUSTIFY_LAST_MARKER = '&jl;'
  const whitespace = /\s/
  const words = text.split('\n').map((para) => para.split(whitespace))
  const numWords = words.reduce(
    (runningTot, para) => runningTot + para.length,
    0
  )
  const getCumWords = (i, j) => {
    return words.reduce((runningTot, para, currI) => {
      if (currI < i) return runningTot + para.length
      else if (currI == i) return runningTot + j
      else return runningTot
    }, 0)
  }
  const overflowBox = useRef(null)
  useEffect(
    () =>
      overflowBox.current.scroll({
        top: 0,
        behavior: 'instant',
      }),
    [text]
  )
  return (
    <Box
      h="100%"
      overflowX="hidden"
      overflowY={'scroll'}
      px={4}
      ref={overflowBox}
      {...props}
    >
      {chapter ? (
        <Text
          textAlign={'center'}
          fontSize={{ base: '24px', md: '3vw', xl: '2vw' }}
        >
          {chapter}
        </Text>
      ) : null}
      {words.map((paragraph, i) => {
        const justifyLast =
          paragraph[paragraph.length - 1] === JUSTIFY_LAST_MARKER
        const noIndent = paragraph[0] === NO_INDENT_MARKER
        if (justifyLast) paragraph.pop()
        if (noIndent) paragraph.shift()
        return (
          <Text
            key={i}
            fontSize={{ base: '16px', md: '1.9vw', xl: '1.1vw' }}
            whiteSpace={'pre-line'}
            maxW={'100%'}
            w={{ base: '36.36em' }}
            my={2}
            textAlign={'justify'}
            style={{
              textAlignLast: justifyLast ? 'justify' : '',
              textIndent: noIndent ? '' : '1em',
            }}
          >
            {paragraph.map((word, j) => (
              <span key={j}>
                <span
                  onClick={clickWord(word, i, j, getCumWords(i, j) / numWords)}
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
