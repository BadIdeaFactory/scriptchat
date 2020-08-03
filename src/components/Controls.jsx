import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Input from './ui/Input'
import { openLocalFile } from '../scripts/file-input'
import { handleFiles } from '../scripts/file-handlers'
import { setTitle, setAuthor, setSource } from '../store/slices/script'
import checkmarkIcon from './2714.svg'
import crossIcon from './274C.svg'
import './Controls.css'

function Controls (props) {
  const title = useSelector((state) => state.script.title || '')
  const author = useSelector((state) => state.script.author || '')
  const source = useSelector((state) => state.script.source || '')
  const isUsersFileLoaded = useSelector((state) =>
    Boolean(Object.keys(state.characters.characters).length)
  )
  const isTranscriptFileLoaded = useSelector((state) =>
    Boolean(state.script.transcript)
  )
  const dispatch = useDispatch()

  function handleClickOpenFileButton (event) {
    openLocalFile().then((event) => {
      handleFiles(event.target.files)
    })
  }

  return (
    <div className="controls">
      <h1>Scriptchat</h1>
      <div className="properties">
        <Input
          label="Screenplay title"
          value={title}
          onChange={(e) => dispatch(setTitle(e))}
        />
        <Input
          label="Author’s name"
          value={author}
          onChange={(e) => dispatch(setAuthor(e))}
        />
        <Input
          label="Slack organization"
          value={source}
          onChange={(e) => dispatch(setSource(e))}
        />
      </div>
      <button className="button" onClick={handleClickOpenFileButton}>
        Add a file
      </button>
      <div className="file-status">
        {isUsersFileLoaded ? (
          <p className="file-status-good">
            <img src={checkmarkIcon} alt="" />
            User file loaded.
          </p>
        ) : (
          <p className="file-status-bad">
            <img src={crossIcon} alt="" />
            User file not loaded.
          </p>
        )}
        {isTranscriptFileLoaded ? (
          <p className="file-status-good">
            <img src={checkmarkIcon} alt="" />
            Transcript file loaded.
          </p>
        ) : (
          <p className="file-status-bad">
            <img src={crossIcon} alt="" />
            Transcript file not loaded.
          </p>
        )}
      </div>
    </div>
  )
}

export default Controls
