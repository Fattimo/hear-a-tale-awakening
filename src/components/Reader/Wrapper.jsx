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
        res.text().then((definition) => {
          setShowAlert(true)
          setDefinition(definition)
        })
      )
    } else {
      setShowAlert(false)
      setCurrWord({ page, word, paragraph, index })
      setTimeoutState(setTimeout(unsetWord, 3000))
    }
  }
  const unsetWord = () => {
    setCurrWord(DEFAULT_CURR_WORD)
    setShowAlert(false)
  }

  // Quiz Logic
  const openQuiz = () => setQuizOpen(true)
  const closeQuiz = () => setQuizOpen(false)

  // Cleaned Word
  const cleanedWord = (word = currWord.word) => {
    const punctuationless = word.replace(/[.,/#!$%^&*;:{}=_`~()]/g, '')
    return punctuationless.replace(/\s{2,}/g, ' ')
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
        />
        <Spacer d={{ base: 'none', xl: 'block' }} />
        <Page
          d={{ base: 'none', xl: 'block' }}
          text={pageTwo}
          selected={currWord}
          clickWord={clickWord(1)}
          pageId={1}
        />
        <Spacer>
          <AudioManager word={cleanedWord()} />
        </Spacer>
      </Flex>
      {showAlert && (
        <WordAlert
          word={cleanedWord()}
          definition={definition}
          closeAlert={() => unsetWord()}
          openQuiz={openQuiz}
        />
      )}
      {quizOpen && <Quiz closeQuiz={closeQuiz} word={cleanedWord()} />}
    </Flex>
  )
}

export default Wrapper
