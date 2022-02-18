import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Sidebar from 'src/components/Home/Sidebar'
import Image from 'next/image'

const Background = () => {
  const BACKGROUND_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget mi proin. Facilisi cras fermentum odio eu. '
  return (
    <Flex h={'100%'} w={'100%'} overflow={'hidden'}>
      <Sidebar />
      <Flex minW={0}>
        <Flex
          bgColor={'white'}
          flexGrow={1}
          borderRadius="2rem 0 0 2rem"
          p={10}
          direction={'column'}
          w={'100%'}
          overflow={'auto'}
        >
          <Heading>
            Background on <i>The Awakening</i>
          </Heading>
          <Flex align={'center'}>
            <Box>
              <Heading size={'md'}>About the Author</Heading>
              <Text>{BACKGROUND_TEXT}</Text>
            </Box>
            <Box w={'40rem'} h={40} position={'relative'}>
              <Image
                src={'/images/Chopin_Pictures/1KateChopin1879.jpg'}
                alt={'Portrait of Kate Chopin'}
                layout={'fill'}
                objectFit={'contain'}
              />
            </Box>
          </Flex>
          <Box w={'100%'}>
            <Heading size={'md'}>Setting</Heading>
            <Container overflow={'auto'}>
              <Flex mt={4}>
                <Box w={40} h={40} position={'relative'}>
                  <Image
                    src={'/images/Chopin_Pictures/1KateChopin1879.jpg'}
                    alt={'Portrait of Kate Chopin'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </Box>
                <Box w={40} h={40} position={'relative'}>
                  <Image
                    src={'/images/Chopin_Pictures/2 Kate Chopin.jpg'}
                    alt={'Kate Chopin'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </Box>
                <Box w={40} h={40} position={'relative'}>
                  <Image
                    src={
                      '/images/Chopin_Pictures/3 Kate Chopin wedding portrait.jpg'
                    }
                    alt={'Kate Chopin Wedding Portrait'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </Box>
                <Box w={40} h={40} position={'relative'}>
                  <Image
                    src={
                      '/images/Chopin_Pictures/4 Chopin Home in Cloutierville.jpg'
                    }
                    alt={'Chopin Home in Cloutierville'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </Box>
                <Box w={40} h={40} position={'relative'}>
                  <Image
                    src={
                      '/images/Chopin_Pictures/5 Chopin Home in Cloutierville.jpg'
                    }
                    alt={'Chopin Home in Cloutierville'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </Box>
                <Box w={40} h={40} position={'relative'}>
                  <Image
                    src={
                      '/images/Chopin_Pictures/6 Kate Chopin and  Children.jpg'
                    }
                    alt={'Kate Chopin and Children'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </Box>
                <Box w={40} h={40} position={'relative'}>
                  <Image
                    src={'/images/Chopin_Pictures/7 Grand Isle Beach.jpg'}
                    alt={'Grand Isle Beach'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </Box>
                <Box w={40} h={40} position={'relative'}>
                  <Image
                    src={'/images/Chopin_Pictures/8 Woman near Beach.jpg'}
                    alt={'Woman near Beach'}
                    layout={'fill'}
                    objectFit={'contain'}
                  />
                </Box>
              </Flex>
            </Container>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Background
