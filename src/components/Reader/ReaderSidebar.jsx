import { SettingsIcon } from '@chakra-ui/icons'
import { Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { HeadphonesIcon, HomeIcon, PlayIcon } from '../Icons'
import SidebarButton from './SidebarButton'

const ReaderSidebar = ({ ...rest }) => {
  return (
    <Flex
      direction="column"
      justify={'center'}
      align={'center'}
      px={8}
      {...rest}
    >
      <NextLink href="/" passHref>
        <Link>
          <SidebarButton>
            <HomeIcon />
          </SidebarButton>
        </Link>
      </NextLink>
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
