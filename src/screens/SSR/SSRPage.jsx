import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import classes from "./SSRPage.module.css"

const SSRPage = ({ message, errorMessage, member }) => {
  const [audioURI, setAudioURI] = useState("/static/sampleclip.mp3")
  const [text, setText] = useState(
    "We're no strangers to love\nYou know the rules and so do I"
  )
  const [isSyncing, setIsSyncing] = useState(false)
  const [currentTime, setCurrentTime] = useState(-1)

  const [delimiter, setDelimiter] = useState("2")
  const [mode, setMode] = useState("text")
  const [offset, setOffset] = useState(0.5)

  const [timestamps, setTimestamps] = useState(null)
  const [labels, setLabels] = useState(null)

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
      <p>
        Instructions: Input audio file. Input text block and choose delimiter,
        or toggle to input JSON, from previous syncing. Click begin syncing.
        Press play. Press space to sync.
      </p>
      <p>
        After starting to sync, you will be unable to make changes to the
        configuration.
      </p>
      {errorMessage == null ? (
        <h4>SSR Message: {message}</h4>
      ) : (
        <h4>SSR Error: {errorMessage}</h4>
      )}
      {member && <p>{member.name}</p>}
      <div>
        <input accept="audio/*" type="file" onChange={uploadAudioFile} />
        <br />
        <audio
          ref={audioPlayerRef}
          src={audioURI}
          controls
          onTimeUpdate={() =>
            setCurrentTime(audioPlayerRef.current.currentTime)
          }
        />
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            disabled={isSyncing}
          >
            <option value="text">Text + Delimiter Mode</option>
            <option value="json">JSON mode</option>
          </select>
          <label htmlFor="delim">&#9;Delimiter:</label>
          <select
            id="delim"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            disabled={isSyncing || mode === "json"}
          >
            <option value="0">[&quot; &quot;]</option>
            <option value="1">[. ]</option>
            <option value="2">[\n]</option>
          </select>
          <label htmlFor="offset">&#9;Offset:</label>
          <input
            id="offset"
            value={offset}
            type="number"
            style={{ width: "50px" }}
            disabled={isSyncing}
            onChange={(e) => setOffset(e.target.value)}
          />
        </div>
        <textarea
          name="story"
          rows="5"
          cols="36"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSyncing}
        />
      </div>
      <button ref={startButtonRef} onClick={startSyncing}>
        Begin Syncing
      </button>
      <button onClick={() => setIsSyncing(false)}>Stop Syncing</button>
      <p>Currently: {`${isSyncing ? "" : "Not"} Syncing`}</p>
      {isSyncing && (
        <SyncBox
          text={text}
          delimiter={delimiter}
          offset={offset}
          mode={mode}
          setIsSyncing={setIsSyncing}
          audioPlayerRef={audioPlayerRef}
          setTimestamps={setTimestamps}
          setLabels={setLabels}
        />
      )}
      {!isSyncing && (
        <PreviewBox
          timestamps={timestamps}
          labels={labels}
          setTimestamps={setTimestamps}
          currentTime={currentTime}
          audioPlayerRef={audioPlayerRef}
        />
      )}
    </>
  )
}

const SyncBox = ({
  text,
  delimiter,
  setIsSyncing,
  audioPlayerRef,
  setLabels,
  setTimestamps,
  offset,
  mode,
}) => {
  const [currentIndex, setCurrentIndexState] = useState(-1)
  const currentIndexRef = useRef(0)
  const setCurrentIndex = (index) => {
    setCurrentIndexState(index)
    currentIndexRef.current = index
  }

  let words, timestamps

  if (mode === "json") {
    try {
      const j = JSON.parse(text)
      words = j.labels
      timestamps = j.timestamps
    } catch (e) {
      return <div>ERROR IN JSON</div>
    }
  } else {
    words = text.split(/\r?\n/).reduce((words, paragraph) => {
      if (delimiter === "2") return [...words, paragraph]
      else if (delimiter === "1") return [...words, ...paragraph.split(". ")]
      else return [...words, ...paragraph.split(" ")]
    }, [])
    timestamps = new Array(words.length)
  }

  const sync = (e) => {
    if (e.keyCode === 32) {
      document.body.focus()
      let diff = 0
      if (!isNaN(offset)) diff = offset
      timestamps[currentIndexRef.current] =
        audioPlayerRef.current.currentTime - diff
      setCurrentIndex(currentIndexRef.current + 1)
      if (currentIndexRef.current >= words.length) {
        setIsSyncing(false)
        setTimestamps(timestamps)
        setLabels(words)
      }
    }
  }

  useEffect(() => {
    if (mode === "json") {
      setTimestamps(timestamps)
      setLabels(words)
    }

    setCurrentIndex(0)
    document.addEventListener("keydown", sync)
    return () => document.removeEventListener("keydown", sync)
  }, [])

  return (
    <div>
      {words.map((word, i) => (
        <a
          key={i}
          style={{
            padding: "0 3px",
            background: i === currentIndex ? "yellow" : "",
          }}
        >
          {word}
        </a>
      ))}
    </div>
  )
}

const PreviewBox = ({
  timestamps,
  labels,
  currentTime,
  setTimestamps,
  audioPlayerRef,
}) => {
  if (!timestamps || !labels) return <div></div>
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [download, setDownload] = useState(
    "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify({
          labels,
          timestamps,
        })
      )
  )

  useEffect(() => {
    // todo: replace with binary search
    for (let i = 0; i < timestamps.length; i++) {
      if (timestamps[i] > currentTime) {
        // first greater timestamp found, previous element is the current word
        setCurrentIndex(i - 1)
        return
      }
    }
    // current time greater than all elements, we're on the last word
    setCurrentIndex(timestamps.length - 1)
  }, [currentTime])

  const [currs, setCurrs] = useState(timestamps)
  const [errs, setErrs] = useState(new Array(timestamps.length).fill(false))
  const [clickeds, setClickeds] = useState(
    new Array(timestamps.length).fill(false)
  )

  return (
    <div>
      <div>
        {labels.map((word, i) => {
          const changeCurrent = (e) => {
            currs[i] = e.target.value
            setCurrs(currs)
            if (isNaN(parseFloat(e.target.value))) errs[i] = true
            else errs[i] = false
            setErrs(errs)
          }
          const acceptTs = () => {
            timestamps[i] = currs[i]
            setTimestamps(timestamps)
            clickeds[i] = false
            setClickeds(false)
            setDownload(
              "data:text/json;charset=utf-8," +
                encodeURIComponent(
                  JSON.stringify({
                    labels,
                    timestamps: timestamps.map((t) => parseFloat(t)),
                  })
                )
            )
          }
          const cancelTs = () => {
            clickeds[i] = false
            errs[i] = false
            currs[i] = timestamps[i]
            setClickeds(clickeds)
            setCurrs(currs)
            setErrs(errs)
          }
          return (
            <a
              key={i}
              style={{
                padding: "0 3px",
                background: i === currentIndex ? "lime" : "",
              }}
              onClick={() =>
                (audioPlayerRef.current.currentTime = timestamps[i])
              }
              className={classes.tooltip}
            >
              {word}{" "}
              <span className={classes.tooltiptext}>
                {clickeds[i] ? (
                  <div style={{ display: "flex" }}>
                    <input
                      value={currs[i]}
                      onChange={changeCurrent}
                      style={{
                        background: errs[i] ? "red" : "",
                        width: "100%",
                      }}
                    />
                    <button disabled={errs[i]} onClick={acceptTs}>
                      Y
                    </button>
                    <button onClick={cancelTs}>N</button>
                  </div>
                ) : (
                  <span
                    onClick={() => {
                      clickeds[i] = true
                      currs[i] = timestamps[i]
                      setClickeds(clickeds)
                      setCurrs(currs)
                    }}
                  >
                    {timestamps[i]}
                  </span>
                )}
              </span>
            </a>
          )
        })}
      </div>
      <a download="syncedAudio.json" href={download}>
        Export JSON File
      </a>
    </div>
  )
}

PreviewBox.propTypes = {
  timestamps: PropTypes.array,
  labels: PropTypes.array,
  currentTime: PropTypes.number,
  setTimestamps: PropTypes.func,
  audioPlayerRef: PropTypes.object,
}

SyncBox.propTypes = {
  text: PropTypes.string,
  delimiter: PropTypes.string,
  setIsSyncing: PropTypes.func,
  audioPlayerRef: PropTypes.object,
  setTimestamps: PropTypes.func,
  setLabels: PropTypes.func,
  offset: PropTypes.number,
  mode: PropTypes.string,
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
