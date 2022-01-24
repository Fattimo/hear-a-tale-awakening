import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import classes from "./SSRPage.module.css"

const SSRPage = ({ message, errorMessage, member }) => {
  const [audioURI, setAudioURI] = useState("/static/sampleclip.mp3")
  const [text, setText] = useState(
    "We're no strangers to love\n You know the rules and so do I"
  )
  const [isSyncing, setIsSyncing] = useState(false)
  const [currentTime, setCurrentTime] = useState(-1)
  const startButtonRef = useRef(null)
  const audioPlayerRef = useRef(null)

  const uploadAudioFile = (e) => {
    const file = e.target.files[0] || null
    if (file) {
      const reader = new FileReader()
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          setAudioURI(reader.result)
        },
        false
      )
      reader.readAsDataURL(file)
    }
  }

  const startSyncing = () => {
    setIsSyncing(true)
    startButtonRef.current.blur()
  }

  return (
    <>
      <h2 className={classes.CenterText}>Welcome to Next.js!</h2>
      <h3>
        This page is server-side rendered, because all API calls are made in
        getInitialProps
      </h3>
      {errorMessage == null ? (
        <h4>SSR Message: {message}</h4>
      ) : (
        <h4>SSR Error: {errorMessage}</h4>
      )}
      <p>You can tell because the text above does not flash on refresh</p>
      {member && <p>{member.name}</p>}
      <div>
        <input accept="audio/*" type="file" onChange={uploadAudioFile} />
        <audio
          ref={audioPlayerRef}
          src={audioURI}
          controls
          onTimeUpdate={() =>
            setCurrentTime(audioPlayerRef.current.currentTime)
          }
        />
        <textarea
          name="story"
          rows="5"
          cols="33"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button ref={startButtonRef} onClick={startSyncing}>
        Begin Syncing
      </button>
      <button onClick={() => setIsSyncing(false)}>Stop Syncing</button>
      <p>Currently: {`${isSyncing ? "" : "Not"} Syncing`}</p>
      <SyncBox
        text={text}
        isSyncing={isSyncing}
        setIsSyncing={setIsSyncing}
        audioPlayerRef={audioPlayerRef}
        currentTime={currentTime}
      />
    </>
  )
}

const SyncBox = ({
  text,
  isSyncing,
  setIsSyncing,
  audioPlayerRef,
  currentTime,
}) => {
  const [currentIndex, setCurrentIndexState] = useState(-1)
  const currentIndexRef = useRef(0)
  const setCurrentIndex = (index) => {
    setCurrentIndexState(index)
    currentIndexRef.current = index
  }

  const words = text.split(" ")
  const [timestamps, setTimestamps] = useState(new Array(words.length))

  const sync = (e) => {
    if (e.keyCode === 32) {
      document.body.focus()
      if (currentIndexRef.current + 1 >= words.length) {
        setIsSyncing(false)
        console.log(timestamps)
      }
      timestamps[currentIndexRef.current] = audioPlayerRef.current.currentTime
      setTimestamps(timestamps)
      setCurrentIndex(currentIndexRef.current + 1)
    }
  }

  useEffect(() => {
    setCurrentIndex(0)
    if (isSyncing) {
      document.addEventListener("keydown", sync)
      return () => document.removeEventListener("keydown", sync)
    } else {
      document.removeEventListener("keydown", sync)
    }
  }, [isSyncing])

  useEffect(() => {
    if (!isSyncing) {
      for (let i = 0; i < timestamps.length; i++) {
        if (timestamps[i] > currentTime) {
          setCurrentIndex(i - 1)
          return
        }
      }
      setCurrentIndex(timestamps.length - 1)
    }
  }, [currentTime])

  return (
    <div>
      {words.map((word, i) => {
        const [display, setDisplay] = useState(word)
        return (
          <a
            key={i}
            style={{
              padding: "0 3px",
              background: i === currentIndex ? "yellow" : "",
            }}
            onMouseOver={() => setDisplay(`${word}: ${timestamps[i]}`)}
            onMouseOut={() => setDisplay(word)}
          >
            {display}
          </a>
        )
      })}
    </div>
  )
}

SyncBox.propTypes = {
  text: PropTypes.string,
  isSyncing: PropTypes.bool,
  setIsSyncing: PropTypes.func,
  audioPlayerRef: PropTypes.object,
  currentTime: PropTypes.number,
}

SSRPage.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  member: PropTypes.object,
}

SSRPage.defaultProps = {
  message: null,
  errorMessage: null,
  member: null,
}

export default SSRPage
