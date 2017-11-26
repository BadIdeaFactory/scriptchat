import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'

export default class Input extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: '',
    onChange: () => {} // no-op
  }

  constructor (props) {
    super(props)

    this.id = this.props.label.toLowerCase().replace(' ', '_') + '-' + Date.now()

    this.state = {
      value: this.props.value
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  onChange = (event) => {
    const value = event.target.value

    this.setState({ value })
    this.props.onChange(value)
  }

  render () {
    return (
      <div>
        <input
          type="text"
          className="input-with-label"
          required
          autoComplete="off"
          name={this.props.label}
          value={this.state.value}
          onChange={this.onChange}
          id={this.id}
        />
        <label htmlFor={this.id}><span>{this.props.label}</span></label>
      </div>
    )
  }
}
