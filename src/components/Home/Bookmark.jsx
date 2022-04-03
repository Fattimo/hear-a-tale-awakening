import { Box, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

const Bookmark = ({ page, endLabel = false, children, ...rest }) => {
  const bookmark = (
    <Box
      bgColor={endLabel ? 'theme.gray' : 'theme.purple'}
      minW={16}
      maxW="40"
      textColor={'white'}
      style={{ aspectRatio: '1 / 1' }}
      borderRadius="2xl"
      w={!page && !endLabel ? '30%' : null}
      {...rest}
    >
      <Flex align="center" justify="center" h="100%" direction="column">
        {children}
      </Flex>
    </Box>
  )
  if (!page && !endLabel) return bookmark
  return (
    <NextLink href={endLabel ? '/bookmarks' : `/page/${page}`} passHref>
      <Link maxW={40} w={'30%'} minW={16}>
        {bookmark}
      </Link>
    </NextLink>
  )
}

export default Bookmark
