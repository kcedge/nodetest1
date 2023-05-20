const MongoClient = require( 'mongodb' ).MongoClient;
var dbConfig = require(global.appRoot + '/config/configDb');
var url = dbConfig.dbSettings().url;

var _db;

module.exports = {

  connectToServer: function(app, callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
        if(!err){
        app.locals.db = client.db('krazyl3gzDb');
        _db  = client.db('krazyl3gzDb');
        return callback( client );
       }
       else{
        console.log("CONNECTION FAILED");
        console.log(err);
        console.log("client:" + client)
        
        return callback(err);
       }
    } );
  },

  getDb: function() {
    return _db;
  }
};