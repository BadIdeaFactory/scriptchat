import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Script.css'

class Script extends React.Component {
  static propTypes = {
    fountain: PropTypes.object
  }

  getTitlePage () {
    const fountain = this.props.fountain

    if (fountain && fountain.html && fountain.html.title_page) {
      return (
        <div className="page title-page" dangerouslySetInnerHTML={{ __html: fountain.html.title_page }} />
      )
    } else {
      return null
    }
  }

  render () {
    const fountain = this.props.fountain
    const titlePage = this.getTitlePage()

    return (
      <div id="script" className="us-letter dpi72">
        {titlePage}
        <div className="page" dangerouslySetInnerHTML={{ __html: fountain && fountain.html && fountain.html.script || '' }} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    fountain: state.script.fountain
  }
}

export default connect(mapStateToProps)(Script)
