import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Script.css'

function Script (props) {
  const [size, setSize] = useState('large')
  const fountain = useSelector((state) => state.script.fountain)

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

  function getTitlePage () {
    if (fountain && fountain.html && fountain.html.title_page) {
      return (
        <div className="page title-page" dangerouslySetInnerHTML={{ __html: fountain.html.title_page }} />
      )
    } else {
      return null
    }
  }

  const titlePage = getTitlePage()
  const dpi = (size === 'large') ? 'dpi100' : 'dpi72'

  return (
    <div id="script" className={`us-letter ${dpi}`}>
      {titlePage}
      <div className="page" dangerouslySetInnerHTML={{ __html: (fountain && fountain.html && fountain.html.script) || '' }} />
    </div>
  )
}

export default Script
