import { Box, Flex, Link } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import tutorial_1 from 'public/images/tutorial/tutorial_1.png'
import tutorial_2 from 'public/images/tutorial/tutorial_2.png'
import tutorial_3 from 'public/images/tutorial/tutorial_3.png'
import tutorial_4 from 'public/images/tutorial/tutorial_4.png'
import tutorial_5 from 'public/images/tutorial/tutorial_5.png'
import NextLink from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@chakra-ui/icons'

const Help = () => {
  const PAGES = [tutorial_1, tutorial_2, tutorial_3, tutorial_4, tutorial_5]
  const [page, setPage] = useState(0)
  const pageForward = () => setPage(Math.min(4, page + 1))
  const pageBack = () => setPage(Math.max(0, page - 1))
  return (
    <Flex h={'100%'} w={'100%'} position={'relative'}>
      {PAGES.map((src, i) => (
        <Image
          alt="tutorial"
          key={`tutorial_${i}`}
          src={src}
          layout={page === i ? 'fill' : null}
          width={0}
          height={0}
        />
      ))}
      <Flex
        justify={'space-between'}
        align={'center'}
        w={'100%'}
        h={'100%'}
        direction={'column'}
        zIndex={100}
      >
        <Box />
        <Flex justify={'space-between'} width={'100%'}>
          <ArrowLeftIcon
            color={'white'}
            cursor={'pointer'}
            onClick={pageBack}
            ml={10}
          >
            Left
          </ArrowLeftIcon>
          <ArrowRightIcon
            color={'white'}
            cursor={'pointer'}
            onClick={pageForward}
            mr={10}
          >
            Right
          </ArrowRightIcon>
        </Flex>
        <Flex
          justify={'center'}
          align={'center'}
          direction={'column'}
          mb={{ base: 2, xl: 6 }}
        >
          <Flex justify={'center'} align={'center'} my={1}>
            {PAGES.map((_, i) => (
              <Box
                key={i}
                mx={1}
                w={4}
                h={4}
                borderRadius={'50%'}
                bgColor={page === i ? 'theme.purple' : 'white'}
              />
            ))}
          </Flex>
          <NextLink href={'/'} passHref>
            <Link
              bgColor={'white'}
              padding={1}
              borderRadius={'50%'}
              w={8}
              h={8}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <CloseIcon color={'red'} />
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Help
