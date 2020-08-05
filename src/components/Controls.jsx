import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Input from './ui/Input'
import { openLocalFile } from '../scripts/file-input'
import { handleFiles } from '../scripts/file-handlers'
import { downloadTextFile } from '../scripts/file-download'
import { buildFountainTextFormat } from '../scripts/output-fountain'
import { clearCharacterData } from '../store/slices/characters'
import { setTitle, setAuthor, setSource, clearScriptData } from '../store/slices/script'
import checkmarkIcon from './2714.svg'
import crossIcon from './274C.svg'
import './Controls.css'

function Controls (props) {
  const title = useSelector((state) => state.script.title || '')
  const author = useSelector((state) => state.script.author || '')
  const source = useSelector((state) => state.script.source || '')
  const tokens = useSelector((state) => state.script.fountain?.tokens || [])
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

  function handleClearData (event) {
    if (window.confirm('Are you sure you want to clear all data?')) {
      dispatch(clearCharacterData())
      dispatch(clearScriptData())
    }
  }

  function handleExportScript (event) {
    const text = buildFountainTextFormat(tokens)
    const filename = title.replace(/\s+/g, '_').toLowerCase() + '.fountain'
    downloadTextFile(filename, text)
  }

  return (
    <div className="controls">
      <h1>Scriptchat</h1>
      <p className="lede">
        Scriptchat turns your Slack transcripts into screenplays.
        This project is open source! For more information, check out our <a href="https://github.com/badideafactory/scriptchat">GitHub repository</a>.
      </p>
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
      <p>
        <button className="button" onClick={handleClickOpenFileButton}>
          Upload a file
        </button>
      </p>
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
      <p>
        <button className="button button-secondary" onClick={handleClearData}>
          Clear data
        </button>
      </p>
      <p>
        <button className="button button-secondary" onClick={handleExportScript}>
          Export to Fountain
        </button>
      </p>
    </div>
  )
}

export default Controls
