import { Box, Flex, Grid, GridItem, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Index = () => {
  const USER = 'ISABELLA MOAK'
  return (
    <Flex h="100%">
      <Flex direction="column" w={140}>
        <Box>Logo</Box>
        <Link href="/book">Home</Link>
        <Link href="/book">Review</Link>
        <Link href="/book">Background</Link>
        <Link href="/book">Help</Link>
        <Link href="/book">About</Link>
      </Flex>
      <Grid
        bgColor="white"
        templateColumns="1fr 1fr"
        templateRows="min-content 1fr 1fr"
        flexGrow={1}
        borderRadius="3xl"
        p={6}
        rowGap={4}
        columnGap={6}
      >
        <GridItem colSpan={2}>
          <Text>Welcome Back, {USER}</Text>
        </GridItem>
        <GridItem>
          <Text>Continue reading</Text>
          <Flex
            m="5"
            p="4"
            bgColor="purple.300"
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
        </GridItem>
        <GridItem rowSpan={2}>
          <Text>Chapters</Text>
          <Box bgColor="gray.400" m={2} borderRadius="lg" p={1.5}>
            <Flex justify="space-between">
              <Text>Chapter 1</Text>
              <Text>wheel</Text>
            </Flex>
          </Box>
          <Box bgColor="red.100">Chapter 2</Box>
        </GridItem>
        <GridItem>
          <Text>Your bookmarks</Text>
          <Flex justify="space-between" m="5">
            <Box
              bgColor="blue.200"
              minW={16}
              maxW="40"
              w="30%"
              style={{ aspectRatio: '1 / 1' }}
              borderRadius="2xl"
            >
              <Flex align="center" justify="center" h="100%" direction="column">
                <Text>page 13</Text>
                <Text>line</Text>
                <Text>1:46</Text>
              </Flex>
            </Box>
            <Box
              bgColor="blue.200"
              minW={16}
              maxW="40"
              w="30%"
              style={{ aspectRatio: '1 / 1' }}
              borderRadius="2xl"
            >
              <Flex align="center" justify="center" h="100%" direction="column">
                <Text>page 13</Text>
                <Text>line</Text>
                <Text>1:46</Text>
              </Flex>
            </Box>
            <Box
              bgColor="gray.200"
              minW={16}
              maxW="40"
              w="30%"
              borderRadius="2xl"
              style={{ aspectRatio: '1 / 1' }}
            >
              <Flex align="center" justify="center" h="100%" direction="column">
                <Spacer />
                <Text>+</Text>
                <Spacer />
              </Flex>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default Index
