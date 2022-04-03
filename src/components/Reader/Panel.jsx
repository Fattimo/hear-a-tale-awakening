import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import PageButton from './PageButton'

const Panel = ({ maxPage, chapter, config, ...rest }) => {
  const router = useRouter()

  useEffect(() => {
    const { page, chapter } = config.pages[router.query.page]
    const { pages } = config.book[chapter - 1]
    const localStorage =
      JSON.parse(window.localStorage.getItem('awakening')) ?? {}
    localStorage.currPage = router.query.page
    if (!localStorage.chapterProgress) localStorage.chapterProgress = {}
    localStorage.chapterProgress[chapter] = {
      progress: Math.min(Math.trunc((page + 1 / pages) * 100), 100),
      page: router.query.page
    }
    console.log(page)
    console.log(pages)
    window.localStorage.setItem('awakening', JSON.stringify(localStorage))
  }, [config.book, config.pages, router.query])

  const pageBackward = (offset) => () => {
    const newPage = Math.max(parseInt(router.query.page) - offset, 1)
    router.replace(`/page/${newPage}`)
  }
  const pageForward = (offset) => () => {
    const newPage = Math.min(parseInt(router.query.page) + offset, maxPage)
    router.replace(`/page/${newPage}`)
  }

  return (
    <Flex justify="center" align="center" h={150} mb={1} {...rest}>
      <Box cursor="pointer">
        <PageButton onClick={pageBackward(1)} left />
        <PageButton onClick={pageBackward(2)} largeScreen left />
      </Box>
      <Text mx={4}>
        page {router.query.page}, chapter {chapter} | XX:XX
      </Text>
      <Box cursor="pointer">
        <PageButton onClick={pageForward(1)} />
        <PageButton onClick={pageForward(2)} largeScreen />
      </Box>
    </Flex>
  )
}

export default Panel
