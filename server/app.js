var express = require('express')
var socket = require('socket.io')

var app = express()
var server = app.listen(8080, function () {
  console.log('server is running on port ' + server.address().port)
})

var io = socket(server)
io.on('connection', (socket) => {
  socket.on('SEND_MESSAGE', function (data) {
    data.message = processMessage(data.message)

    io.emit('RECEIVE_MESSAGE', data)
  })
})

function processMessage (message) {
  message = message.charAt(0).toUpperCase() + message.substr(1)

  // todo: add punctuation (period) at end of sentence if it needs it

  return message
}
