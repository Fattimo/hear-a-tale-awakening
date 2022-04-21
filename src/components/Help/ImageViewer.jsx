import { Box, Flex, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@chakra-ui/icons'

const ImageViewer = ({ images }) => {
  const [page, setPage] = useState(0)
  const pageForward = () => setPage(Math.min(images.length - 1, page + 1))
  const pageBack = () => setPage(Math.max(0, page - 1))
  return (
    <Flex
      h={'100%'}
      w={'100%'}
      position={'relative'}
      bgColor={'theme.lightpurple'}
    >
      {images.map((src, i) => (
        <Image
          alt="tutorial"
          key={`tutorial_${i}`}
          src={src}
          layout={page === i ? 'fill' : null}
          width={0}
          height={0}
          objectFit={'contain'}
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
            {images.map((_, i) => (
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
          <NextLink href={'/help'} passHref>
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

export default ImageViewer
