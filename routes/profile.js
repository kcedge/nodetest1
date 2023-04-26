
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
		try {
			const db = req.app.locals.db;
			var username = req.params.username;
			console.log('Getting the profile info for')
			console.log(username);
			//	const id = new ObjectID(req.params.id);

			const info = db.collection('profileCollection').find({ username: username }).toArray(function (err, items) {
				if (err) {
					res.status(500).send('error retreiving data');
				}
				//console.log('ITEMS');
				//console.log(items);
				res.send(items);
			});


		}
		catch (e) {
			var e = e;
		}
	});


	//Get tips for a profile 
	router.get('/getTips/:username', function (req, res, next) {
		try {
			const db = req.app.locals.db;
			var username = req.params.username;
			console.log('Getting the Tips for ');
			console.log(username);
			var username = req.params.username;

			// do some work here with the database.
			// Get the documents collection
			var collection = db.collection('tipsCollection');
			//if (collection.find({submittedBy: username})) {
			var cursorArray = collection.find({ submittedBy: username }).toArray(function (err, items) {
				if (err) {
					res.status(500).send('error retreiving data');
				}
				//console.log('ITEMS');
				//console.log(items);
				res.send(items);
			});

		}
		catch {

		}
	});

	router.post('/getTipsByArray', function (req, res) {
		try {
			const db = req.app.locals.db;
			var username = req.params.username;
			console.log('Getting the Tips for ');
			console.log(username);
			var username = req.params.username;

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

			var collection = db.collection('tipsCollection');
			if (collection.find({ '_id': { $in: myArray } })) {
				var cursorArray = collection.find({ '_id': { $in: myArray } }).toArray(function (err, items) {
					if (err) {
						console.log('error 500');
						res.status(500).send('error retreiving data');
					}
					console.log('ITEMS');
					console.log(items);
					res.send(items);
				});
			}
			else {
				res.send("No tips found");
			}

		}
		catch {

		}

	});
	router.post('/getRecentTips', function (req, res) {
		try {
			console.log(req);
			//var tipIdArray = req.body['tipArray'];
			console.log('getting Recent Tips');
			const db = req.app.locals.db;
			var collection = db.collection('tipsCollection');
			if (true) {
				var cursorArray = collection.find().sort({ dateSubmitted: -1 }).toArray(function (err, items) {
					if (err) {
						console.log('error 500');
						res.status(500).send('error retreiving data');
					}
					console.log('ITEMS');
					console.log(items);
					res.send(items);
				});
			}
			else {
				res.send("No tips found");
			}

		}
		catch {

		}

	});
	router.get('/getTopUsers/:period', function (req, res) {
		try {
			console.log(req);
			var period = req.params.period;
			if (period == 'MONTH') {

			}
			//var tipIdArray = req.body['tipArray'];
			console.log('getting Top Users');
			const db = req.app.locals.db;
			var collection = db.collection('profileCollection');
			if (true) {//period=='ALL TIME'
				var cursorArray = collection.find().sort({ totalpoints: -1 }).toArray(function (err, items) {
					if (err) {
						console.log('error 500');
						res.status(500).send('error retreiving data');
					}
					console.log('ITEMS');
					console.log(items);
					res.send(items);
				});
			}
			else {
				res.send("No profiless found");
			}
		}
		catch {

		}

	});
	router.post('/postProfileMetaData/:username', function (req, res) {
		try {
			var username = req.params.username;
			console.log(req);
			var profileMetaDataJson = req.body['profileMetaDataJson'];

			//var tipIdArray = req.body['tipArray'];
			console.log('posting profileImageJson Data' + profileMetaDataJson);

			console.log('username:' + username);
			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			if (true) {
				collection.update({ userName: username }, { $set: { profileMetaDataJson: profileMetaDataJson } }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('profileMetaDataJson save failed');
					}
					else {
						res.send('profileMetaDataJson edit successful');
					}
				})
			}
			else {
				res.send("No profileImageJson found");
			}
		}
		catch {

		}

	});
	router.post('/postProfileMetaData/:username', function (req, res) {
		try {
			var username = req.params.username;
			console.log(req);
			var profileMetaDataJson = req.body['profileMetaDataJson'];

			//var tipIdArray = req.body['tipArray'];
			console.log('posting profileImageJson Data' + profileMetaDataJson);

			console.log('username:' + username);
			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			if (true) {
				collection.update({ userName: username }, { $set: { profileMetaDataJson: profileMetaDataJson } }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('profileMetaDataJson save failed');
					}
					else {
						res.send('profileMetaDataJson edit successful');
					}
				})
			}
			else {
				res.send("No profileImageJson found");
			}
		}
		catch {

		}

	});

	router.post('/postProfileDownloadedSamples/:username', function (req, res) {

		try {
			var username = req.params.username;
			console.log(req);
			var downloadedSamples = req.body['downloadedSamples'];

			//var tipIdArray = req.body['tipArray'];
			console.log('posting postProfileDownloadedSamples Data' + downloadedSamples);

			console.log('username:' + username);
			var collection = db.collection('profileCollection');
			if (true) {
				collection.update({ userName: username }, { $set: { downloadedSamples: downloadedSamples } }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('downloadedSamples  save failed');
					}
					else {
						res.send('downloadedSamples Profile edit successful');
					}
				})
			}
			else {
				res.send("No downloadedSamples found");
			}

		}
		catch {

		}

	});
	router.post('/postProfileImage', function (req, res) {
		try {

			console.log(req);
			var userId = req.body['userId'];
			var profileImageJson = req.body['profileImageJson'];

			//var tipIdArray = req.body['tipArray'];
			console.log('posting profileImageJson Data' + profileImageJson);
			const db = req.app.locals.db;
			var collection = db.collection('profileCollection');

			if (true) {
				collection.update({ userId: ObjectId(userId) }, { $set: { profileImageJson: profileImageJson } }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('profileImageJson image save failed');
					}
					else {
						res.send('Profile edit successful');
					}
				})
			}
			else {
				res.send("No profileImageJson found");
			}

		}
		catch {

		}

	});
	router.post('/postBannerProfileImage', function (req, res) {
		try {

			console.log(req);
			var userId = req.body['userId'];
			var profileBannerImageJson = req.body['profileBannerImageJson'];

			//var tipIdArray = req.body['tipArray'];
			console.log('posting profileBannerImageJson Data' + profileBannerImageJson);
			const db = req.app.locals.db;
			var collection = db.collection('profileCollection');

			if (true) {
				collection.update({ userId: ObjectId(userId) }, { $set: { profileBannerImageJson: profileBannerImageJson } }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('profileImageJson image save failed');
					}
					else {
						res.send('Profile edit successful');
					}
				})
			}
			else {
				res.send("No profileImageJson found");
			}

		}
		catch {

		}

	});
	router.post('/postBannerImage/:username', function (req, res) {
		try {
			var username = req.params.username;
			console.log(req);
			var bannerImageJson = req.body['bannerImageJson'];

			//var tipIdArray = req.body['tipArray'];
			console.log('posting Banner Data' + bannerImageJson);

			console.log('username:' + username);
			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			if (true) {
				collection.update({ userName: username }, { $set: { bannerImageJson: bannerImageJson } }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('Banner image save failed');
					}
					else {
						res.send('Profile edit successful');
					}
				})
			}
			else {
				res.send("No banner image found");
			}
		}
		catch {

		}
	});

	router.post('/getTopTips', function (req, res) {
		try {
			console.log(req);
			//var tipIdArray = req.body['tipArray'];
			console.log('getting Top Tips');
			console.log(req);
			//var tipIdArray = req.body['tipArray'];
			console.log('getting Recent Tips');
			const db = req.app.locals.db;
			// do some work here with the database.
			// Get the documents collection
			var collection = db.collection('tipsCollection');
			if (true) {
				var cursorArray = collection.find().sort({ tipPoints: -1 }).toArray(function (err, items) {
					if (err) {
						console.log('error 500');
						res.status(500).send('error retreiving data');
					}
					console.log('ITEMS');
					console.log(items);
					res.send(items);
				});
			}
			else {
				res.send("No tips found");
			}
		}
		catch {

		}


	});

	//Get tips for a profile 
	router.get('/getUserProfile/:authenticated', function (req, res, next) {
		try {
			const db = req.app.locals.db;
			var authenticated = req.params.authenticated;
			console.log('Getting profile');
			console.log(authenticated);
			var authenticatedid = req.params.authenticated;

			// do some work here with the database.
			// Get the documents collection
			var collection = db.collection('profileCollection');
			var usersCollection = db.collection('users');
			var cursorArrayUsers = usersCollection.aggregate([{ $lookup: { from: 'profileCollection', localField: '_id', foreignField: 'userId', as: 'profileDetails' } }])
				.toArray(function (err, userItems) {
					if (err) {
						res.status(500).send('error retreiving data');
					}
					var user = userItems.filter(obj => {
						var objectidStr = ObjectId(obj._id).toString();
						return (objectidStr === authenticatedid);
					});


					res.send(user);
					//if (collection.find({submittedBy: username})) {
					// var cursorArray = collection.find({ userId: ObjectId(authenticatedid) }).toArray(function (err, items) {
					// 	if(items.length == 0){
					// 		var profileInit = {};
					// 		userItems.userInfo = userItems;
					// 		res.send(profileInit);
					// 	}else{
					// 		items[0].userInfo = userItems;
					// 		res.send(items);
					// 	}

					// });
					//console.log('ITEMS');
					//console.log(items);

				});


		}
		catch {

		}
	});



	router.post('/popUpSubmit', function (req, res) {
		try {
			console.log(req);
			var email = req.body['email'];
			var user = req.body['user'];


			const db = req.app.locals.db;

			var collection = db.collection('users');
			if (true) {
				collection.update({ _id: ObjectId(user._id) }, { $set: { email: email } }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('Banner image save failed');
					}
					else {
						res.send('Profile edit successful');
					}
				})
			}
			else {
				res.send("No banner image found");
			}
		}
		catch {

		}
	});

	router.post('/popUpProfileSubmit', function (req, res) {
		try {
			console.log(req);
			var userData = req.body['userData'];
			var user = req.body['user'];


			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			if (true) {
				collection.update({ userId: ObjectId(user._id) }, { $set: { username: userData.username, bio: userData.bio, country: userData.country, soundcloud: userData.soundcloud, interests: userData.interests, roles: userData.roles, profileColor: userData.profileColor, links: userData.links } }, { upsert: true }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('Banner image save failed');
					}
					else {
						res.send('Profile edit successful');
					}
				})
			}
			else {
				res.send("No banner image found");
			}
		}
		catch {

		}
	});


	router.post('/deleteProfilePicture', function (req, res) {
		try {
			console.log(req);
			var imgData = req.body['imgData'];
			var user = req.body['user'];


			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			if (true) {
				collection.update({ userId: ObjectId(user._id) }, { $set: { profileImageJson: imgData } }, { upsert: true }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('Banner image save failed');
					}
					else {
						res.send('Profile edit successful');
					}
				})
			}
			else {
				res.send("No banner image found");
			}
		}
		catch {

		}
	});


	router.post('/deleteBannerProfilePicture', function (req, res) {
		try {
			console.log(req);
			var imgData = req.body['imgData'];
			var user = req.body['user'];


			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			if (true) {
				collection.update({ userId: ObjectId(user._id) }, { $set: { profileBannerImageJson: imgData } }, { upsert: true }, function (err, db) {
					if (err) {
						console.log('Unable to edit profile', err);
						res.send('Banner image save failed');
					}
					else {
						res.send('Profile edit successful');
					}
				})
			}
			else {
				res.send("No banner image found");
			}
		}
		catch {

		}
	});

	router.get('/getUsersForUserManagement', function (req, res) {
		try {

			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			var usersCollection = db.collection('users');

			var cursorArrayUsers = usersCollection.aggregate([{ $lookup: { from: 'profileCollection', localField: '_id', foreignField: 'userId', as: 'profileDetails' } }])
				.toArray(function (err, userItems) {
					if (err) {
						res.status(500).send('error retreiving data');
					}

					res.send(userItems);

				});
		}
		catch {

		}
	});

	function isLoggedIn(req, res, next) {
		console.log("isLoggedIn Function")



		// if user is authenticated in the session, carry on 
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/signUp');
	}

	router.post('/unfollowUser', isLoggedIn, function (req, res) {
		try {
			console.log(req);
			var profileIdFollower = req.body['followerProfileId'];
			var profileIdFollowing = req.body['followingProfileId'];
			var user = req.body['username'];

			const db = req.app.locals.db;
			var collection = db.collection('profileCollection');


			//check followers profile
			var cursorArray = collection.find({ _id: ObjectId(profileIdFollower) }).toArray(function (err, items) {
				var followerProfile = items[0];
				if (followerProfile.followingArray == null) {
					followerProfile.followingArray = [];
				}
				else{
					followerProfile.followingArray = JSON.parse(followerProfile.followingArray);
					var removed = null;
					for(var i = 0; i < followerProfile.followingArray.length; i++){
						if(followerProfile.followingArray[i]._id == profileIdFollowing){
							removed = followerProfile.followingArray.splice(i,1);
							break;
						}
					}
				}

				var followingArrString = JSON.stringify(followerProfile.followingArray);

				collection.update({ _id: ObjectId(profileIdFollower) }, { $set: { followingArray: followingArrString } }, { upsert: true }, function (err, db) {
					if (err) {
						console.log('following failed', err);
					}

				});
			});

			var cursorArray = collection.find({ _id: ObjectId(profileIdFollowing) }).toArray(function (err, items) {
 
				if (err) {
					console.log('follower failed', err);
				}

				var followingProfile =  items[0];
				if (followingProfile.followerArray == null) {
					followingProfile.followerArray = [];
				}
				else{
					followingProfile.followerArray = JSON.parse(followingProfile.followerArray);
					var removed = null;
					for(var i = 0; i < followingProfile.followerArray.length; i++){
						if(followingProfile.followerArray[i]._id == profileIdFollower){
							removed = followingProfile.followerArray.splice(i,1);
							break;
						}
					}
				}
				var followerArrString = JSON.stringify(followingProfile.followerArray);

				collection.update({ _id: ObjectId(profileIdFollowing) }, { $set: { followerArray: followerArrString } }, { upsert: true }, function (err, db) {
					if (err) {
						console.log('follower failed', err);
						res.send("err")

					}
					else {
						res.send("success")
					}
				});
			});

			if (err) {
				console.log('error 500');
				res.status(500).send('error retreiving data');
			}


		}
		catch {

		}
	});

	var pushNotificationProfile = function(req,sender,receiver,type,content,callback){
		try{
			const db = req.app.locals.db;
			var collection = db.collection('notificationCollection');
			
			collection.insert({ sender: ObjectId(sender), receiver:ObjectId(receiver), type:type, content:content ,is_read:false,created_dt:new Date()}, function (err, docsInserted) {
				if (err) {
					console.log('addedNotification fail', err);
					return callback(err);

				}
				else {
					
					console.log(docsInserted.ops[0]._id);
					return callback(docsInserted.ops[0]._id);
				}
			});

		}
		catch{

		}
	}
	
	router.post('/followUser', isLoggedIn, function (req, res) {
		try {
			console.log(req);
			var profileIdFollower = req.body['followerProfileId'];
			var profileIdFollowing = req.body['followingProfileId'];
			var user = req.body['username'];

			const db = req.app.locals.db;
			var collection = db.collection('profileCollection');


			//check followers profile
			var cursorArray = collection.find({ _id: ObjectId(profileIdFollower) }).toArray(function (err, items) {
				var followerProfile = items[0];
				if (followerProfile.followingArray == null) {
					followerProfile.followingArray = [];
					followerProfile.followingArray.push({ _id: profileIdFollowing });
				}
				else if(typeof followerProfile.followingArray == 'string') {
					followerProfile.followingArray = JSON.parse(followerProfile.followingArray);
					followerProfile.followingArray.push({ _id: profileIdFollowing });
				}
				else{
					followerProfile.followingArray.push({ _id: profileIdFollowing });
				}

				var followingArrString = JSON.stringify(followerProfile.followingArray);
				if(followingArrString == "[]"){
					followingArrString = "";
				}
				collection.update({ _id: ObjectId(profileIdFollower) }, { $set: { followingArray: followingArrString } }, { upsert: true }, function (err, db) {
					if (err) {
						console.log('following failed', err);
					}

				});
			});

			var cursorArray = collection.find({ _id: ObjectId(profileIdFollowing) }).toArray(function (err, items) {
 
				if (err) {
					console.log('follower failed', err);
				}

				var followingProfile =  items[0];
				if (followingProfile.followerArray == null) {
					followingProfile.followerArray = [];
					followingProfile.followerArray.push({ _id: profileIdFollower })
				}
				else if(typeof followingProfile.followerArray == 'string') {
					followingProfile.followerArray = JSON.parse(followingProfile.followerArray);
					if(typeof followingProfile.followerArray.push == 'function'){
						followingProfile.followerArray.push({ _id: profileIdFollower })
					}
				}
				else{
					followingProfile.followerArray.push({ _id: profileIdFollower })
				}
				var followerArrString = JSON.stringify(followingProfile.followerArray);
				if(followerArrString == "[]"){
					followerArrString = "";
				}
				collection.update({ _id: ObjectId(profileIdFollowing) }, { $set: { followerArray: followerArrString } }, { upsert: true }, function (err, db) {
					if (err) {
						console.log('follower failed', err);
						res.send("err")
					}
					else {
						//pushNotification
						var notification = pushNotificationProfile(req,profileIdFollower,profileIdFollowing,'follow','you have a new follower!',function(response){
							res.send({message: "success", notification:response});
						})
					}
				});
			});

			if (err) {
				console.log('error 500');
				res.status(500).send('error retreiving data');
			}


		}
		catch {

		}
	});

	router.post('/getFollowers', function (req, res) {
		try {
			var ids = req.body['userIds'];

			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			var usersCollection = db.collection('users');

			
			var oids = [];
			ids.forEach(function (item) {
				oids.push(new ObjectId(item._id));
			});
			
			var cursorArray = collection.find({ _id: { $in: oids } }).toArray(function (err, items) {
				if (err) {
					console.log('error 500');
					res.status(500).send('error retreiving data');
				}
				console.log('ITEMS');
				console.log(items);
				res.send(items);
			});
		}
		catch {

		}
	});

	router.post('/getFollowings', function (req, res) {
		try {
			var ids = req.body['userIds'];

			const db = req.app.locals.db;

			var collection = db.collection('profileCollection');
			var usersCollection = db.collection('users');

			var oids = [];
			ids.forEach(function (item) {
				oids.push(new ObjectId(item._id));
			});

			var cursorArray = collection.find({ _id: { $in: oids } }).toArray(function (err, items) {
				if (err) {
					console.log('error 500');
					res.status(500).send('error retreiving data');
				}
				console.log('ITEMS');
				console.log(items);
				res.send(items);
			});
		}
		catch {

		}
	});


	router.get('/getNotificationsUserProfile/:id', function (req, res, next) {
		try {
			const db = req.app.locals.db;
			var id = req.params.id;
			console.log('Getting the notification for')
			console.log(id);
			//	const id = new ObjectID(req.params.id);

			const info = db.collection('notificationCollection').find({ receiver: ObjectId(id) }).toArray(function (err, items) {
				if (err) {
					res.status(500).send('error retreiving data');
				}
				//console.log('ITEMS');
				//console.log(items);
				res.send(items);
			});


		}
		catch (e) {
			var e = e;
		}
	});





};