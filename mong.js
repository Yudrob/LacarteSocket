var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID
var url = 'mongodb://localhost:27017/lacarte'
var dt = require('./devtools')

var Mong = function() {

  var findMarkers = function(db, range, callback) {
    console.log(range)
    db.collection('points').find({
      'lat': {
        '$gte': range.latMin,
        '$lte': range.latMax
      },
      'lng': {
        '$gte': range.lngMin,
        '$lte': range.lngMax
      }
    }).toArray((err, result) => {
      try {
        assert(null, err, 'Falha na busca dos dados')
      } catch (e) {
        callback(err)
      } finally {
        callback(null, result)
      }
    })
  }

  function insertMarker(db, marker, callback) {
    // Get the markers collection
    var collection = db.collection('points')
      // Insert the marker
    collection.insertOne(marker, (err, result) => {
      if (err) callback(err)
      else callback(null, result)
    })
  }

  return {
    getAllMarkers: function(callback) {
      MongoClient.connect(url, (err, db) => {
        try {
          assert.equal(null, err)
        } catch (e) {
          callback(e)
        } finally {
          findMarkers(db, undefined, (err, data) => {
            db.close()
            if (err) callback(err)
            else callback(null, data)
          })
        }
      })
    },
    getMarkersToPos: function(viewport, callback) {
      range = {
        latMin: viewport.lat - viewport.radius,
        latMax: viewport.lat + viewport.radius,
        lngMin: viewport.lng - viewport.radius,
        lngMax: viewport.lng + viewport.radius
      }
      MongoClient.connect(url, (err, db) => {
        try {
          assert.equal(null, err)
        } catch (e) {
          callback(e)
        } finally {
          findMarkers(db, range, (err, data) => {
            db.close()
            if (err) callback(err)
            else callback(null, data)
          })
        }
      })
    },
    addNewMarker: function(marker, callback) {
      MongoClient.connect(url, (err, db) => {
        try {
          assert.equal(null, err)
        } catch (e) {
          callback(e)
        } finally {
          insertMarker(db, marker, (err, data) => {
            db.close()
            if (err) callback(err)
            else callback(null, data)
          })
        }
      })
    }
  }
}

module.exports = new Mong()
