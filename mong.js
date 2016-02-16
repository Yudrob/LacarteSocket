var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID
var url = 'mongodb://localhost:27017/lacarte'

var Mong = function () {

  var findMarkers = function(db, callback) {
   var cursor = db.collection('points').find();
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   })
  }

  return {
    getMarkersToPos: function (pos, callback) {
      MongoClient.connect(url, (err, db) => {
        try {
          assert.equal(null, err)
        } catch (e) {
          callback(e)
        } finally {
          findMarkers(db, (data) => {
              db.close()

              callback(null,)
          })
        }
      })
    },
    insMark: function () {

    }
  }
}

module.exports = new Mong()
