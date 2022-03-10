import { SettingsIcon } from '@chakra-ui/icons'
import { Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  BookmarkIconFilled,
  BookmarkIconUnfilled,
  HeadphonesIcon,
  HomeIcon,
  PlayIcon,
} from '../Icons'
import SidebarButton from './SidebarButton'

const ReaderSidebar = ({ bookmarked = false, page, ...rest }) => {
  //TODO: replace with real user tied data
  const data =
    typeof window !== 'undefined'
      ? JSON.parse(window.localStorage.getItem('awakening')) ?? {}
      : {}

  const [bookmarkedState, setBookmarked] = useState(false)
  useEffect(() => {
    if (data.bookmarks.includes(page)) setBookmarked(true)
    else setBookmarked(bookmarked)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarked, page])

  const bookmark = () => {
    if (!data.bookmarks) data.bookmarks = []
    if (!bookmarkedState) data.bookmarks.push(page)
    else {
      const i = data.bookmarks.indexOf(page)
      if (i > 0) data.bookmarks.splice(i, 1)
    }
    window.localStorage.setItem('awakening', JSON.stringify(data))
    setBookmarked(!bookmarkedState)
  }
  return (
    <Flex
      direction="column"
      justify={'center'}
      align={'center'}
      px={8}
      flexShrink={0}
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
      <SidebarButton onClick={bookmark}>
        {bookmarkedState ? <BookmarkIconFilled /> : <BookmarkIconUnfilled />}
      </SidebarButton>
    </Flex>
  )
}

export default ReaderSidebar
