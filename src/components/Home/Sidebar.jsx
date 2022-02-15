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
      <SidebarLink href="/">
        <a>Home</a>
      </SidebarLink>
      <SidebarLink href="/review">
        <a>Review</a>
      </SidebarLink>
      <SidebarLink href="/background">
        <a>Background</a>
      </SidebarLink>
      <SidebarLink href="/bookmarks">
        <a>Bookmarks</a>
      </SidebarLink>
      <SidebarLink href="/help">
        <a>Help</a>
      </SidebarLink>
    </Flex>
  )
}

export default Sidebar
