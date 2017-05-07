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
    router.post('/getRecentTips',function(req,res){
	console.log(req);
	//var tipIdArray = req.body['tipArray'];
	console.log('getting Recent Tips');

	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		if (true) {
		    var cursorArray = collection.find().sort( { dateSubmitted: -1 } ).toArray(function (err, items) {
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
    router.get('/getTopUsers/:period',function(req,res){
	console.log(req);
	var period = req.params.period;
	if(period == 'MONTH'){
	    
	}
	//var tipIdArray = req.body['tipArray'];
	console.log('getting Top Users');

	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('profileCollection');
		if (true) {//period=='ALL TIME'
		    var cursorArray = collection.find().sort( { totalpoints: -1 } ).toArray(function (err, items) {
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
		    res.send("No profiless found");
		}
	    }
	});
    });
    router.post('/postProfileMetaData/:username',function(req,res){
	var username = req.params.username;
	console.log(req);
	var profileMetaDataJson = req.body['profileMetaDataJson'];

	//var tipIdArray = req.body['tipArray'];
	console.log('posting profileImageJson Data' + profileMetaDataJson);
	
	console.log('username:' + username);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('profileCollection');
		if (true) {
		    collection.update({userName: username},  {$set:{profileMetaDataJson:profileMetaDataJson}}, function (err, db) {
			if (err) {
			    console.log('Unable to edit profile', err);
			    res.send('profileMetaDataJson save failed');
			}
			else {
			    res.send('profileMetaDataJson edit successful');
			}
		    })
		}
		else{
		    res.send("No profileImageJson found");
		}
	    }
	});
    });
    
     router.post('/postProfilePoints/:username',function(req,res){
	var username = req.params.username;
	console.log(req);
	var totalpoints = req.body['totalpoints'];

	//var tipIdArray = req.body['tipArray'];
	console.log('posting totalpoints Data' + totalpoints);
	
	console.log('username:' + username);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('profileCollection');
		if (true) {
		    collection.update({userName: username},  {$set:{totalpoints:totalpoints}}, function (err, db) {
			if (err) {
			    console.log('Unable to edit profile', err);
			    res.send('totalpoints  save failed');
			}
			else {
			    res.send('totalpoints Profile edit successful');
			}
		    })
		}
		else{
		    res.send("No totalpoints found");
		}
	    }
	});
    });
    router.post('/postProfileImage/:username',function(req,res){
	var username = req.params.username;
	console.log(req);
	var profileImageJson = req.body['profileImageJson'];

	//var tipIdArray = req.body['tipArray'];
	console.log('posting profileImageJson Data' + profileImageJson);
	
	console.log('username:' + username);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('profileCollection');
		if (true) {
		    collection.update({userName: username},  {$set:{profileImageJson:profileImageJson}}, function (err, db) {
			if (err) {
			    console.log('Unable to edit profile', err);
			    res.send('profileImageJson image save failed');
			}
			else {
			    res.send('Profile edit successful');
			}
		    })
		}
		else{
		    res.send("No profileImageJson found");
		}
	    }
	});
    });
    router.post('/postBannerImage/:username',function(req,res){
	var username = req.params.username;
	console.log(req);
	var bannerImageJson = req.body['bannerImageJson'];

	//var tipIdArray = req.body['tipArray'];
	console.log('posting Banner Data' + bannerImageJson);
	
	console.log('username:' + username);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('profileCollection');
		if (true) {
		    collection.update({userName: username},  {$set:{bannerImageJson:bannerImageJson}}, function (err, db) {
			if (err) {
			    console.log('Unable to edit profile', err);
			    res.send('Banner image save failed');
			}
			else {
			    res.send('Profile edit successful');
			}
		    })
		}
		else{
		    res.send("No banner image found");
		}
	    }
	});
    });
    router.post('/getTopTips',function(req,res){
	console.log(req);
	//var tipIdArray = req.body['tipArray'];
	console.log('getting Top Tips');

	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		if (true) {
		    var cursorArray = collection.find().sort( { tipPoints: -1 } ).toArray(function (err, items) {
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