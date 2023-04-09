var express = require('express');
var router = express.Router();

var fs = require('fs');
var passport = require('passport');
var session = require('express-session');

var assert = require('assert');

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
var photoBucket = new AWS.S3({ params: { Bucket: 'tip-photos-bucket' } });
var sampleBucket = new AWS.S3({ params: { Bucket: 'tip-samples-bucket' } });

console.log("Photo Bucket is")
console.log(photoBucket);
var upload = "";
if (runningProduction) {
	upload = multer({
		storage: multerS3({
			s3: photoBucket,
			bucket: 'tip-photos-bucket',
			acl: 'public-read',
			metadata: function (req, file, cb) {
				cb(null, { fieldName: file.fieldname });
			},
			key: function (req, file, cb) {
				cb(null, Date.now().toString())
			}
		})
	}).single('file');
	uploadSample = multer({
		storage: multerS3({
			s3: sampleBucket,
			bucket: 'tip-samples-bucket',
			acl: 'public-read',
			metadata: function (req, file, cb) {
				cb(null, { fieldName: file.fieldname });
			},
			key: function (req, file, cb) {
				cb(null, Date.now().toString())
			}
		})
	}).single('file');
}
else {
	upload = multer({ dest: appRoot + '/public/resources/images' }).single('file');
	uploadSample = multer({ dest: appRoot + '/public/resources/samples' }).single('file');
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
			res.send(req.user);
		}
		else {
			res.send(false);
		}

	}
	);
	/* GET home page. */
	router.get('/', function (req, res, next) {
		res.render('index', { title: '' });
	});
	router.get('/index', function (req, res, next) {
		res.render('index', { title: '' });
	});
	/* GET About page. */
	router.get('/about', function (req, res) {
		res.render('about', { title: 'About Music Production Helper' });
	});
	/* GET Samples page. */
	router.get('/samplesPage', function (req, res) {
		res.render('samplesPage', { title: 'Free Samples!' });
	});

	router.get('/devDash', function (req, res) {
		res.render('devDash', { title: 'Dev Dash' });
	});

	router.get('/popUp', function (req, res) {
		res.render('popUp', { title: 'Pop Up' });
	});


	router.get('/signIn', function (req, res) {
		console.log(req);
		res.render('signIn', {
			title: 'Sign In',
			messages: req.flash('loginMessage')
		});
	});

	console.log("done");
	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	router.post('/googleAuth', function (req, res, next) {
		console.log(req);
		console.log("signUpTips");
		var userEmail = '';
		var userPassword = '';
		var idToken = '';
		if (req.body.Es != null) {
			userEmail = req.body.Es.kt;
			idToken = req.body.uc.id_token;
			userPassword = req.body.uc.id_token;
		}
		for (var key in (req.body)) {
			if (req.body.hasOwnProperty(key)) {
				console.log(key + " -> " + req.body[key]);
				for (var key2 in (req.body[key])) {
					console.log(key2 + " -> " + req.body[key][key2]);
					if (validateEmail(req.body[key][key2])) {
						userEmail = req.body[key][key2];
					}
					if (req.body[key].hasOwnProperty('id_token')) {
						idToken = req.body[key].id_token;
					}
				}
			}
		}

		var rolesArray = { roles: [{ role: "readAnyDatabase", db: "admin" }] };
		var adminUrl = "mongodb://127.0.0.1:27017/admin"

		MongoClient.connect(adminUrl, function (err, db) {
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			} else {
				//HURRAY!! We are connected. :)

				console.log('Connection established to', url);
				console.log(db);
				// do some work here with the database.
				// Get the documents collection
				//UPSERT USER

				var collection = db.collection('system.users');

				cursor = collection.find({ user: (userEmail) }).toArray(function (err, item) {
					if (err) {
						console.log('error', err);
					}
					else {
						if (item.length > 0) {
							console.log('found user', err);
							res.json({ message: 'user exists', user: item[0], newUser: false });
						}
						else {
							console.log('user not found', err);
							db.addUser(userEmail, userPassword, rolesArray, function (err, result) {
								// 	assert.equal(null, err);
								db.close();
								res.json({ message: 'new user', user: result, newUser: true });
								//res.redirect('/profile/' + result[0].user);

							});
						}
					}
				});
				// assert.equal(null, err);



			}
			//db.close();
		});
	});

	router.get('/signIn/:redirect', function (req, res) {
		var redirect = req.params.redirect;
		res.render('signIn', {
			title: 'Sign In',
			message: req.flash('signupMessage'),
			redirect: redirect
		});
	});
	router.get('/contactMe', function (req, res) {
		console.log(req);
		res.render('contactMe', {});
	});
	/* GET Comments Template. */
	router.get('/comments-list', function (req, res) {
		console.log('loading comment templates');
		res.render('comments-list', { title: 'comment template' });
	});
	/* GET Samples Template. */
	router.get('/samples-list', function (req, res) {
		console.log('loading samples template');
		res.render('samples-list', { title: 'sample template' });
	});
	router.get('/packs-list', function (req, res) {
		console.log('loading packs template');
		res.render('packs-list', { title: 'pack template' });
	});
	// process the login form
	router.post('/signIn', passport.authenticate('local-login', {
		// redirect to the secure profile section
		//successRedirect: '/profile',
		failureRedirect: '/signIn', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}), function (req, res) {
		console.log("Sign in success redirecting to " + req.body['redirect']);

		var user = req.user;
		//  res.redirect("/" + req.body['redirect'] + "/" + user.local.username);

		//  res.render('profile');


		res.send({ message: 'sign in success', user: req.user });
	});

	router.get('/signUp', function (req, res) {
		res.render('signUp', {
			title: 'Sign Up',
			message: req.flash('signupMessage'),
			redirect: "profile"
		});
	});
	router.get('/signUp/:redirect', function (req, res) {
		var redirect = req.params.redirect;
		res.render('signUp', {
			title: 'Sign Up',
			message: req.flash('signupMessage'),
			redirect: redirect
		});
	});

	

	router.get('/getUserData', function (req, res) {
		try {
			var redirect = req.params.redirect;
			const db = req.app.locals.db;

			var collection = db.collection('users');

			cursor = collection.find({ _id: ObjectId(req.user.id) }).toArray(function (err, item) {
				if (err) {
					console.log('error', err);
				}
				else {
					if (item.length > 0) {
						console.log('found user', err);
						res.send({ message: 'user exists', user: req.user, newUser: false });


					}
					else {
						console.log('user not found', err);
						res.send({ message: 'user does not exist', user: req.user, newUser: true });
					}
				}
			});
		}
		catch {

		}


	});




	router.get('/newBearerUser/:profileId', function (req, res) {
		var profileId = req.params.profileId;
		console.log('checking if this is a new Bearer user');
		console.log(profileId);
		MongoClient.connect(url, function (err, db) {
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
				res.status(500).send("unable to connect to mongo server");
			} else {
				//HURRAY!! We are connected. :)
				console.log('Connection established to', url);

				var collection = db.collection('users');

				cursor = collection.find({ profileId: profileId }).toArray(function (err, item) {
					if (err) {
						console.log('error', err);
					}
					else {
						if (item.length > 0) {
							console.log('found user', err);
							res.send({ message: 'user exists', user: req.user, newUser: false });


						}
						else {
							console.log('user not found', err);
							res.send({ message: 'user does not exist', user: req.user, newUser: true });
						}
					}
				});

			}
			db.close();
		});
	})


	//HANDLES TOKEN VERIFICATION
	router.get('/bearerSignUp',
		passport.authenticate('bearer', { session: true }),
		function (req, res) {
			//res.redirect('/profile');

			res.send({ message: 'sign in success', user: req.user });
		});

	router.put("/updateBearerUser/:id", function (req, res) {
		console.log('profileInfoGetHere');
		var id = req.params.id;
		var objectId = req.body['objectId'];
		var profileId = req.body['profileId'];
		var email = req.body['email'];
		var displayName = req.body['name'];
		var imageUrl = req.body['imageUrl']

		MongoClient.connect(url, function (err, db) {
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
				res.status(500).send("unable to connect to mongo server");
			} else {
				//HURRAY!! We are connected. :)
				console.log('Connection established to', url);

				var collection = db.collection('users');

				collection.update({ _id: ObjectId(objectId) }, { $set: { profileId: profileId, email: email, displayName: displayName, imageUrl: imageUrl } }, { upsert: false }, function (err, db) {
					if (err) {
						console.log('Unable to update user', err);
						res.send(points);
					}
					else {
						res.send('updated user');
					}
				});

				db.close();
			}

		});
	});


	//process the google signup form
	router.all('/*', function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		next();
	});

	router.get('/googleSignUp', passport.authenticate('google', { scope: ['openid ', 'email', 'profile', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));


	router.get('/googleSignUpCallback',
		passport.authenticate('google', {
			failureRedirect: '/signUp'
		}),
		function (req, res) {
			res.redirect('/');
		});

	router.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile', {
			user: req.user,
			greeting: "Welcome "
		});
	});

	router.get('/profile/:username', function (req, res) {
		console.log('getting profile for ')
		var userName = req.params.username;
		console.log(userName);
		res.render('profile', {
			username: userName,
			localuser: req.user
		});
	});

	// router.get('/profile/:userId', function (req, res) {
	// 	console.log('getting profile for ')
	// 	var userId = req.params.userId;
	// 	console.log(userId);
	// 	//Todo grab user data based on userId
	// 	res.render('profile', {
	// 		username: req.params.userId,
	// 		localuser: req.user
	// 	});
	// });

	router.get('/flags/:size/:name',function(req,res){
		const options = {
			//root: path.join(__dirname)
		};

		res.sendFile(path.resolve('node_modules/flag-icons/flags/' +req.params.size + '/' + req.params.name), options, function(err){
			if (err) {
				next(err);
			} else {
			}
		});
	});

	router.get('/filterScriptFile',function(req,res){
		const options = {
			//root: path.join(__dirname)
		};

		res.sendFile(path.resolve('resources/filterL3gz.txt'), options, function(err){
			if (err) {
				next(err);
			} else {
			}
		});
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
		req.logout(function(response){
			res.redirect('/signIn');
		});
	});

	/* GET Hello World page. */
	router.get('/tipLib', function (req, res) {
		try {
			const db = req.app.locals.db;
			var collection = db.collection('tipsCollection');
			var cursor;

			cursor = collection.find();
			res.render('tipLib', { title: 'Tip Library', dbCursor: cursor });
		}
		catch {

		}

	});
	/* GET Hello World page. */
	router.get('/tipLib/:id', function (req, res) {
		try{
			var id = req.params.id;
			console.log("loading tip " + id);
			// Use connect method to connect to the Server
			var cursor;
			const db = req.app.locals.db;

			var collection = db.collection('tipsCollection');
			cursor = collection.find({ _id: ObjectId(id) }).toArray(function (err, item) {
				if (err) {
					console.log('Unable to get tip', err);
				}
				else {
					res.render('tipLib', { title: 'Tip Library with Id', item: item, id: id });

				}
			});
		}
		catch{

		}		
	});
	
	router.get('/tipsPageGet', function (req, res) {
		try {
			var itemsTest;
			const db = req.app.locals.db;
			var cursorArray = db.collection('tipsCollection').find().toArray(function (err, items) {
				if (err) {
					res.status(500).send('error retreiving data')
				}
				console.log("items");
				res.send(items);

			});
		}
		catch (e) {
			console.log(e);
		}

	});

	router.post('/tipsPagePost', function (req, res) {
		try {
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

			const db = req.app.locals.db;

			// do some work here with the database.
			// Get the documents collection
			var collection = db.collection('tipsCollection');
			collection.insert({ tipTitle: tipTitle, tipDescJson: tipDescJson, genreJson: genreJson, tipTypeJson: tipTypeJson, vstJson: vstJson, dawJson: dawJson, imageDataJson: imageDataJson, audioSampleObjectJson: audioSampleObjectJson, videoLinkJson: videoLinkJson, filtersJson: filtersJson, submittedBy: submittedBy, tipPoints: points, dateSubmitted: dateSubmitted }, function (err, docsInserted) {
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
		catch (e) {
			console.log(e);
		}

	});
	router.post("/profileInfoPostGet/:username", function (req, res) {
		try {

			console.log('profileInfoGetHere');
			var userName = req.params.username;
			var userNameTest = req.body['username'];
			console.log(userName);
			console.log(userNameTest);
			const db = req.app.locals.db;

			console.log('Connection established to', url);

			// do some work here with the database.
			// Get the documents collection
			console.log("Profile Data Includes");
			console.log(db.collection('profileCollection').find({ userName: userName }));
			db.collection('profileCollection').find({ userName: userName }).toArray(function (err, items) {
				if (err) {
					res.status(500).send('error retreiving data');
				}
				console.log(items);
				res.send(items);

			});
		}
		catch {

		}

	});
	router.put('/tipsPageUpdateProfile', function (req, res) {
		try {
			console.log("tips page profile update");

			var userName = req.body['username'];
			var lovedTipsJson = req.body['lovedTips'];
			var likedTipsJson = req.body['likedTips'];
			var dislikedTipsJson = req.body['dislikedTips'];
			var submittedTipsJson = req.body['submittedTips'];
			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			collection.update({ userName: userName }, { $set: { lovedTipsJson: lovedTipsJson, likedTipsJson: likedTipsJson, dislikedTipsJson: dislikedTipsJson, submittedTips: submittedTipsJson } }, { upsert: true }, function (err, db) {
				if (err) {
					console.log('Unable to edit profile', err);
					res.send('Tip edit failed');
				}
				else {
					res.send('Profile edit successful');
				}
			});
		}
		catch {

		}

	})
	router.put('/tipsPageUpdatePoints', function (req, res) {
		try {
			console.log("tipsPage Update Points")
			var tipId = req.body['tipId'];
			var points = req.body['points'];
			console.log('Connection established to', url);
			const db = req.app.locals.db;

			// do some work here with the database.
			// Get the documents collection
			var collection = db.collection('tipsCollection');
			console.log(tipId);
			collection.update({ _id: ObjectId(tipId) }, { $set: { tipPoints: points } }, { upsert: true }, function (err, db) {
				if (err) {
					console.log('Unable to edit tip to tipsCollection', err);
					res.send(points);
				}
				else {
					res.send('Tip edit successfuly submitted');
				}
			});
		}
		catch {

		}

	})
	router.put('/tipsPagePut', function (req, res) {
		try {
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

			console.log('Connection established to', url);
			const db = req.app.locals.db;

			// do some work here with the database.
			// Get the documents collection
			var collection = db.collection('tipsCollection');
			console.log(tipId);
			if (updatingImages) {
				collection.update({ _id: ObjectId(tipId) }, { tipTitle: tipTitle, tipDescJson: tipDescJson, genreJson: genreJson, tipTypeJson: tipTypeJson, vstJson: vstJson, dawJson: dawJson, imageDataJson: imageDataJson, videoLinkJson: videoLinkJson, filtersJson: filtersJson, submittedBy: submittedBy, tipPoints: tipPoints, dateSubmitted: dateSubmitted }, function (err, db) {
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
				collection.update({ _id: ObjectId(tipId) }, { $set: { tipTitle: tipTitle, tipDescJson: tipDescJson, genreJson: genreJson, tipTypeJson: tipTypeJson, vstJson: vstJson, dawJson: dawJson, videoLinkJson: videoLinkJson, filtersJson: filtersJson, submittedBy: submittedBy, tipPoints: tipPoints, dateSubmitted: dateSubmitted } }, function (err, db) {
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
		catch {

		}



	});
	router.post('/uploadImage', function (req, res) {
		upload(req, res, function (err) {
			try {
				if (err) {
					console.log(err);
					return res.end("Error uploading file.");
				}
				const db = req.app.locals.db;

				var collection = db.collection('imageCollection');
				collection.insert({
					fieldName: req.file.fieldname, originalName: req.file.originalname, encoding: req.file.encoding,
					mimetype: req.file.mimetype, destination: req.file.destination, fileName: req.file.filename, path: req.file.path, imageSize: req.file.size
				},
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
			catch {

			}
		});


	});



	router.delete('/tipsPageDelete', function (req, res) {
		try {
			console.log(req);
			var tipId = req.body['id'];
			const db = req.app.locals.db;

			var collection = db.collection('tipsCollection');
			collection.remove({ _id: new mongodb.ObjectID(tipId) }, function (err, db) {
				res.send('Tip successfuly removed');
			});
		}
		catch {

		}




	});


	//FILTER ROUTES
	router.post('/addFilter', function (req, res) {
		try {
			console.log('add filter');
			var name = req.body['name'];
			var type = req.body['type'];
			var parent = req.body['parent'];
			const db = req.app.locals.db;

			var collection = db.collection('filterCollection');
			collection.insert({ name: name, type: type, parent: parent }, function (err, docsInserted) {
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
		catch (e) {
			console.log(e);
		}

	});
	router.get('/getFilters', function (req, res) {
		try {
			console.log('get filters');
			const db = req.app.locals.db;
			var cursorArray = db.collection('filterCollection').find({ parent: null }).toArray(function (err, items) {
				if (err) {
					res.status(500).send('error retreiving data')
				}
				res.send(items);
			});

		}
		catch {

		}
	});
	router.get('/getFilters/:parent', function (req, res) {
		try {
			console.log('get sub filters');
			var parent = req.params['parent'];
			const db = req.app.locals.db;
			var cursorArray = db.collection('filterCollection').find({ parent: parent }).toArray(function (err, items) {
				if (err) {
					res.status(500).send('error retreiving data')
				}
				res.send(items);
			});
		}
		catch {

		}


	});
	router.delete('/deleteFilter/:id', function (req, res) {
		try {
			var filterId = req.params['id'];
			console.log("delete filter with id:" + filterId);
			const db = req.app.locals.db;

			console.log('Connection established to', url);

			// do some work here with the database.
			// Get the documents collection
			var collection = db.collection('filterCollection');
			collection.remove({ _id: new mongodb.ObjectID(filterId) }, function (err, db) {
				res.send('Filter successfuly removed');
			});
		}
		catch {

		}

	});

	router.post('/uploadTipAudioSample', function (req, res) {
		uploadSample(req, res, function (err) {
			try {
				if (err) {
					console.log(err);
					return res.end("Error uploading sample.");
				}
				// do some work here with the database.
				// Get the documents collection
				console.log("uploading sample..");
				console.dir(req);
				const db = req.app.locals.db;

				var collection = db.collection('tipAudioSampleCollection');
				collection.insert({
					fieldName: req.file.fieldname, originalName: req.file.originalname, encoding: req.file.encoding,
					mimetype: req.file.mimetype, destination: req.file.location, fileName: req.file.filename, path: req.file.path, fileSize: req.file.size,
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
			catch {

			}
		});

	});
	router.get('/getTipAudioSample/:tipIndex/:audioIndex/:id', function (req, res) {
		try {
			var id = req.params.id;
			var tipIndex = req.params.tipIndex;
			var audioIndex = req.params.audioIndex;

			console.log('getting samples');
			const db = req.app.locals.db;

			var collection = db.collection('tipAudioSampleCollection');
			cursor = collection.find({ _id: ObjectId(id) }).toArray(function (err, item) {
				if (err) {
					console.log('Unable to get tip', err);
				}
				else {
					res.send({ item: item, tipIndex: tipIndex, audioIndex: audioIndex });

				}
				db.close();
			});

		}
		catch {

		}
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

	passport.serializeUser(function (user, cb) {
		process.nextTick(function () {
			cb(null, { id: user.id, username: user.username });
		});
	});

	passport.deserializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, user);
		});
	});





}



