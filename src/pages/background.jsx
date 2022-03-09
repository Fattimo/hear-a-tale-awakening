import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import Sidebar from 'src/components/Home/Sidebar'
import Image from 'next/image'

const Background = () => {
  const BACKGROUND_TEXT =
    'KATE CHOPIN (February 8, 1850 — August 22, 1904) was known during her time as a local colorist and the author of a somewhat indecent novel but has emerged as a writer far ahead of her time in the South and in the United States. In her fiction she dealt directly with powerful psychological and sexual emotions. Although this was characteristic of the novel as practiced in France, it had not been done in the English language. Kate O’Flaherty Chopin was born in St. Louis, Missouri. Her father was killed in a railway accident when she was six, and for the next two years she lived at home with her mother, grandmother and great-grandmother, all of them widows. She grew up surrounded by smart, independent, single women. In 1870, she married Oscar Chopin, a Louisiana businessman. The couple lived in New Orleans where Kate had five boys and two girls, all before she was twenty-eight. Oscar died in 1882 and Kate took over the running of his plantation and general store. She moved back to St. Louis in 1884 to live with her mother who died the following year, leaving Kate alone with her children again. To support herself and her young family, she began to write. By the time The Awakening was published in 1899, Chopin was a well-known writer, having published more than a hundred stories, essays and sketches in literary magazines. The novel caused an uproar and Chopin was so deeply hurt by the public’s reaction that she wrote very little during the remaining five years of her life. Chopin died from a cerebral hemorrhage after collapsing at the World’s Fair, two days earlier.'
  const IMAGE_URLS = [
    '1KateChopin1879.jpg',
    '2 Kate Chopin.jpg',
    '3 Kate Chopin wedding portrait.jpg',
    '4 Chopin Home in Cloutierville.jpg',
    '5 Chopin Home in Cloutierville.jpg',
    '6 Kate Chopin and  Children.jpg',
    '7 Grand Isle Beach.jpg',
    '8 Woman near Beach.jpg',
  ]
  const ALT_TEXTS = [
    'Portrait of Kate Chopin',
    'Kate Chopin',
    'Kate Chopin Wedding Portrait',
    'Chopin Home in Cloutierville',
    'Chopin Home in Cloutierville',
    'Kate Chopin and Children',
    'Grand Isle Beach',
    'Woman near Beach',
  ]
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
              <Center flexShrink={1} m={4}>
                <Text fontWeight={'semibold'}>{BACKGROUND_TEXT}</Text>
              </Center>
            </Box>
          </Flex>
          <Box w={'100%'}>
            <Heading size={'md'}>Setting</Heading>
            <Box overflow={'auto'}>
              <Stack isInline mt={4} w={'80rem'} overflow={'hidden'}>
                {IMAGE_URLS.map((url, i) => (
                  <Box w={60} h={60} position={'relative'} key={url}>
                    <Image
                      src={`/images/Chopin_Pictures/${url}`}
                      alt={ALT_TEXTS[i]}
                      layout={'fill'}
                      objectFit={'contain'}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Background
