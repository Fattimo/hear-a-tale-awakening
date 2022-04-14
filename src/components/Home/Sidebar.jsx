import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import SidebarLink from './SidebarLink'
import Image from 'next/image'

const Sidebar = () => {
  return (
    <Flex direction="column" w={140} pt={6} flexShrink={0}>
      <Box
        pos={'relative'}
        w={'60%'}
        style={{ aspectRatio: '1 / 1' }}
        bgColor={'theme.purple'}
        alignSelf={'center'}
        borderRadius={'50%'}
        mb={4}
      >
        <Image src={'/images/logo.png'} alt={'logo'} layout={'fill'} />
      </Box>
      <SidebarLink href="/">Home</SidebarLink>
      <SidebarLink href="/review">Review</SidebarLink>
      <SidebarLink href="/background">Background</SidebarLink>
      <SidebarLink href="/bookmarks">Bookmarks</SidebarLink>
      <SidebarLink href="/help">Help</SidebarLink>
    </Flex>
  )
}

export default Sidebar
