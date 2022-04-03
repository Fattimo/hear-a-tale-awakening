import React, { useEffect, useRef } from 'react'

const AudioManager = ({ src = {}, paused = false, start = 0, end = -1 }) => {
  const player = useRef()

  useEffect(() => {
    if (src.src) {
      player.current.setAttribute('src', src.src)
      player.current.currentTime = start
      const playPromise = player.current.play()
      playPromise.then(() => {}).catch(() => {})
    } else {
      player.current.removeAttribute('src')
    }
  }, [src])

  useEffect(() => {
    if (paused) player.current.pause()
    else player.current.play()
  }, [paused])

  const checkPause = () => {
    if (end > 0 && player.current.currentTime > end) player.current.pause()
  }

  return (
    <audio
      ref={player}
      onEnded={() => player.current.removeAttribute('src')}
      onTimeUpdate={checkPause}
    />
  )
}

export default AudioManager
