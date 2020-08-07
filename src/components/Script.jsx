import React from 'react'
import { useSelector } from 'react-redux'
import './Script.css'

function Script (props) {
  const fountain = useSelector((state) => state.script.fountain)

  return (
    <div id="script" className="us-letter">
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
