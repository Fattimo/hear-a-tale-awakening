import { Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
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

const ReaderSidebar = ({ page, config, ...rest }) => {
  const [localStorage, setLocalStorage] = useState({})
  const [bookmarkedState, setBookmarked] = useState(false)
  const [isDoublePaged, setIsDoublePaged] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsDoublePaged(window.innerWidth >= 1200)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    //TODO: replace with real user tied data
    const data =
      typeof window !== 'undefined'
        ? JSON.parse(window.localStorage.getItem('awakening')) ?? {}
        : {}
    setLocalStorage(data)
    return () => window.removeEventListener('resize', handleResize)
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

  const [audioSrc, setAudioSrc] = useState({ src: '' })
  const [audioStart, setAudioStart] = useState(0)
  const [audioEnd, setAudioEnd] = useState(-1)
  const [isAudio, setIsAudio] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    setAudioStates()
  }, [page])
  const toggleAudio = () => {
    setIsAudio(!isAudio)
    setIsPlaying(!isAudio)
    if (!isAudio) setAudioStates()
  }

  const setAudioStates = useCallback(() => {
    const pageData = config.pages[page]
    setAudioSrc({
      src: `https://brainy-literacy-assets.s3.amazonaws.com/audio/awa/awa_${pageData.chapter}.mp3`,
    })
    setAudioStart(pageData.ts)
    let endTs = pageData.ts + pageData.duration
    if (isDoublePaged) {
      const nextPageData = config.pages[page + 1]
      if (nextPageData) endTs = nextPageData.duration + endTs
    }
    setAudioEnd(endTs)
  }, [config.pages, isDoublePaged, page])

  const pausePlay = () => {
    setIsPlaying(!isPlaying)
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
        <SidebarButton onClick={pausePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </SidebarButton>
      ) : null}
      <SidebarButton onClick={bookmark}>
        {bookmarkedState ? <BookmarkIconFilled /> : <BookmarkIconUnfilled />}
      </SidebarButton>
      <AudioManager
        src={audioSrc}
        paused={!isPlaying}
        start={audioStart}
        end={audioEnd}
      />
    </Flex>
  )
}

export default ReaderSidebar
