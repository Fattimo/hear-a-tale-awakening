import React, { useEffect, useRef } from 'react'

const AudioManager = ({ src }) => {
  const player = useRef()

  useEffect(() => {
    if (src) {
      player.current.setAttribute('src', src)
      const playPromise = player.current.play()
      playPromise.then(() => {}).catch(() => {})
    } else {
      player.current.removeAttribute('src')
    }
  }, [src])

  return <audio ref={player} />
}

export default AudioManager
