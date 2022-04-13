import { Box, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { HeadphonesIcon, NoIcon } from '../Icons'

const ContinueReading = ({ chapter, page }) => {
  return (
    <Box>
      <Text fontWeight={'semibold'}>Continue reading</Text>
      <Flex
        mt="3"
        mx="3"
        p="4"
        bgColor="theme.purple"
        textColor="white"
        borderRadius="3xl"
        justify="space-between"
        align="center"
        h="50%"
      >
        <Box>
          <Text>Chapter {chapter}</Text>
          <Text>page {page}</Text>
        </Box>
        <Flex>
          <NextLink href={`/page/${page}?play`} passHref>
            <Link>
              <Flex
                bgColor={'white'}
                color={'black'}
                w={12}
                h={12}
                borderRadius={'50%'}
                align={'center'}
                justify={'center'}
              >
                <HeadphonesIcon />
              </Flex>
            </Link>
          </NextLink>
          <NextLink href={`/page/${page}`} passHref={true}>
            <Link>
              <Flex
                bgColor={'white'}
                color={'black'}
                w={12}
                h={12}
                borderRadius={'50%'}
                align={'center'}
                justify={'center'}
                ml={4}
              >
                <HeadphonesIcon />
                <NoIcon position={'absolute'} w={8} h={8} />
              </Flex>
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ContinueReading
