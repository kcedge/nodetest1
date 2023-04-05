const MongoClient = require( 'mongodb' ).MongoClient;
var dbConfig = require(global.appRoot + '/config/configDb');
var url = dbConfig.dbSettings().url;

var _db;

module.exports = {

  connectToServer: function(app, callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
       app.locals.db = client.db('krazyl3gzDb');
      _db  = client.db('krazyl3gzDb');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};