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

	router.get('/getComments/:id', function (req, res, next) {
		try {
			var tipId = req.params.id;
			console.log('Getting the comments for')
			console.log(tipId);
			const db = req.app.locals.db;

			// do some work here with the database.
			// Get the documents collection
			var collection = db.collection('commentCollection');
			if (collection.find({ tip_id: tipId })) {
				var cursorArray = collection.find({ tip_id: tipId }).toArray(function (err, items) {
					if (err) {
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
	router.get('/getComments/', function (req, res, next) {
		try {
			var tipId = req.params.id;
			console.log('Getting the comments for')
			console.log(tipId);
			const db = req.app.locals.db;
			var collection = db.collection('commentCollection');
			if (collection.find({ tip_id: tipId })) {
				var cursorArray = collection.find({}).toArray(function (err, items) {
					if (err) {
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
		catch (e) {

		}
	});
	router.post('/postComment', function (req, res) {
		try{
			console.log("postComment Post");
			var username = req.body['username'];
			var comment = req.body['comment'];
			var tip_id = req.body['tip_id'];
			var datePublished = req.body['date_published']
			var commentPoints = req.body['commentPoints']
			var parentComment_id = req.body['parentComment_id'];
			console.log(username);
			console.log(comment);
			console.log(tip_id);
			const db = req.app.locals.db;


			var collection = db.collection('commentCollection');
			collection.insert({ username: username, comment: comment, tip_id: tip_id, datePublished: datePublished, commentPoints: commentPoints, parentComment_id: parentComment_id }, function (err, db) {
				if (err) {
					console.log('Unable to add comment to commentCollection', err);
					res.send('Comment was unable to submit');
				}
				else {
					console.log('comment submit success')
					res.send('comment submit success');
				}
			});
	
		}
		catch{

		}

	});

	router.put('/commentUpdatePoints', function (req, res) {
		try{
			console.log("tipsPage Update Points")
			var commentId = req.body['commentId'];
			var commentPoints = req.body['commentPoints'];
			console.log(req);
			const db = req.app.locals.db;

			var collection = db.collection('commentCollection');
				collection.update({ _id: ObjectId(commentId) }, { $set: { commentPoints: commentPoints } }, { upsert: true }, function (err, db) {
					if (err) {
						console.log('Unable to edit tip to tipsCollection', err);
						res.send(commentPoints);
					}
					else {
						res.send('comment edit successful');
					}
				});
		}
		catch{

		}
	

	})
}