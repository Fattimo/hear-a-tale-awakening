import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import PageButton from './PageButton'

const Panel = ({ page, maxPage, chapter, config }) => {
  const router = useRouter()
  const data =
    typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem('awakening')) ?? {}
      : {}

  const pageBackward = (offset) => () => {
    const newPage = Math.max(parseInt(page) - offset, 1)
    router.replace(`/page/${newPage}`)
    adjustProgress(newPage)
  }
  const pageForward = (offset) => () => {
    const newPage = Math.min(parseInt(page) + offset, maxPage)
    router.replace(`/page/${newPage}`)
    adjustProgress(newPage)
  }

  const adjustProgress = (newPage) => {
    data.currPage = newPage
    const { page, chapter } = config.pages[newPage]
    const { pages } = config.book[chapter - 1]
    if (!data.chapterProgress) data.chapterProgress = {}
    data.chapterProgress[chapter] = {
      progress: Math.trunc((page / pages) * 100),
      page: newPage,
    }
    window.localStorage.setItem('awakening', JSON.stringify(data))
  }

  return (
    <Flex justify="center" align="center" h={150} mb={1}>
      <Box cursor="pointer">
        <PageButton onClick={pageBackward(1)} left />
        <PageButton onClick={pageBackward(2)} largeScreen left />
      </Box>
      <Text mx={4}>
        page {page}, chapter {chapter} | XX:XX
      </Text>
      <Box cursor="pointer">
        <PageButton onClick={pageForward(1)} />
        <PageButton onClick={pageForward(2)} largeScreen />
      </Box>
    </Flex>
  )
}

export default Panel
