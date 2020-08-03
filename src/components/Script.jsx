import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { proofOfConceptScriptFormatting } from '../scripts/parse-chat'
import { storeFountainResult } from '../store/slices/script'
import './Script.css'

function Script (props) {
  const [size, setSize] = useState('large')
  const transcript = useSelector((state) => state.script.transcript)
  const title = useSelector((state) => state.script.title)
  const author = useSelector((state) => state.script.author)
  const source = useSelector((state) => state.script.source)
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  function handleWindowResize (event) {
    if (window.innerWidth < 1100) {
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
  const result = transcript ? proofOfConceptScriptFormatting(transcript, meta) : null
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