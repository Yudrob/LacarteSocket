'use strict'
var db = require('./mong.js')

var User = function () {

  return {
    getMarkers: function (viewport, callback) {
      if (viewport === null) throw 'Null viewport given'
      db.getMarkersToPos(viewport, function (err, markers) {
        if (err) callback(err)
        else callback(null, markers)
      })
    },
    insertMarker: function (marker, callback) {
      db.addNewMarker(marker, (err, result) => {
        console.log(err)
        console.log(result)
      })
    },
    getAllMarkers: function (callback) {
      db.getAllMarkers((err, result) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
      })
    }
  }
}

module.exports = new User()
