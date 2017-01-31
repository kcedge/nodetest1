var express = require('express');
var router = express.Router();
var fs = require('fs');
var passport = require('passport');


//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;

//DB CONFIG
var path = require('path');
var dbConfig = require(appRoot + '/config/configDb');
var runningProduction = dbConfig.dbSettings().runningProd;
var url = dbConfig.dbSettings().url;

// Connection URL. This is where your mongodb server is running.
//if(runningProduction){
//     url = 'mongodb://kcedge3:Golions91!@ec2-54-218-53-245.us-west-2.compute.amazonaws.com:27017/dummyDb';
//}
//else{
//     url = 'mongodb://localhost:27017/tipsDb';
//}

//var url = 'mongodb://localhost:27017/tipsDb';
//Production DB
//var url = 'mongodb://kcedge3:Golions91!@ec2-54-218-53-245.us-west-2.compute.amazonaws.com:27017/dummyDb'
//Local

//For storing images in the file system
var multer = require('multer');

//LOCAL
//var storage = multer.diskStorage({
//    destination: function (req, file, callback) {
//	callback(null, '../public/resources/images');
//    },
//    filename: function (req, file, callback) {
//	callback(null, file.fieldname + '-' + Date.now());
//    },
//    onError: function (err, next) {
//	console.log('error', err);
//	next(err);
//    }
//});
//var upload = multer({storage:storage}).single('file');
//PRODUCTION
var AWS = require('aws-sdk');
var multerS3 = require('multer-s3');
AWS.config.loadFromPath('./aws-config.json');
// assume you already have the S3 Bucket created, and it is called ierg4210-shopxx-photos
var sampleBucket = new AWS.S3({params: {Bucket: 'mphelper-samples-bucket'}});
console.log("Samples Bucket is")
console.log(sampleBucket);
var upload = "";
if(runningProduction){
     upload = multer({ storage : multerS3({
	s3: sampleBucket,
	bucket: 'tip-samples-bucket',
	acl: 'public-read',
	metadata: function (req, file, cb) {
	  cb(null, {fieldName: file.fieldname});
	},
	key: function (req, file, cb) {
	  cb(null, Date.now().toString())
	}
      })
    }).single('file');
}
else{
    upload = multer({dest: appRoot + '/public/resources/samples'}).single('file');
}


module.exports = function (router, passport) {
 /* GET Hello World page. */
  
    router.get('/sampleLib', function (req, res) {
	console.log('getting sample lib YES');
	// Use connect method to connect to the Server
	console.log(__dirname+'/sampleLib.jade');
	//res.send("OOK");
	res.render('sampleLib');
    });
    router.get('/samples', function (req, res) {
	console.log('getting samples');
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var cursorArray = db.collection('sampleCollection').find().toArray(function (err, items) {
		    if (err) {
			res.status(500).send('error retreiving data')
		    }
		    console.log("items");
		    res.send(items);
		});
	    }
	});
    });
    router.get('/packs', function (req, res) {
	console.log('getting packs');
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var cursorArray = db.collection('packCollection').find().toArray(function (err, items) {
		    if (err) {
			res.status(500).send('error retreiving data')
		    }
		    console.log("items");
		    res.send(items);
		});
	    }
	});
    });
    router.post('/uploadPack',function(req,res){
	
	console.log("uploading pack");
	var packname = req.body['packname'];
	var sampleArrayJson = req.body['sampleArrayJson'];
	
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('packCollection');
		collection.insert({packname: packname, sampleArrayJson: sampleArrayJson}, function (err, docsInserted) {
		    if (err) {

			console.log('Unable to add tip to packCollection', err);
			res.send('pack upload failed');
		    }
		    else {
			console.log(docsInserted.ops[0]._id);
			res.send(docsInserted.ops[0]);
		    }
		});
	    }
	});
    });
    router.post('/uploadSample', function (req, res) {
	upload(req, res, function (err) {
	    if (err) {
		console.log(err);
		return res.end("Error uploading sample.");
	    }
	    MongoClient.connect(url, function (err, db) {
		console.log("BPM " + req.body.bpm);
		if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
		    //HURRAY!! We are connected. :)
		    console.log('Connection established to', url);

		    // do some work here with the database.
		    // Get the documents collection
		    var collection = db.collection('sampleCollection');
		    collection.insert({fieldName: req.file.fieldname,
			originalName: req.file.originalname,
			encoding: req.file.encoding,
			mimetype: req.file.mimetype,
			destination: req.file.destination,
			fileName: req.file.filename,
			path: req.file.path,
			fileSize: req.file.size,
			bpm: req.body.bpm,
			key: req.body.key,
			points:req.body.points,
			tagJson:req.body.tagJson,
			type:req.body.type,
			packname:req.body.packname,
		    },
		    function (err, docsInserted) {
			if (err) {
			    console.log('Unable to add image to image collection', err);
			    res.send('Image uploaded failed');
			}
			else {
			   console.dir(req);
			   
			    //Production
			   if(runningProduction){
				res.send(req.file.location);
			    }
			    else{
				 //Local
				 res.send(docsInserted.ops[0]._id);
			    }
			   
			   
			    
			}
		    });

		}
	    });
	});
	

    });
    
};