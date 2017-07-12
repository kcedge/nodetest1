var express = require('express');
var router = express.Router();
var fs = require('fs');
var passport = require('passport');

var http = require('http');
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

//var request = require('request');
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
if (runningProduction) {
    upload = multer({storage: multerS3({
	    s3: sampleBucket,
	    bucket: 'mphelper-samples-bucket',
	    acl: 'public-read',
	    contentDisposition: 'attachment',
	    metadata: function (req, file, cb) {
		console.log('metadata...');
		console.dir(file);
		cb(null, {fieldName: file.fieldname});
	    },
	    key: function (req, file, cb) {
		console.log('file and req');
		console.dir(file);
		console.dir(req);
		var name = file.originalname.replace(".wav","");
		var pack =req.body['packname'].replace("Pack","")
		//Date.now().toString().substring(7,9)
		cb(null, pack + "_"+ name +".wav");
	    }
	    
	})
    }).single('file');
}
else{
    upload = multer({dest: appRoot + '/public/resources/samples'}).single('file');
}

var uploadPackImage = "";
if (runningProduction) {
    // *** UPDATE THIS FOR PRODUCTION *** ///
    uploadPackImage = multer({storage: multerS3({
	    s3: sampleBucket,
	    bucket: 'mphelper-samples-bucket',
	    acl: 'public-read',
	    contentDisposition: 'attachment',
	    metadata: function (req, file, cb) {
		console.log('metadata...');
		console.dir(file);
		cb(null, {fieldName: file.fieldname});
	    },
	    key: function (req, file, cb) {
		console.log('file and req');
		console.dir(file);
		console.dir(req);
		var name = file.originalname.replace(".wav","");
		var pack =req.body['packname'].replace("Pack","")
		//Date.now().toString().substring(7,9)
		cb(null, pack + "_"+ name +".wav");
	    }
	    
	})
    }).single('file');
}
else{
    uploadPackImage = multer({dest: appRoot + '/public/resources/images'}).single('file');
}




module.exports = function (router, passport) {
 /* GET Hello World page. */
    router.post('/downloadSample',function(req ,res){
	console.log("downloading sample");
	console.log(req.body['url'])
	http.get(req.body['url'], function (response) {
	    if (response.statusCode == 200) {
		console.dir(response);
		res.pipe(response);
		// Continue with your processing here.
	    }
	    else{
		console.dir(response);
		res.send("fail");
	    }
	});
	res.send("getting img");
    });
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
	var packImageJson = req.body['packImageJson'];
	
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('packCollection');
		collection.createIndex( { "packname": 1 }, { unique: true } )
		collection.insert({packname: packname, sampleArrayJson: sampleArrayJson,packImageJson:packImageJson}, function (err, docsInserted) {
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
    
     router.put('/savePack',function(req,res){
	
	console.log("uploading pack");
	var packname = req.body['packname'];
	var packdesc = req.body['packdesc'];
	var id = req.body['id'];
	console.log("pack id:" + id);
	console.log("pack name:" + packname);
	console.log("pack desc:" + packdesc);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('packCollection');
		//collection.createIndex( { "packname": 1 }, { unique: true } )
		collection.update({_id:ObjectId(id)},{$set:{packname: packname,packdesc: packdesc}}, {upsert: false}, function (err, db) {
		    if (err) {
			console.log('Unable to edit pack', err);
			res.send('pack edit failed');
		    }
		    else {
			res.send('pack edit successful');
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
		    console.log("uploading sample..");
		    console.dir(req);
		    var collection = db.collection('sampleCollection');
		    collection.insert({fieldName: req.file.fieldname,
			originalName: req.file.originalname,
			encoding: req.file.encoding,
			mimetype: req.file.mimetype,
			destination: req.file.location,
			fileName: req.file.filename,
			path: req.file.path,
			fileSize: req.file.size,
			bpm: Number(req.body.bpm),
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
				res.send(docsInserted.ops[0]._id);
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
    router.post('/uploadPackImage', function (req, res) {
	uploadPackImage(req, res, function (err) {
	    if (err) {
		console.log(err);
		return res.end("Error uploading pack image.");
	    }
	    MongoClient.connect(url, function (err, db) {
		if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
		    //WE don't need DB Stuff, we savew that with pack
		    console.log("REQ:****");
		    console.log(req);
		    res.send(req.file.filename);
//		    //HURRAY!! We are connected. :)
//		    console.log('Connection established to', url);
//
//		    // do some work here with the database.
//		    // Get the documents collection
//		    console.log("uploading sample..");
//		    console.dir(req);
//		    var collection = db.collection('packCollection');
//		    collection.insert({},
//		    function (err, docsInserted) {
//			if (err) {
//			    console.log('Unable to add image to image collection', err);
//			    res.send('Image uploaded failed');
//			}
//			else {
//			   console.dir(req);
//			   
//			    //Production
//			   if(runningProduction){
//				res.send(docsInserted.ops[0]._id);
//			    }
//			    else{
//				 //Local
//				 res.send(docsInserted.ops[0]._id);
//			    }
//			   
//			   
//			    
//			}
//		    });

		}
	    });
	});
	
    });
    //EDIT A SAMPLE
     router.put('/sample',function(req,res){
	
	console.log("uploading pack");
	var sampleId = req.body['sampleId'];
	var bpm = req.body['bpm'];
	var key = req.body['key'];
	var tagJson = req.body['tagJson'];
	
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('sampleCollection');
		collection.update({_id:ObjectId(sampleId)},{$set:{bpm: bpm,key:key,tagJson:tagJson}}, {upsert: true}, function (err, db) {
		    if (err) {
			console.log('Unable to edit tip to tipsCollection', err);
			res.send(points);
		    }
		    else {
			res.send('Sample edit successfuly submitted');
		    }
		});
	    }
	});
    });
    
};