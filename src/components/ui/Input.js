import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}

function Input ({ label, value = '', onChange = () => {} }) {
  // an ID is required so that labels can attach to inputs
  const id = label.toLowerCase().replace(' ', '_') + '-' + Date.now()

  function handleChange (event) {
    const value = event.target.value
    onChange(value)
  }

  return (
    <div>
      <input
        type="text"
        className="input-with-label"
        required
        autoComplete="off"
        name={label}
        value={value}
        onChange={handleChange}
        id={id}
      />
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
    </div>
  )
}

export default Input
