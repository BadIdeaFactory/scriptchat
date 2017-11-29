import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Script.css'

class Script extends React.Component {
  static propTypes = {
    fountain: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      size: 'large'
    }
  }

  // todo: shouldcomponentupdate should check this.state.size

  componentDidMount () {
    window.addEventListener('resize', (event) => {
      if (window.innerWidth < 1100) {
        this.setState({ size: 'small' })
      } else {
        this.setState({ size: 'large' })
      }
    })
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
    const size = (this.state.size === 'large') ? 'dpi100' : 'dpi72'

    return (
      <div id="script" className={`us-letter ${size}`}>
        {titlePage}
        <div className="page" dangerouslySetInnerHTML={{ __html: (fountain && fountain.html && fountain.html.script) || '' }} />
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
