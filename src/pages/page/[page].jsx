import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Wrapper from 'src/components/Reader/Wrapper'
import { Box, Flex } from '@chakra-ui/react'
import Panel from 'src/components/Reader/Panel'
import ReaderSidebar from 'src/components/Reader/ReaderSidebar'

export async function getServerSideProps() {
  const config = require('public/book/config.json')
  return { props: { config } }
}

const Page = ({ config = {} }) => {
  const [isBookPlaying, setIsBookPlaying] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [audioProgress, setAudioProgress] = useState(-1)
  const [isTouchingWord, setIsTouchingWord] = useState(false)
  const router = useRouter()
  const { page } = router.query
  const pageNumber = parseInt(page)
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > config.totalPages)
    return <Box>Invalid Page</Box>
  const pageData = config.pages[page]
  const chapterData = config.book[pageData ? pageData.chapter - 1 : 0]
  return (
    <Flex h="100%" w={'100%'}>
      <ReaderSidebar
        page={pageNumber}
        config={config}
        isPlaying={isBookPlaying}
        setIsPlaying={setIsBookPlaying}
        isTouchingWord={isTouchingWord}
        setIsTouchingWord={setIsTouchingWord}
        audioProgress={audioProgress}
        pointerEvents={quizOpen ? 'none' : null}
      />
      <Flex
        direction="column"
        h="100%"
        bgColor={'white'}
        borderRadius={'2rem 0 0 2rem'}
        overflow={'hidden'}
        flexGrow={1}
      >
        <Wrapper
          config={config}
          quizOpen={quizOpen}
          setQuizOpen={setQuizOpen}
          isBookPlaying={isBookPlaying}
          setIsBookPlaying={setIsBookPlaying}
          setAudioProgress={setAudioProgress}
          isTouchingWord={isTouchingWord}
          setIsTouchingWord={setIsTouchingWord}
        />
        <Panel
          maxPage={config.totalPages}
          chapter={chapterData.chapter}
          pointerEvents={quizOpen ? 'none' : null}
          config={config}
        />
      </Flex>
    </Flex>
  )
}

export default Page
