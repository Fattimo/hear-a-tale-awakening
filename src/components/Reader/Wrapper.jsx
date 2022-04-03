import { Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Quiz from '../modals/Quiz'
import AudioManager from './AudioManager'
import Page from './Page'
import WordAlert from './WordAlert'

const Wrapper = ({ config, quizOpen, setQuizOpen }) => {
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
  const DEFAULT_CURR_WORD = {
    word: '',
    index: -1,
    paragraph: -1,
    page: -1,
  }
  const [audioSrc, setAudioSrcState] = useState({ src: '', i: 0 })
  const setAudioSrc = (src) => setAudioSrcState({ src, i: audioSrc.i + 1 })
  const [currWord, setCurrWord] = useState(DEFAULT_CURR_WORD)
  const [timeout, setTimeoutState] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [definition, setDefinition] = useState('')
  const clickWord = (page) => (word, paragraph, index) => () => {
    if (timeout) clearTimeout(timeout)
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
      setAudioSrc(
        `https://words-and-definitons.s3.amazonaws.com/words/${word.charAt(
          0
        )}/${cleanedWord(word)}.mp3`
      )
      setTimeoutState(setTimeout(unsetWord, 3000))
    }
  }
  const unsetWord = () => {
    setCurrWord(DEFAULT_CURR_WORD)
    setShowAlert(false)
    setAudioSrc('')
  }

  // Quiz Logic
  const openQuiz = () => setQuizOpen(true)
  const closeQuiz = () => setQuizOpen(false)

  // Cleaned Word
  const cleanedWord = (word = currWord.word) => {
    const punctuationless = word.replace(/[.,/#!$%^&*;:{}=_`~()]/g, '')
    return punctuationless.replace(/\s{2,}/g, ' ')
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
        <Spacer>
          <AudioManager src={audioSrc} />
        </Spacer>
      </Flex>
      {showAlert && (
        <WordAlert
          word={cleanedWord()}
          definition={definition}
          closeAlert={() => unsetWord()}
          openQuiz={openQuiz}
          setAudioSrc={setAudioSrc}
        />
      )}
      {quizOpen && (
        <Quiz
          closeQuiz={closeQuiz}
          word={definition.key}
          setAudioSrc={setAudioSrc}
        />
      )}
    </Flex>
  )
}

export default Wrapper
