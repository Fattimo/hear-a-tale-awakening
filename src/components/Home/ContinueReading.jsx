import { Box, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

const ContinueReading = () => {
  return (
    <Box>
      <Text fontWeight={'semibold'}>Continue reading</Text>
      <NextLink href="/1" passHref={true}>
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
              <Text>Chapter X</Text>
              <Text>page 14</Text>
            </Box>
            <Box>sound</Box>
            <Box>no sound</Box>
          </Flex>
        </Link>
      </NextLink>
    </Box>
  )
}

export default ContinueReading
