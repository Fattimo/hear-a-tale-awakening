import { Box, Flex, Link } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import tutorial_1 from 'public/images/tutorial/tutorial_1.png'
import tutorial_2 from 'public/images/tutorial/tutorial_2.png'
import tutorial_3 from 'public/images/tutorial/tutorial_3.png'
import tutorial_4 from 'public/images/tutorial/tutorial_4.png'
import tutorial_5 from 'public/images/tutorial/tutorial_5.png'
import NextLink from 'next/link'

const Help = () => {
  const [page, setPage] = useState(0)
  const pageForward = () => setPage(Math.min(4, page + 1))
  const pageBack = () => setPage(Math.max(0, page - 1))
  return (
    <Flex h={'100%'} w={'100%'} position={'relative'}>
      <Image
        alt="tutorial"
        src={tutorial_1}
        layout={page === 0 ? 'fill' : null}
        width={0}
        height={0}
      />
      <Image
        alt="tutorial"
        src={tutorial_2}
        layout={page === 1 ? 'fill' : null}
        width={0}
        height={0}
      />
      <Image
        alt="tutorial"
        src={tutorial_3}
        layout={page === 2 ? 'fill' : null}
        width={0}
        height={0}
      />
      <Image
        alt="tutorial"
        src={tutorial_4}
        layout={page === 3 ? 'fill' : null}
        width={0}
        height={0}
      />
      <Image
        alt="tutorial"
        src={tutorial_5}
        layout={page === 4 ? 'fill' : null}
        width={0}
        height={0}
      />
      <Flex
        justify={'space-between'}
        align={'center'}
        w={'100%'}
        h={'100%'}
        direction={'column'}
        zIndex={100}
      >
        <Flex justify={'space-around'} width={'100%'} mt={6}>
          <Box w={10} /> <Box w={10} />{' '}
          <NextLink href={'/'} passHref>
            <Link>Close</Link>
          </NextLink>
        </Flex>
        <Flex justify={'space-between'} width={'100%'}>
          <Box onClick={pageBack}>Left</Box>
          <Box onClick={pageForward}>Right</Box>
        </Flex>
        <Flex justify={'center'} align={'center'} mb={10}>
          <Box>1</Box>
          <Box>1</Box>
          <Box>1</Box>
          <Box>1</Box>
          <Box>1</Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Help
