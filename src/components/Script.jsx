import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Script.css'

function Script (props) {
  const [size, setSize] = useState('large')
  const dpi = size === 'large' ? 'dpi100' : 'dpi72'
  const fountain = useSelector((state) => state.script.fountain)

  useEffect(() => {
    // Run once to set the correct size on mount
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  })

  function handleWindowResize (event) {
    if (window.innerWidth < 1200) {
      setSize('small')
    } else {
      setSize('large')
    }
  }

  return (
    <div id="script" className={`us-letter ${dpi}`}>
      {(fountain?.html?.title_page) ? (
        <div
          className="page title-page"
          dangerouslySetInnerHTML={{ __html: fountain.html.title_page }}
        />
      ) : null}
      <div
        className="page"
        dangerouslySetInnerHTML={{
          __html: (fountain?.html?.script) || ''
        }}
      />
    </div>
  )
}

export default Script
