'use strict'
var user = require('./user.js')
var websocket = require('ws')

var Server = (function () {
  /**
   * Host and port to server
   * @type {String}
   * @type {Number}
   */
  const _HOST = ''
  const _PORT = 8080
  /**
   * WebSocket Server class instance.
   * EventEmitter
   * @type {Object}
   */
  var _server = null

  /**
   * Verify client information to allow or deny connection
   * @param  {Object}   info      Information about client request
   * @param  {Function} callback  With 3 arguments:
   *                              {Boolean} result, Acept or not the handshake
   *                              {Number} code, If result is false this field determines the HTTP error status to be sent
   *                              {String} name, Reason to be send if result is false
   */
  function verifyClient(info, callback) {
    callback(true) // Allow connection
  }

  /**
   * Called when client connect
   * @param  {Object} ws WebSocket connection Class
   */
  function onClientConnection(ws) {
    ws.on('message', function (message) {
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

      try {
        eval('user.'+msg.action)({
          lat: msg.lat,
          lng: msg.lng,
          radius: msg.radius
        }, (err, markers) => {
          let response = {
            'action': 'newMarkers',
            'viewport': {'lat': msg.lat, 'lng': msg.lng},
            'markers': markers
          }
          try {
            ws.send(JSON.stringify(response))
          } catch (e) {
            console.log(e)
          }
        })
      } catch (e) {
        ws.close()
        console.log(e)
      }
    })
  }

  return {
    /**
     * Start server and set EventEmitters functions
     */
    start: function () {

      server = new websocket.Server({
        port: _PORT,
        verifyClient: verifyClient  // Function to allow connection
      })

      server.on('connection', onClientConnection) // Function to handle connection

      server.on('error', function (e) {
        console.log(e)
      })
    }
  }
})()

Server.start()
