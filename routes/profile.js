/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var assert = require('assert');
var router = express.Router();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var ObjectId = require('mongodb').ObjectID;
// Connection URL. This is where your mongodb server is running.
//var url = 'mongodb://localhost:27017/tipsDb';
//DB CONFIG
var path = require('path');
var dbConfig = require(appRoot + '/config/configDb');
var runningProduction = dbConfig.dbSettings().runningProd;
var url = dbConfig.dbSettings().url;

module.exports = function (router, passport) {
    
    router.get('/getProfileInfo/:username', function (req, res, next) {
	var username = req.params.username;
	console.log('Getting the profile info for')
	console.log(username);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('profileCollection');
		if (collection.find({username: username})) {
		    var cursorArray = collection.find({userName: username}).toArray(function (err, items) {
			if (err) {
			    res.status(500).send('error retreiving data');
			}
			//console.log('ITEMS');
			//console.log(items);
			res.send(items);
		    });
		}
		else{
		    res.send("No profile data found");
		}
	    }
	});
    });
   
    
     //Get tips for a profile 
     router.get('/getTips/:username', function (req, res, next) {
	var username = req.params.username;
	console.log('Getting the Tips for ');
	console.log(username);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		//if (collection.find({submittedBy: username})) {
		    var cursorArray = collection.find({submittedBy: username}).toArray(function (err, items) {
			if (err) {
			    res.status(500).send('error retreiving data');
			}
			//console.log('ITEMS');
			//console.log(items);
			res.send(items);
		    });
		//}
		//else{
		 //   res.send("No tips found");
		//}
	    }
	});
    });
    
    router.post('/getTipsByArray',function(req,res){
	console.log(req);
	var tipIdArray = req.body['tipArray'];
	console.log('gettingTipsByJsonArrayDB');
	console.log('HERE');
	console.log(tipIdArray);
	
	var myObject = JSON.parse(tipIdArray);
	var myArray = [];
	for (var i in tipIdArray) {
	    myArray.push(ObjectId(myObject[i]));
	}
	
	console.log('new array:')
	console.log(myArray);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		if (collection.find({'_id': {$in:myArray}})) {
		    var cursorArray = collection.find({'_id': {$in:myArray}}).toArray(function (err, items) {
			if (err) {
			    console.log('error 500');
			    res.status(500).send('error retreiving data');
			}
			console.log('ITEMS');
			console.log(items);
			res.send(items);
		    });
		}
		else{
		    res.send("No tips found");
		}
	    }
	});
    });
};