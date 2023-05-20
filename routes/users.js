var express = require('express');
var assert = require('assert');
var router = express.Router();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
//var url = 'mongodb://localhost:27017/tipsDb';
//DB CONFIG
var path = require('path');
var dbConfig = require(appRoot + '/config/configDb');
var runningProduction = dbConfig.dbSettings().runningProd;
var url = dbConfig.dbSettings().url;

//Local
//var url = 'mongodb://localhost:27017/tipsDb'
/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/signUpTips', function (req, res, next) {
	console.log(req);
	console.log("signUpTips");
	var userEmail = req.body['userEmail'];
	var userPassword = req.body['userPassword'];
	var rolesArray = { roles: [{ role: "readAnyDatabase", db: "admin" }] };

	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			//HURRAY!! We are connected. :)
			console.log('Connection established to', url);
			console.log(db);
			// do some work here with the database.
			// Get the documents collection


			assert.equal(null, err);
			db.addUser(userEmail, userPassword, rolesArray, function (err, result) {
				assert.equal(null, err);
				db.close();
				res.send('Success');
			});


		}
		db.close();
	});
});





module.exports = router;
