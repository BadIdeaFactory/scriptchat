import React from 'react'
import io from 'socket.io-client'
import './Chat.css'

const STORAGE_NAME = 'scriptchat-name'

class Chat extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      username: window.localStorage.getItem(STORAGE_NAME) || '',
      message: '',
      messages: []
    }
    
    this.socket = io('localhost:8080')
    this.socket.on('RECEIVE_MESSAGE', (data) => {
      this.addMessage(data)
    })
    
    this.sendMessage = this.sendMessage.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)

    window.onbeforeunload = () => {
      window.localStorage.setItem(STORAGE_NAME, this.state.username)
    }
  }

  componentDidMount () {
    this.textInput.focus()
  }
  
  sendMessage (event) {
    event.preventDefault()

    this.socket.emit('SEND_MESSAGE', {
      author: this.state.username,
      message: this.state.message
    })

    this.setState({ message: '' })
  }

  addMessage (data) {
    this.setState({
      messages: [...this.state.messages, data]
    })
  }

  onKeyDown (event) {
    if (event.keyCode === 13) {
      this.sendMessage(event)
    }
  }

  render () {
    return (
      <div className="container">
        <div className="script-area">
          <div className="messages">
            {this.state.messages.map((message, i) => {
              return (
                <div key={i}>
                  <div className="message-cue">{message.author}</div>
                  <div className="message-text">{message.message}</div>
                  <br />
                </div>
              )
            })}
          </div>
        </div>
        <div className="type-area">
          <input
            type="text"
            placeholder="Username"
            className="input-name form-control"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
          />
          <input
            type="text"
            placeholder="Message"
            className="input-text form-control"
            value={this.state.message}
            onChange={event => this.setState({ message: event.target.value })}
            onKeyDown={this.onKeyDown}
            ref={ref => { this.textInput = ref }}
          />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    )
  }
}

export default Chat
