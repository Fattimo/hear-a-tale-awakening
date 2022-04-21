import { Flex, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
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
import { useSession } from 'next-auth/react'
import { updateBookData } from 'src/actions/bookData'
import { getAwakeningData, setAwakeningField } from 'utils/localstorage'

const ReaderSidebar = ({
  page,
  config,
  isPlaying,
  setIsPlaying,
  isTouchingWord,
  setIsTouchingWord,
  audioProgress,
  ...rest
}) => {
  const session = useSession()
  const [localStorage, setLocalStorage] = useState({})
  const [bookmarkedState, setBookmarked] = useState(false)
  const [isDoublePaged, setIsDoublePaged] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsDoublePaged(window.innerWidth >= 1200)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    setLocalStorage(getAwakeningData())
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
    setAwakeningField('bookmarks', localStorage.bookmarks)
    if (session.status === 'authenticated') updateBookData(localStorage)
    setBookmarked(!bookmarkedState)
    setLocalStorage(localStorage)
  }

  const [audioSrc, setAudioSrc] = useState({ src: '' })
  const [audioStart, setAudioStart] = useState(0)
  const [audioEnd, setAudioEnd] = useState(-1)
  const router = useRouter()
  const [isAudio, setIsAudio] = useState(false)
  const setAudioStates = useCallback(
    (offset = 0) => {
      const pageData = config.pages[page]
      setAudioSrc({
        src: `https://brainy-literacy-assets.s3.amazonaws.com/audio/awa/awa_${pageData.chapter}.mp3`,
      })
      let startTs = pageData.ts
      let endTs = pageData.ts + pageData.duration
      if (isDoublePaged) {
        const nextPageData = config.pages[page + 1]
        if (nextPageData) endTs = nextPageData.duration + endTs
        if (offset > 1) {
          offset %= 1
          if (nextPageData) startTs = nextPageData.ts
        }
      }
      // hard coding to set the startts to 0:08 on the first page whenever there is an offset
      if (page === 1 && offset > 0) startTs = 8
      setAudioStart(startTs + offset * pageData.duration)
      setAudioEnd(endTs)
    },
    [config.pages, isDoublePaged, page]
  )

  useEffect(() => {
    setAudioStates()
  }, [page, setAudioStates])

  useEffect(() => {
    if (router.query.play !== undefined) {
      setIsAudio(true)
      setIsPlaying(true)
    }
  }, [router.query.play, setAudioStates, setIsPlaying])

  useEffect(() => {
    setAudioStates(Math.max(audioProgress, 0.001))
    if (audioProgress === -1) return
    setIsAudio(true)
    setIsPlaying(true)
  }, [audioProgress, setAudioStates, setIsPlaying])

  const toggleAudio = () => {
    setIsAudio(!isAudio)
    setIsPlaying(!isAudio)
    if (!isAudio) setAudioStates()
  }

  const pausePlay = () => setIsPlaying(!isPlaying)

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
      <SidebarButton
        onClick={() => setIsTouchingWord(!isTouchingWord)}
        bgColor={isTouchingWord ? 'theme.faintpurple' : 'white'}
      >
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
      {isAudio && (
        <AudioManager
          src={audioSrc}
          paused={!isPlaying}
          start={audioStart}
          end={audioEnd}
        />
      )}
    </Flex>
  )
}

export default ReaderSidebar
