import React, { useEffect, useRef } from 'react'

const AudioManager = ({ word }) => {
  const player = useRef()

  useEffect(() => {
    if (word) {
      player.current.setAttribute(
        'src',
        `https://words-and-definitons.s3.amazonaws.com/words/${word.charAt(
          0
        )}/${word}.mp3`
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
