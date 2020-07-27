import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Input from './ui/Input'
import { openLocalFile } from '../scripts/file-input'
import { handleFiles } from '../scripts/file-handlers'
import { setTitle, setAuthor } from '../store/slices/script'
import './Controls.css'

function Controls (props) {
  const title = useSelector((state) => state.script.title || '')
  const author = useSelector((state) => state.script.author || '')
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
          label="Title"
          value={title}
          onChange={(e) => dispatch(setTitle(e))}
        />
        <Input
          label="Author"
          value={author}
          onChange={(e) => dispatch(setAuthor(e))}
        />
      </div>
      <button className="button" onClick={handleClickOpenFileButton}>
        Add a file
      </button>
      <div className="file-status">
        {isUsersFileLoaded ? (
          <p className="file-status-good">user file loaded</p>
        ) : (
          <p>user file not loaded</p>
        )}
        {isTranscriptFileLoaded ? (
          <p className="file-status-good">transcript file loaded</p>
        ) : (
          <p>transcript file not loaded</p>
        )}
      </div>
    </div>
  )
}

export default Controls
