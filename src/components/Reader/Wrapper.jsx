import { Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { cleanedFrenchWord, cleanedWord } from 'utils/util'
import Quiz from '../modals/Quiz'
import AudioManager from './AudioManager'
import Page from './Page'
import WordAlert from './WordAlert'

const Wrapper = ({
  config,
  quizOpen,
  setQuizOpen,
  isBookPlaying,
  setIsBookPlaying,
  setAudioProgress,
  isTouchingWord,
  setIsTouchingWord,
}) => {
  const router = useRouter()

  // Page Calculations
  const { page } = router.query
  const pageNumber = parseInt(page)
  const [pageOne, setPageOne] = useState('')
  const [pageTwo, setPageTwo] = useState('')

  useEffect(() => {
    const getPages = async () => {
      const p1 = pageNumber
      const p2 = pageNumber + 1
      const pageOneData = config.pages[p1]
      if (!pageOneData) {
        setPageOne('Not Available')
        setPageTwo('Not Available')
        return
      }
      const pageTwoData = config.pages[p2]
      const reqs = await Promise.all([
        fetch(`/book/pages/${pageOneData.chapter}/${pageOneData.page}.txt`),
        pageTwoData
          ? fetch(`/book/pages/${pageTwoData.chapter}/${pageTwoData.page}.txt`)
          : Promise.resolve({ text: () => Promise.resolve('End') }),
      ])
      const pageTexts = await Promise.all(reqs.map((r) => r.text()))
      setPageOne(`${pageTexts[0]}`)
      setPageTwo(`${pageTexts[1]}`)
    }
    getPages()
  }, [config.pages, pageNumber])

  // Audio Calculations
  const DEFAULT_CURR_WORD = useMemo(() => {
    return {
      word: '',
      index: -1,
      paragraph: -1,
      page: -1,
    }
  }, [])
  const [audioSrc, setAudioSrcState] = useState({ src: '', i: 0 })
  const setAudioSrc = useCallback(
    (src, fallback = '') =>
      setAudioSrcState({ src, fallback, i: audioSrc.i + 1 }),
    [audioSrc.i]
  )
  const [currWord, setCurrWord] = useState(DEFAULT_CURR_WORD)
  const [timeout, setTimeoutState] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [definition, setDefinition] = useState('')

  const unsetWord = useCallback(() => {
    setCurrWord(DEFAULT_CURR_WORD)
    setShowAlert(false)
    setAudioSrc('')
  }, [DEFAULT_CURR_WORD, setAudioSrc])

  useEffect(() => {
    if (isBookPlaying) {
      setAudioSrcState({ src: '', i: -1 })
      unsetWord()
    }
  }, [isBookPlaying, unsetWord])

  const clickWord =
    (page) =>
    (word, paragraph, index, progress = 0) =>
    () => {
      if (timeout) clearTimeout(timeout)
      if (isTouchingWord) {
        setAudioProgress(progress - 0.03 + page)
        setIsTouchingWord(false)
        return
      }
      if (
        page === currWord.page &&
        word == currWord.word &&
        paragraph === currWord.paragraph &&
        index === currWord.index
      ) {
        fetch(`/api/definition?word=${cleanedWord(word)}`).then((res) =>
          res.json().then((definition) => {
            setShowAlert(true)
            setDefinition(definition)
          })
        )
      } else {
        setShowAlert(false)
        setCurrWord({ page, word, paragraph, index })
        playWordAudio(word)
        setIsBookPlaying(false)
        setTimeoutState(setTimeout(unsetWord, 3000))
      }
    }

  const playWordAudio = (word) => {
    setAudioSrc(
      `https://brainy-literacy-assets.s3.amazonaws.com/audio/words/${word.charAt(
        0
      )}/${cleanedWord(word).toLowerCase()}.mp3`,
      `https://brainy-literacy-assets.s3.amazonaws.com/audio/french/${cleanedFrenchWord(
        word
      ).toLowerCase()}.mp3`
    )
    setIsBookPlaying(false)
  }

  const playDefinitionAudio = () => {
    setAudioSrc(
      `https://brainy-literacy-assets.s3.amazonaws.com/audio/defs/${cleanedWord(
        currWord.word
      )
        .charAt(0)
        .toUpperCase()}/${definition.key}%2B.mp3`,
      `https://brainy-literacy-assets.s3.amazonaws.com/audio/french/${cleanedFrenchWord(
        currWord.word
      ).toLowerCase()}.mp3`
    )
    setIsBookPlaying(false)
  }
  // Quiz Logic
  const openQuiz = () => {
    setQuizOpen(true)
    setAudioSrc('')
  }
  const closeQuiz = () => {
    setQuizOpen(false)
    setAudioSrc('')
  }

  const chapterHeading = (page = pageNumber) => {
    const chapter = config.pages[page].chapter
    const chapterData = config.book[chapter - 1]
    return chapterData.startPage === page ? chapterData.title : ''
  }

  // if odd, then show the first one, if even, then show the right one -> visibility
  // if screen size is bigger, then show both ->
  return (
    <Flex
      direction={'column'}
      align={'center'}
      w={'100%'}
      h={'100%'}
      overflow="hidden"
    >
      <Flex w="100%" h="100%" direction={'row'} pt="10" px="4">
        <Spacer />
        <Page
          text={pageOne}
          selected={currWord}
          clickWord={clickWord(0)}
          pageId={0}
          chapter={chapterHeading(pageNumber)}
        />
        <Spacer d={{ base: 'none', xl: 'block' }} />
        <Page
          d={{ base: 'none', xl: 'block' }}
          text={pageTwo}
          selected={currWord}
          clickWord={clickWord(1)}
          pageId={1}
          chapter={chapterHeading(pageNumber + 1)}
        />
        <Spacer />
      </Flex>
      <AudioManager src={audioSrc} />
      {showAlert && (
        <WordAlert
          word={cleanedWord(currWord.word)}
          definition={definition}
          closeAlert={() => unsetWord()}
          openQuiz={openQuiz}
          playDefinitionAudio={playDefinitionAudio}
        />
      )}
      {quizOpen && (
        <Quiz
          closeQuiz={closeQuiz}
          word={definition.key}
          setAudioSrc={setAudioSrc}
          playWordAudio={playWordAudio}
          playDefinitionAudio={playDefinitionAudio}
        />
      )}
    </Flex>
  )
}

export default Wrapper
