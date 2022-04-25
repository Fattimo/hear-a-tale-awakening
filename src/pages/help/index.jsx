import { Flex, Grid, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import Sidebar from 'src/components/Home/Sidebar'

const Help = () => {
  return (
    <Flex h={'100%'}>
      <Sidebar />
      <Flex
        bgColor={'white'}
        flexGrow={1}
        borderRadius="2rem 0 0 2rem"
        p={6}
        direction={'column'}
      >
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Help
        </Text>
        <Grid
          templateColumns={'1fr 1fr'}
          templateRows={'1fr 1fr'}
          flexGrow={1}
          gap={8}
          mt={4}
          color={'white'}
          fontWeight={'semibold'}
        >
          <HelpSelect slug={'Reading'} />
          <HelpSelect slug={'Quizzing'} />
          <HelpSelect slug={'Reviewing'} />
          <HelpSelect slug={'Bookmarking'} />
        </Grid>
      </Flex>
    </Flex>
  )
}

const HelpSelect = ({ slug }) => (
  <NextLink href={`/help/${slug.toLowerCase()}`} passHref>
    <Link bgColor={'theme.purple'} h={'full'} w={'full'} borderRadius={'2xl'}>
      <Flex align={'center'} justify={'center'} h={'full'} w={'full'}>
        {slug}
      </Flex>
    </Link>
  </NextLink>
)

export default Help
