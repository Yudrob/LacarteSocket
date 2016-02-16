'use strict'
var user = require('./user.js')

var server = new require('ws').Server({
  port: 8080,
  verifyClient: verifyClient
})

server.on('connection', function connection(ws) {

  ws.on('message', onMessage)

  try {
    ws.send('something')
  } catch (e) {
    console.log(e)
  }
})

server.on('error', function (e) {
  console.log(e)
})

function verifyClient(info, callback) {
  callback(true) // Allow connection
}

function onMessage(message) {
  let msg
  try {
    msg = JSON.parse(message)
  } catch (e) {
    ws.close()
    console.log(e)
  }
  if (typeof msg !== 'object') {
    ws.close()
    console.log('expected object, given ', typeof msg)
  }
  eval('user.'+msg.action)('pos', function (err, markers) {
    console.log(JSON.stringify(markers))
  })

}
