import React, { useEffect, useRef } from 'react'

const AudioManager = ({ word }) => {
  const player = useRef()

  useEffect(() => {
    if (word) {
      const punctuationless = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      const cleanedWord = punctuationless.replace(/\s{2,}/g, ' ')
      player.current.setAttribute(
        'src',
        `https://words-and-definitons.s3.amazonaws.com/words/${cleanedWord.charAt(
          0
        )}/${cleanedWord}.mp3`
      )
      const playPromise = player.current.play()
      playPromise.then(() => {}).catch(() => {})
    } else {
      player.current.removeAttribute('src')
    }
  }, [word])

  return <audio ref={player} />
}

export default AudioManager
