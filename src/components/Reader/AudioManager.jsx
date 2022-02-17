import React, { useEffect, useRef, useState } from 'react'

const AudioManager = ({ word }) => {
  const player = useRef()
  const [src, setSrc] = useState()

  useEffect(() => {
    if (word) {
      const punctuationless = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      const cleanedWord = punctuationless.replace(/\s{2,}/g, ' ')
      setSrc(
        `https://words-and-definitons.s3.amazonaws.com/words/${cleanedWord.charAt(
          0
        )}/${cleanedWord}.mp3`
      )
    } else {
      player.current.removeAttribute('src')
    }
  }, [word])

  useEffect(() => {
    const playPromise = player.current.play()
    playPromise.then(() => {}).catch(() => {})
  }, [src])

  return <audio ref={player} src={src} />
}

export default AudioManager
