import { Box, CircularProgress, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'

const Chapter = ({ number = 1, chapterProgress, chapter }) => {
  const [progress, setProgress] = useState(0)
  const [href, setHref] = useState('/page/1')
  useEffect(() => {
    if (chapterProgress) {
      setProgress(chapterProgress.progress ?? 0)
      setHref(`/page/${chapterProgress.page ?? chapter.startPage}`)
    } else {
      setProgress(0)
      setHref(`/page/${chapter.startPage ?? 1}`)
    }
  }, [chapter.startPage, chapterProgress])
  return (
    <NextLink href={href} passHref>
      <Link>
        <Box bgColor="theme.gray" m={2} borderRadius="xl" p={2}>
          <Flex justify="space-between" align={'center'} px={2}>
            <Text fontSize={'sm'} fontWeight={'semibold'}>
              Chapter {number}
            </Text>
            <CircularProgress
              color={'theme.purple'}
              value={progress}
              thickness={15}
              size={'30px'}
            />
          </Flex>
        </Box>
      </Link>
    </NextLink>
  )
}

export default Chapter
