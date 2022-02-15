import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import SidebarLink from './SidebarLink'

const Sidebar = () => {
  return (
    <Flex direction="column" w={140} pt={6}>
      <Box
        w={'60%'}
        style={{ aspectRatio: '1 / 1' }}
        bgColor={'theme.purple'}
        alignSelf={'center'}
        borderRadius={'50%'}
        mb={4}
      />
      <SidebarLink href="/">Home</SidebarLink>
      <SidebarLink href="/review">Review</SidebarLink>
      <SidebarLink href="/background">Background</SidebarLink>
      <SidebarLink href="/bookmarks">Bookmarks</SidebarLink>
      <SidebarLink href="/help">Help</SidebarLink>
    </Flex>
  )
}

export default Sidebar
