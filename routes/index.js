var express = require('express');
var router = express.Router();
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/tipsDb';


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Casey CrazyLegs Chromatic Wheel'});
});
router.get('/index', function (req, res, next) {
    res.render('index', {title: 'Casey CrazyLegs Chromatic Wheel'});
});
/* GET Hello World page. */
router.get('/helloworld', function (req, res) {
    res.render('helloworld', {title: 'Hello, World!'});
});
/* GET Hello World page. */
router.get('/tipsPage', function (req, res) {
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

	}
    });
    res.render('tipsPage', {title: 'Music Production Tips', dbCursor: cursor});
});
router.get('/tipsPageGet', function (req, res) {


    MongoClient.connect(url, function (err, db) {
	if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
	    //HURRAY!! We are connected. :)
	    console.log('Connection established to', url);

	    // do some work here with the database.
	    // Get the documents collection
	    //var TipsCollection = db.collection('tipsCollection');

	    var itemsTest;
	    var cursorArray = db.collection('tipsCollection').find().toArray(function(err,items){
		 console.log("items");
		 res.send(items);
		
	    });

	   
	    
//	    res.send(cursor.toArray(function (err, cursor) {
//		if (err) {
//		    console.log('Error getting data from collection')
//		}
//		else {
//		    console.log('Complete')
//		}
//	    }
	    
	}
    });

});
router.post('/tipsPagePost', function (req, res) {

    console.log(req);
    console.log("HERE");
    var tipTitle = req.body['tipTitle'];
    var tipDesc = req.body['tipDesc'];
    console.log(tipDesc);
    MongoClient.connect(url, function (err, db) {
	if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
	    //HURRAY!! We are connected. :)
	    console.log('Connection established to', url);

	    // do some work here with the database.
	    // Get the documents collection
	    var collection = db.collection('tipsCollection');
	    collection.insert({tipTitle: tipTitle, tipDesc: tipDesc}, function (err, db) {
		res.send('Tip successfuly submitted');
	    });

	}
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
	    collection.remove({_id:new mongodb.ObjectID(tipId)}, function (err, db) {
		res.send('Tip successfuly removed');
	    });

	}
    });

});
module.exports = router;
