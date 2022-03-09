import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

const Bookmark = ({ page, endLabel = false, children }) => {
  const bookmark = (
    <Box
      bgColor={endLabel ? 'theme.gray' : 'theme.purple'}
      minW={16}
      maxW="40"
      flexGrow={1}
      textColor={'white'}
      style={{ aspectRatio: '1 / 1' }}
      borderRadius="2xl"
    >
      <Flex align="center" justify="center" h="100%" direction="column">
        {children}
      </Flex>
    </Box>
  )
  if (!page) return bookmark
  return (
    <NextLink href={`/page/${page}`} passHref>
      <Link flexGrow={1} maxW={40}>{bookmark}</Link>
    </NextLink>
  )
}

export default Bookmark
