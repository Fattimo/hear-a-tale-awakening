import { ArrowRightIcon, CloseIcon, StarIcon } from '@chakra-ui/icons'
import { Box, Flex, Progress, Text, Loading } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import SidebarButton from '../Reader/SidebarButton'
import style from './quiz.module.css'

const Quiz = ({
  closeQuiz,
  word = '',
  setAudioSrc,
  playWordAudio,
  playDefinitionAudio,
}) => {
  const [quiz, setQuiz] = useState({})
  const [correct, setCorrect] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [maxCorrect, setMaxCorrect] = useState(0)
  const [currCorrect, setCurrCorrect] = useState(0)
  const fetchQuiz = useCallback(
    () =>
      fetch(`/api/quiz?word=${word}`).then((res) =>
        res.json().then((quiz) => setQuiz(quiz))
      ),
    [word]
  )

  useEffect(() => {
    if (word === '') return
    fetchQuiz()
  }, [fetchQuiz, word])

  const selectAnswer = (i) => {
    if (correct) return
    setSelectedIndex(i)
    if (i === quiz.correctIndex) {
      setCorrect(true)
      setCurrCorrect(currCorrect + 1)
      setMaxCorrect(Math.max(maxCorrect, currCorrect + 1))
    } else {
      setCorrect(false)
      setCurrCorrect(0)
      setAudioSrc(
        'https://brainy-literacy-assets.s3.amazonaws.com/audio/incorrect_answer_sound.mp3'
      )
    }
  }

  const nextQuiz = () => {
    if (!correct) return
    setCorrect(null)
    setSelectedIndex(-1)
    if (currCorrect >= 5) {
      closeQuiz()
      return
    }
    reshuffleQuiz()
  }

  const reshuffleQuiz = () => {
    if (!quiz.choices) return
    // https://stackoverflow.com/a/12646864
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
    }
    const correctAnswer = quiz.choices[quiz.correctIndex]
    shuffleArray(quiz.choices)
    quiz.correctIndex = quiz.choices.indexOf(correctAnswer)
    setQuiz(quiz)
  }

  return (
    <Box
      pos={'absolute'}
      w={'100vw'}
      h={'100vh'}
      bgColor={'gray.100'}
      zIndex={10}
      top={0}
      left={0}
      overflow={'hidden'}
    >
      <Flex
        direction={'column'}
        justify={'space-between'}
        align={'center'}
        h={'full'}
        w={'full'}
        fontSize={'xl'}
      >
        <Flex mt={6}>
          {[...Array(5).keys()].map((i) => (
            <StarIcon
              w={10}
              h={10}
              key={i}
              stroke={i < currCorrect ? 'yellow.300' : 'gray.300'}
              strokeWidth={'2px'}
              color={
                i < currCorrect
                  ? 'yellow.300'
                  : i < maxCorrect
                  ? 'gray.300'
                  : 'transparent'
              }
              viewBox={'-1 -1 26 26'}
            />
          ))}
        </Flex>
        <Progress
          colorScheme={'theme.progress'}
          value={80}
          w={'40%'}
          size={'lg'}
          bgColor={'gray.200'}
          borderRadius={8}
          my={4}
          flexShrink={0}
        />
        <Flex
          bgColor={'white'}
          flexGrow={1}
          w={'80%'}
          borderTopRadius={'40'}
          pos={'relative'}
          mt={{ base: '30px', lg: '50px' }}
          boxShadow={'2xl'}
          flexShrink={1}
          _after={{
            w: '90%',
            h: 'full',
            pos: 'absolute',
            bottom: { base: '20px', lg: '25px' },
            right: '5%',
            bgColor: 'white',
            content: '""',
            zIndex: -1,
            borderTopRadius: '40',
            boxShadow: '2xl',
          }}
          _before={{
            w: '80%',
            h: 'full',
            pos: 'absolute',
            bottom: { base: '35px', lg: '45px' },
            right: '10%',
            bgColor: 'white',
            content: '""',
            zIndex: -1,
            borderTopRadius: '40',
            boxShadow: '2xl',
          }}
        >
          {quiz === {} ? (
            <Loading />
          ) : typeof quiz === 'string' ? (
            <Text w={'full'}>No Quiz For This Word</Text>
          ) : (
            <Flex
              direction={'column'}
              justify={'space-around'}
              align={'center'}
              fontWeight={'bold'}
              h={'full'}
              w={'full'}
              textAlign={'center'}
            >
              <Text mt={4} px={16}>
                {quiz.definition}
              </Text>
              <Text color={correct ? 'green.400' : 'red.400'}>
                {correct !== null
                  ? correct
                    ? 'Correct'
                    : 'Incorrect, try again!'
                  : ''}
              </Text>
              <Flex
                justifyContent={'space-between'}
                w={{ base: 'full', lg: '60%' }}
                px={12}
                my={2}
                flexShrink={1}
                flexWrap={{ lg: 'wrap', base: 'nowrap' }}
              >
                {quiz.choices?.map((w, i) => (
                  <Flex
                    key={i}
                    flexGrow={1}
                    w={{ base: '20%', lg: '40%' }}
                    className={style.answer_choice}
                    boxShadow={'0px 14px 31px rgba(0, 0, 0, 0.13);'}
                    borderRadius={20}
                    mx={3}
                    my={3}
                    align={'center'}
                    justify={'center'}
                    onClick={() => selectAnswer(i)}
                    bgColor={
                      selectedIndex === i
                        ? correct
                          ? 'green.400'
                          : 'red.400'
                        : null
                    }
                    color={selectedIndex === i ? 'white' : null}
                    cursor={!correct ? 'pointer' : null}
                  >
                    {w}
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
        <SidebarButton pos={'absolute'} top={12} left={16} onClick={closeQuiz}>
          <CloseIcon />
        </SidebarButton>
        <SidebarButton
          pos={'absolute'}
          top={12}
          right={16}
          onClick={nextQuiz}
          opacity={correct ? 1 : 0.3}
          cursor={correct ? 'pointer' : null}
        >
          <ArrowRightIcon />
        </SidebarButton>
        <Text
          pos={'absolute'}
          top={6}
          left={40}
          maxW={16}
          p={2}
          bgColor={'theme.lightpurple'}
          textAlign={'center'}
          color={'white'}
          fontSize={'md'}
          cursor={'pointer'}
          borderRadius={'lg'}
          onClick={() => playWordAudio(word)}
        >
          Hear Word
        </Text>
        <Text
          pos={'absolute'}
          top={6}
          right={32}
          maxW={24}
          p={2}
          bgColor={'theme.lightpurple'}
          textAlign={'center'}
          color={'white'}
          borderRadius={'lg'}
          fontSize={'md'}
          cursor={'pointer'}
          onClick={() => playDefinitionAudio()}
        >
          Hear Definition
        </Text>
      </Flex>
    </Box>
  )
}

export default Quiz
