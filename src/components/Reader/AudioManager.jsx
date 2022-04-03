import React, { useEffect, useRef } from 'react'

const AudioManager = ({ src = {} }) => {
  const player = useRef()

  useEffect(() => {
    if (src.src) {
      player.current.setAttribute('src', src.src)
      const playPromise = player.current.play()
      playPromise.then(() => {}).catch(() => {})
    } else {
      player.current.removeAttribute('src')
    }
  }, [src])

  return (
    <audio ref={player} onEnded={() => player.current.removeAttribute('src')} />
  )
}

export default AudioManager
