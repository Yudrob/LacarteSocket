'use strict'
var db = require('./mong.js')

var User = function () {

  return {
    getMarkers: function (pos, callback) {
      if (pos === null) throw 'Null pos given'
      let markers = []
      markers.push({
        lat: 0.000,
        lng: 0.000,
        name: 'The Royal Oak',
        type: 'Pub',
        typeCode: 2
      })
      callback(null, markers)
    }
  }
}

module.exports = new User()
