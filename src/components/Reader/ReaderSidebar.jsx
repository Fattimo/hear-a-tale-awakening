import { SettingsIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { HeadphonesIcon, HomeIcon, PlayIcon } from '../Icons'
import SidebarButton from './SidebarButton'

const ReaderSidebar = () => {
  return (
    <Flex direction="column" justify={'center'} align={'center'} w={120} p={4}>
      <SidebarButton>
        <Link href="/" passHref={true}>
          <HomeIcon />
        </Link>
      </SidebarButton>
      <SidebarButton>
        <SettingsIcon />
      </SidebarButton>
      <SidebarButton>
        <HeadphonesIcon />
      </SidebarButton>
      <SidebarButton>
        <PlayIcon />
      </SidebarButton>
    </Flex>
  )
}

export default ReaderSidebar
