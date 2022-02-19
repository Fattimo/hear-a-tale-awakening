import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import PageButton from './PageButton'

const Panel = ({ page, maxPage, chapter }) => {
  const router = useRouter()

  const pageBackward = (offset) => () =>
    router.replace(`/${Math.max(parseInt(page) - offset, 1)}`)
  const pageForward = (offset) => () =>
    router.replace(`/${Math.min(parseInt(page) + offset, maxPage)}`)

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
