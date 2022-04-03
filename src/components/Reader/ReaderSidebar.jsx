import { Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  BookmarkIconFilled,
  BookmarkIconUnfilled,
  HeadphonesIcon,
  HomeIcon,
  NoIcon,
  PauseIcon,
  PlayIcon,
  TouchIcon,
} from '../Icons'
import AudioManager from './AudioManager'
import SidebarButton from './SidebarButton'

const ReaderSidebar = ({ page, ...rest }) => {
  const [localStorage, setLocalStorage] = useState({})
  const [bookmarkedState, setBookmarked] = useState(false)
  useEffect(() => {
    //TODO: replace with real user tied data
    const data =
      typeof window !== 'undefined'
        ? JSON.parse(window.localStorage.getItem('awakening')) ?? {}
        : {}
    setLocalStorage(data)
  }, [])

  useEffect(
    () => setBookmarked(localStorage.bookmarks?.includes(page)),
    [localStorage.bookmarks, page]
  )

  const bookmark = () => {
    if (!localStorage.bookmarks) localStorage.bookmarks = []
    if (!bookmarkedState) localStorage.bookmarks.push(page)
    else {
      const i = localStorage.bookmarks.indexOf(page)
      if (i >= 0) localStorage.bookmarks.splice(i, 1)
    }
    // TODO: This is a race condition with the other local storage set item in Panel.jsx. Will be resolved when this system isnt tied to localstorage.
    window.localStorage.setItem('awakening', JSON.stringify(localStorage))
    setBookmarked(!bookmarkedState)
    setLocalStorage(localStorage)
  }

  const [isAudio, setIsAudio] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const toggleAudio = () => {
    setIsAudio(!isAudio)
    setIsPlaying(!isAudio)
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
      <NextLink href="/" passHref prefetch={false}>
        <Link>
          <SidebarButton>
            <HomeIcon />
          </SidebarButton>
        </Link>
      </NextLink>
      <SidebarButton>
        <TouchIcon />
      </SidebarButton>
      <SidebarButton onClick={toggleAudio}>
        <HeadphonesIcon />
        {isAudio ? null : <NoIcon position={'absolute'} w={6} h={6} />}
      </SidebarButton>
      {isAudio ? (
        <SidebarButton>
          {isPlaying ?  <PauseIcon /> : <PlayIcon />}
        </SidebarButton>
      ) : null}
      <SidebarButton onClick={bookmark}>
        {bookmarkedState ? <BookmarkIconFilled /> : <BookmarkIconUnfilled />}
      </SidebarButton>
      <AudioManager />
    </Flex>
  )
}

export default ReaderSidebar
