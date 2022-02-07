import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Panel = ({ page }) => {
  const router = useRouter()
  const MAX_PAGE = 5

  const pageBackward = (offset) => () =>
    router.replace(`/book/${Math.max(parseInt(page) - offset, 1)}`)
  const pageForward = (offset) => () =>
    router.replace(`/book/${Math.min(parseInt(page) + offset, MAX_PAGE)}`)

  return (
    <Flex justify="space-between">
      <Box cursor="pointer">
        <Box display={{ base: 'block', xl: 'none' }} onClick={pageBackward(1)}>
          back1
        </Box>
        <Box display={{ base: 'none', xl: 'block' }} onClick={pageBackward(2)}>
          back2
        </Box>
      </Box>
      <Link href="/book">up</Link>
      <Box cursor="pointer">
        <Box display={{ base: 'block', xl: 'none' }} onClick={pageForward(1)}>
          forward1
        </Box>
        <Box display={{ base: 'none', xl: 'block' }} onClick={pageForward(2)}>
          forward2
        </Box>
      </Box>
    </Flex>
  )
}

export default Panel
