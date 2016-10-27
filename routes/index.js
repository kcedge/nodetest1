var express = require('express');
var router = express.Router();
var fs = require('fs');
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
//var url = 'mongodb://localhost:27017/tipsDb';
var url = 'mongodb://kcedge3:Golions91!@ec2-54-218-53-245.us-west-2.compute.amazonaws.com:27017/dummyDb'


//For storing images in the file system
var multer = require('multer');
var upload = multer({dest: '../public/resources/images'})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Casey CrazyLegs Chromatic Wheel'});
});
router.get('/index', function (req, res, next) {
    res.render('index', {title: 'Casey CrazyLegs Chromatic Wheel'});
});
/* GET About page. */
router.get('/about', function (req, res) {
    res.render('about', {title: 'About This'});
});
/* GET Samples page. */
router.get('/samplesPage', function (req, res) {
    res.render('samplesPage', {title: 'Free Samples!'});
});
router.get('/signIn', function (req, res) {
    res.render('signIn', {title: 'Sign In'});
});
router.get('/signUp', function (req, res) {
    res.render('signUp', {title: 'Sign Up'});
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

    console.log("tipsPagePost");
    var tipTitle = req.body['tipTitle'];
    var tipDesc = req.body['tipDesc'];
    var genreJson = req.body['genreJson'];
    var tipTypeJson = req.body['tipTypeJson'];
    var vstJson = req.body['vstJson'];
    var dawJson = req.body['dawJson'];
    var imageDataJson = req.body['imageDataJson'];
    var videoLinkJson = req.body['videoLinkJson'];

    console.log(tipDesc);
    console.log(genreJson);
    console.log(tipTypeJson);
    console.log(vstJson);
    console.log(dawJson);
    console.log(imageDataJson);
    console.log(videoLinkJson);

    MongoClient.connect(url, function (err, db) {
	if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
	    //HURRAY!! We are connected. :)
	    console.log('Connection established to', url);

	    // do some work here with the database.
	    // Get the documents collection
	    var collection = db.collection('tipsCollection');
	    collection.insert({tipTitle: tipTitle, tipDesc: tipDesc, genreJson: genreJson, tipTypeJson: tipTypeJson, vstJson: vstJson, dawJson: dawJson, imageDataJson: imageDataJson, videoLinkJson: videoLinkJson}, function (err, db) {
		if (err) {
		    console.log('Unable to add tip to tipsCollection', err);
		    res.send('Tip upload failed');
		}
		else {
		    res.send('Tip successfuly submitted');
		}
	    });

	}
    });

});
router.post('/uploadImage', upload.single('file'), function (req, res) {

    console.log("Server: got file ");
    console.log(req.body);
    console.log(req.file);
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
		    res.send(req.file.filename);
		}
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
	    collection.remove({_id: new mongodb.ObjectID(tipId)}, function (err, db) {
		res.send('Tip successfuly removed');
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

module.exports = router;
