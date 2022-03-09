import { Box, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { HeadphonesIcon } from '../Icons'

const ContinueReading = ({ chapter, page }) => {
  return (
    <Box>
      <Text fontWeight={'semibold'}>Continue reading</Text>
      <NextLink href="/page/1" passHref={true}>
        <Link>
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
              </Flex>
            </Flex>
          </Flex>
        </Link>
      </NextLink>
    </Box>
  )
}

export default ContinueReading
