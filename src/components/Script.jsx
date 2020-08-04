import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import seedrandom from 'seedrandom'
import { proofOfConceptScriptFormatting } from '../scripts/parse-chat'
import { storeFountainResult } from '../store/slices/script'
import './Script.css'

function Script (props) {
  const [size, setSize] = useState('large')
  const transcript = useSelector((state) => state.script.transcript)
  const title = useSelector((state) => state.script.title)
  const author = useSelector((state) => state.script.author)
  const source = useSelector((state) => state.script.source)
  const hash = useSelector((state) => state.script.hash)
  // Get character state to force update if user file is uploaded after transcript
  const characters = useSelector((state) => state.characters.characters)
  const dispatch = useDispatch()

  useEffect(() => {
    // Run once to set the correct size on mount
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  function handleWindowResize (event) {
    if (window.innerWidth <= 1200) {
      setSize('small')
    } else {
      setSize('large')
    }
  }

  function getTitlePage (fountain) {
    if (fountain && fountain.html && fountain.html.title_page) {
      return (
        <div
          className="page title-page"
          dangerouslySetInnerHTML={{ __html: fountain.html.title_page }}
        />
      )
    } else {
      return null
    }
  }

  const dpi = size === 'large' ? 'dpi100' : 'dpi72'

  const meta = {
    title,
    author,
    source
  }
  const seedGenerator = seedrandom(hash)
  const result = transcript ? proofOfConceptScriptFormatting(transcript, meta, seedGenerator) : null
  const titlePage = getTitlePage(result)
  if (result) {
    dispatch(storeFountainResult(result))
  }

  return (
    <div id="script" className={`us-letter ${dpi}`}>
      {titlePage}
      <div
        className="page"
        dangerouslySetInnerHTML={{
          __html: (result && result.html && result.html.script) || ''
        }}
      />
    </div>
  )
}

export default Script
