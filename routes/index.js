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
var photoBucket = new AWS.S3({params: {Bucket: 'tip-photos-bucket'}});
var sampleBucket = new AWS.S3({params: {Bucket: 'tip-samples-bucket'}});

console.log("Photo Bucket is")
console.log(photoBucket);
var upload = "";
if (runningProduction) {
    upload = multer({storage: multerS3({
	    s3: photoBucket,
	    bucket: 'tip-photos-bucket',
	    acl: 'public-read',
	    metadata: function (req, file, cb) {
		cb(null, {fieldName: file.fieldname});
	    },
	    key: function (req, file, cb) {
		cb(null, Date.now().toString())
	    }
	})
    }).single('file');
     uploadSample = multer({storage: multerS3({
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
else {
    upload = multer({dest: appRoot + '/public/resources/images'}).single('file');
    uploadSample = multer({dest: appRoot + '/public/resources/samples'}).single('file');
}

//var tipAudioSampleUpload = "";
//if (runningProduction) {
//    tipAudioSampleUpload = multer({storage: multerS3({
//	    s3: photoBucket,
//	    bucket: 'tip-audio-sample-bucket',
//	    acl: 'public-read',
//	    metadata: function (req, file, cb) {
//		cb(null, {fieldName: file.fieldname});
//	    },
//	    key: function (req, file, cb) {
//		cb(null, Date.now().toString())
//	    }
//	})
//    }).single('file');
//}
//else {
//    tipAudioSampleUpload = multer({dest: appRoot + '/public/resources/tipAudioSamples'}).single('file');
//}



module.exports = function (router, passport) {



    router.get('/authenticated', function (req, res) {
	// If this function gets called, authentication was successful.
	// `req.user` contains the authenticated user.
	console.log("checking authentication")
	if (req.user) {
	    res.send(req.user.local.username);
	}
	else {
	    res.send(false);
	}

    }
    );
    /* GET home page. */
    router.get('/', function (req, res, next) {
	res.render('index', {title: ''});
    });
    router.get('/index', function (req, res, next) {
	res.render('index', {title: ''});
    });
    /* GET About page. */
    router.get('/about', function (req, res) {
	res.render('about', {title: 'About Music Production Helper'});
    });
    /* GET Samples page. */
    router.get('/samplesPage', function (req, res) {
	res.render('samplesPage', {title: 'Free Samples!'});
    });
    router.get('/signIn', function (req, res) {
	console.log(req);
	res.render('signIn', {title: 'Sign In',
	    messages: req.flash('loginMessage')});
    });
    router.get('/signIn/:redirect', function (req, res) {
	var redirect = req.params.redirect;
	res.render('signIn', {title: 'Sign In',
	    message: req.flash('signupMessage'),
	    redirect: redirect});
    });
    /* GET Comments Template. */
    router.get('/comments-list', function (req, res) {
	console.log('loading comment templates');
	res.render('comments-list', {title: 'comment template'});
    });
    /* GET Samples Template. */
    router.get('/samples-list', function (req, res) {
	console.log('loading samples template');
	res.render('samples-list', {title: 'sample template'});
    });
    router.get('/packs-list', function (req, res) {
	console.log('loading packs template');
	res.render('packs-list', {title: 'pack template'});
    });
    // process the login form
    router.post('/signIn', passport.authenticate('local-login', {
	// redirect to the secure profile section
	failureRedirect: '/signIn', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
    }), function (req, res) {
	console.log("Sign in success redirecting to " + req.body['redirect']);
	res.redirect('/' + req.body['redirect']);
    });

    router.get('/signUp', function (req, res) {
	res.render('signUp', {title: 'Sign Up',
	    message: req.flash('signupMessage'),
	    redirect: "profile"});
    });
    router.get('/signUp/:redirect', function (req, res) {
	var redirect = req.params.redirect;
	res.render('signUp', {title: 'Sign Up',
	    message: req.flash('signupMessage'),
	    redirect: redirect});
    });

//process the signup form
    router.post('/signUp', passport.authenticate('local-signup', {// redirect to the secure profile section
	failureRedirect: '/signUp', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
    }), function (req, res) {
	console.log("Sign up success redirecting to " + req.body['redirect']);
	res.redirect('/' + req.body['redirect']);
    });

    router.get('/profile', isLoggedIn, function (req, res) {
	res.render('profile', {username: req.user.local.username,
	    localuser: req.user,
	    greeting: "Welcome "});
    });

    router.get('/profile/:username', function (req, res) {
	console.log('getting profile for ')
	var userName = req.params.username;
	console.log(userName);
	res.render('profile', {username: userName,
	    localuser: req.user});
    });

    router.get('/soundCloudAuth', passport.authenticate('soundcloud-token', {
	successRedirect: '/profile', // redirect to the secure profile section
	failureRedirect: '/signUp', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
    }));
    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function (req, res) {
	console.log(req);
	console.log("Logging out user")
	req.logout();
	res.redirect('/signIn');
    });

    /* GET Hello World page. */
    router.get('/tipLib', function (req, res) {
	// Use connect method to connect to the Server
	var cursor;
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		cursor = collection.find();
		db.close()
	    }
	    db.close();
	});
	res.render('tipLib', {title: 'Tip Library', dbCursor: cursor});
    });
    /* GET Hello World page. */
    router.get('/tipLib/:id', function (req, res) {
	var id = req.params.id;
	console.log("loading tip " + id);
	// Use connect method to connect to the Server
	var cursor;
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		cursor = collection.find({_id: ObjectId(id)}).toArray(function (err, item) {
		    if (err) {
			console.log('Unable to get tip', err);
		    }
		    else {
			res.render('tipLib', {title: 'Tip Library with Id', item: item, id: id});

		    }
		    db.close();
		});
	    }
	    db.close();
	});

    });
    router.get('/tipsPageGet', function (req, res) {


	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
		res.status(500).send("unable to connect to mongo server");
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		//var TipsCollection = db.collection('tipsCollection');

		var itemsTest;
		var cursorArray = db.collection('tipsCollection').find().toArray(function (err, items) {
		    if (err) {
			res.status(500).send('error retreiving data')
		    }
		    console.log("items");
		    res.send(items);

		});

	    }
	    db.close();
	});

    });

    router.post('/tipsPagePost', function (req, res) {

	console.log("tipsPagePost");
	var tipTitle = req.body['tipTitle'];
	var tipDescJson = req.body['tipDescJson'];
	var genreJson = req.body['genreJson'];
	var tipTypeJson = req.body['tipTypeJson'];
	var vstJson = req.body['vstJson'];
	var dawJson = req.body['dawJson'];
	var imageDataJson = req.body['imageDataJson'];
	var audioSampleObjectJson = req.body['audioSampleObjectJson'];
	var videoLinkJson = req.body['videoLinkJson'];
	var filtersJson = req.body['filtersJson'];
	var submittedBy = req.body['submittedBy'];
	var points = req.body['points'];
	var dateSubmitted = req.body['dateSubmitted'];

	console.log(tipDescJson);
	console.log(genreJson);
	console.log(tipTypeJson);
	console.log(vstJson);
	console.log(dawJson);
	console.log(imageDataJson);
	console.log(videoLinkJson);
	console.log(submittedBy);
	console.log(points);

	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		collection.insert({tipTitle: tipTitle, tipDescJson: tipDescJson, genreJson: genreJson, tipTypeJson: tipTypeJson, vstJson: vstJson, dawJson: dawJson, imageDataJson: imageDataJson,audioSampleObjectJson:audioSampleObjectJson, videoLinkJson: videoLinkJson, filtersJson: filtersJson, submittedBy: submittedBy, tipPoints: points, dateSubmitted: dateSubmitted}, function (err, docsInserted) {
		    if (err) {

			console.log('Unable to add tip to tipsCollection', err);
			res.send('Tip upload failed');
		    }
		    else {
			console.log(docsInserted.ops[0]._id);
			res.send(docsInserted.ops[0]);
		    }
		});

	    }
	    db.close();
	});

    });
    router.post("/profileInfoPostGet/:username", function (req, res) {
	console.log('profileInfoGetHere');
	var userName = req.params.username;
	var userNameTest = req.body['username'];
	console.log(userName);
	console.log(userNameTest);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
		res.status(500).send("unable to connect to mongo server");
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		console.log("Profile Data Includes");
		console.log(db.collection('profileCollection').find({userName: userName}));
		db.collection('profileCollection').find({userName: userName}).toArray(function (err, items) {
		    if (err) {
			res.status(500).send('error retreiving data');
		    }
		    console.log(items);
		    res.send(items);

		});

	    }
	    db.close();
	});
    });
    router.put('/tipsPageUpdateProfile', function (req, res) {
	console.log("tips page profile update");

	var userName = req.body['username'];
	var lovedTipsJson = req.body['lovedTips'];
	var likedTipsJson = req.body['likedTips'];
	var dislikedTipsJson = req.body['dislikedTips'];
	var submittedTipsJson = req.body['submittedTips'];

	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('profileCollection');
		collection.update({userName: userName}, {$set: {lovedTipsJson: lovedTipsJson, likedTipsJson: likedTipsJson, dislikedTipsJson: dislikedTipsJson, submittedTips: submittedTipsJson}}, {upsert: true}, function (err, db) {
		    if (err) {
			console.log('Unable to edit profile', err);
			res.send('Tip edit failed');
		    }
		    else {
			res.send('Profile edit successful');
		    }
		});
	    }
	    db.close();
	});

    })
    router.put('/tipsPageUpdatePoints', function (req, res) {
	console.log("tipsPage Update Points")
	var tipId = req.body['tipId'];
	var points = req.body['points'];
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		console.log(tipId);
		collection.update({_id: ObjectId(tipId)}, {$set: {tipPoints: points}}, {upsert: true}, function (err, db) {
		    if (err) {
			console.log('Unable to edit tip to tipsCollection', err);
			res.send(points);
		    }
		    else {
			res.send('Tip edit successfuly submitted');
		    }
		});
	    }
	    db.close();
	});

    })
    router.put('/tipsPagePut', function (req, res) {
	console.log("tipsPagePUT");
	var tipId = req.body['tipId'];
	var tipTitle = req.body['tipTitle'];
	var tipDescJson = req.body['tipDescJson'];
	var genreJson = req.body['genreJson'];
	var tipTypeJson = req.body['tipTypeJson'];
	var vstJson = req.body['vstJson'];
	var dawJson = req.body['dawJson'];

	var updatingImages = false;
	var imageDataJson = "";
	if (req.body['imageDataJson']) {
	    imageDataJson = req.body['imageDataJson'];
	    updatingImages = true;
	}

	var videoLinkJson = req.body['videoLinkJson'];
	var filtersJson = req.body['filtersJson'];

	var submittedBy = req.body['submittedBy'];
	var tipPoints = req.body['points'];
	var dateSubmitted = req.body['dateSubmitted'];

	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		console.log(tipId);
		if (updatingImages) {
		    collection.update({_id: ObjectId(tipId)}, {tipTitle: tipTitle, tipDescJson: tipDescJson, genreJson: genreJson, tipTypeJson: tipTypeJson, vstJson: vstJson, dawJson: dawJson, imageDataJson: imageDataJson, videoLinkJson: videoLinkJson, filtersJson: filtersJson, submittedBy: submittedBy, tipPoints: tipPoints, dateSubmitted: dateSubmitted}, function (err, db) {
			if (err) {
			    console.log('Unable to edit tip to tipsCollection', err);
			    res.send('Tip edit failed');
			}
			else {
			    res.send('Tip edit successfuly submitted');
			}
		    });
		}
		else {
		    collection.update({_id: ObjectId(tipId)}, {$set: {tipTitle: tipTitle, tipDescJson: tipDescJson, genreJson: genreJson, tipTypeJson: tipTypeJson, vstJson: vstJson, dawJson: dawJson, videoLinkJson: videoLinkJson, filtersJson: filtersJson, submittedBy: submittedBy, tipPoints: tipPoints, dateSubmitted: dateSubmitted}}, function (err, db) {
			if (err) {
			    console.log('Unable to edit tip to tipsCollection', err);
			    res.send('Tip edit failed');
			}
			else {
			    res.send('Tip edit successfuly submitted');
			}
		    });
		}
	    }
	    db.close();
	});

    });
    router.post('/uploadImage', function (req, res) {
	upload(req, res, function (err) {
	    if (err) {
		console.log(err);
		return res.end("Error uploading file.");
	    }
	    MongoClient.connect(url, function (err, db) {
		if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
		    //HURRAY!! We are connected. :)
		    console.log('Connection established to', url);

		    // do some work here with the database.
		    // Get the documents collection
		    var collection = db.collection('imageCollection');
		    collection.insert({fieldName: req.file.fieldname,
			originalName: req.file.originalname,
			encoding: req.file.encoding,
			mimetype: req.file.mimetype,
			destination: req.file.destination,
			fileName: req.file.filename,
			path: req.file.path,
			imageSize: req.file.size},
		    function (err, db) {
			if (err) {
			    console.log('Unable to add image to image collection', err);
			    res.send('Image uploaded failed');
			}
			else {
			    console.log('Added image to collection', err);
			    console.log('Added image to collection', err);
			    //Production
			    if (runningProduction) {
				res.send(req.file.location);
			    }
			    else {
				//Local
				res.send(req.file.filename);
			    }



			}
		    });

		}
		db.close();
	    });
	});


    });



    router.delete('/tipsPageDelete', function (req, res) {

	console.log(req);
	var tipId = req.body['id'];
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('tipsCollection');
		collection.remove({_id: new mongodb.ObjectID(tipId)}, function (err, db) {
		    res.send('Tip successfuly removed');
		});

	    }
	    db.close();
	});

    });


    //FILTER ROUTES
    router.post('/addFilter', function (req, res) {
	console.log('add filter');
	var name = req.body['name'];
	var type = req.body['type'];
	var parent = req.body['parent'];

	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('filterCollection');
		collection.insert({name: name, type: type, parent: parent}, function (err, docsInserted) {
		    if (err) {
			console.log('Unable to add filter to filterCollection', err);
			res.send('filter upload failed');
		    }
		    else {
			console.log(docsInserted.ops[0]._id);
			res.send(docsInserted.ops[0]);
		    }
		});

	    }
	    db.close();
	});
    });
    router.get('/getFilters', function (req, res) {
	console.log('get filters');

	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
		res.status(500).send("unable to connect to mongo server");
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		//var TipsCollection = db.collection('tipsCollection');
		var cursorArray = db.collection('filterCollection').find({parent: null}).toArray(function (err, items) {
		    if (err) {
			res.status(500).send('error retreiving data')
		    }
		    res.send(items);
		});

	    }
	    db.close();
	});
    });
    router.get('/getFilters/:parent', function (req, res) {
	console.log('get sub filters');
	var parent = req.params['parent'];
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
		res.status(500).send("unable to connect to mongo server");
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		//var TipsCollection = db.collection('tipsCollection');
		var cursorArray = db.collection('filterCollection').find({parent: parent}).toArray(function (err, items) {
		    if (err) {
			res.status(500).send('error retreiving data')
		    }
		    res.send(items);
		});

	    }
	    db.close();
	});
    });
    router.delete('/deleteFilter/:id', function (req, res) {

	var filterId = req.params['id'];
	console.log("delete filter with id:" + filterId);
	MongoClient.connect(url, function (err, db) {
	    if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	    } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.
		// Get the documents collection
		var collection = db.collection('filterCollection');
		collection.remove({_id: new mongodb.ObjectID(filterId)}, function (err, db) {
		    res.send('Filter successfuly removed');
		});

	    }
	    db.close();
	});

    });

    router.post('/uploadTipAudioSample', function (req, res) {
	uploadSample(req, res, function (err) {
	    if (err) {
		console.log(err);
		return res.end("Error uploading sample.");
	    }
	    MongoClient.connect(url, function (err, db) {
		//console.log("BPM " + req.body.bpm);
		if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
		    //HURRAY!! We are connected. :)
		    console.log('Connection established to', url);

		    // do some work here with the database.
		    // Get the documents collection
		    console.log("uploading sample..");
		    console.dir(req);
		    var collection = db.collection('tipAudioSampleCollection');
		    collection.insert({fieldName: req.file.fieldname,
			originalName: req.file.originalname,
			encoding: req.file.encoding,
			mimetype: req.file.mimetype,
			destination: req.file.location,
			fileName: req.file.filename,
			path: req.file.path,
			fileSize: req.file.size,
		    },
			    function (err, docsInserted) {
				if (err) {
				    console.log('Unable to add image to image collection', err);
				    res.send('Image uploaded failed');
				}
				else {
				    console.dir(req);

				    //Production
				    if (runningProduction) {
					res.send(docsInserted.ops[0]._id);
				    }
				    else {
					//Local
					res.send(docsInserted.ops[0]._id);
				    }



				}
			    });

		}
		db.close();
	    });
	});

    });
     router.get('/getTipAudioSample/:tipIndex/:audioIndex/:id', function (req, res) {
	var id = req.params.id;
	var tipIndex = req.params.tipIndex;
	var audioIndex = req.params.audioIndex;
	
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
		var collection = db.collection('tipAudioSampleCollection');
		cursor = collection.find({_id: ObjectId(id)}).toArray(function (err, item) {
		    if (err) {
			console.log('Unable to get tip', err);
		    }
		    else {
			res.send({item:item,tipIndex:tipIndex,audioIndex:audioIndex});

		    }
		    db.close();
		});
	    }
	});
    });



//router.get('/images/:imageId', function (req, res, next) {
    // console.log("SERVING IMAGE");

    // console.log(req.params);

    // var img = fs.readFileSync('./resources/images/'+req.params['imageId']);
    //console.log(img);
    //  res.writeHead(200, {'Content-Type': 'image/jpeg'});
    // var imageUrl = '../public/resources/images/' + req.params['imageId'];
    // console.log(imageUrl);
    // 
    // var img = fs.readFileSync('../public/resources/images/' + req.params['imageId']);
    // 
    //   console.log('gotImage');
    //  res.writeHead(200, {'Content-Type': 'image/jpeg' });
    //  res.end(img, 'binary');
    // 

    // res.sendFile('../public/resources/images/' + req.params['imageId'], function (err) {
//	if (err) {
//	    console.log(err);
//	    res.status(err.status).end();
//	}
//	else {
//	    console.log('Sent:', req.params['imageId']);
//	}
    // });



//
//});
// route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
	console.log("isLoggedIn Function")
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
	    return next();

	// if they aren't redirect them to the home page
	res.redirect('/signUp');
    }



}



