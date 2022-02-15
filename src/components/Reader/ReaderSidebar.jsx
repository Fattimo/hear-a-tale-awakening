import { SettingsIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import SidebarButton from './SidebarButton'

const ReaderSidebar = () => {
  return (
    <Flex direction="column" justify={'center'} align={'center'} w={150}>
      <SidebarButton />
      <SidebarButton />
      <SidebarButton icon={<SettingsIcon />} />
      <SidebarButton />
    </Flex>
  )
}

export default ReaderSidebar
