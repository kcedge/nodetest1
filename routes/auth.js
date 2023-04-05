var express = require('express');

var router = express.Router();

var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

var ObjectId = require('mongodb').ObjectID;

var mongoUtil = require('../mongoUtil');



function updateEmailOnUser(req, email, id) {
    try {
        const db = req.app.locals.db;

        var collection = db.collection('users');

        collection.update({ _id: ObjectId(id) }, { $set: { email: email } }, { upsert: false }, function (err, db) {
            if (err) {
                console.log('Unable to update user email', err);
                return;
            }
            else {
                return;//updated
            }
        });

    }
    catch (e) {
        console.log(e);

    }

}

function createProfileForUser(req, userId) {
    try {
        const db = req.app.locals.db;

        var collection = db.collection('profileCollection');

        collection.insert({ userId: userId }, function (err, docsInserted) {
            if (err) {
                console.log('Unable to add create profile', err);
                return;
            }
            else {
                console.log(docsInserted.ops[0]._id);
                return;
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}

function grabGoogleUser(userId, issuer, profile,cb) {
    try {
        var db = mongoUtil.getDb();

        var collection = db.collection('users');
        collection.find({user_id: ObjectId(userId)},function(err, item){
            if(err){
                return cb(err);
            }
            //console.log(docsInserted);
            var user = {
                id: ObjectId(userId).toString(),
                username: profile.displayName
            };

            return cb(null, user)
        })
 
    }
    catch (e) {
        console.log(e);
    }
}


function createProfileForGoogleUser(issuer, profile,cb) {
    try {
        var db = mongoUtil.getDb();

        var collection = db.collection('users');
        var objToInsert = {name: profile.displayName};
        collection.insert(objToInsert,function(err, docsInserted){
            if(err){
                return cb(err);
            }
            console.log(docsInserted);
            var id = objToInsert._id;
            //insert federated data
            var collection = db.collection('federated_credentials');

            collection.insert({ user_id:  id, provider: issuer, subject: profile.id }, function (err, docsInserted) {
                if (err) {
                    console.log('Unable to add create profile', err);
                    return cb(err);
                }
                else {
                    console.log(docsInserted.ops[0]._id);
                    var user = {
                        id: ObjectId(id).toString(),
                        name: profile.displayName
                    };
                    return cb(null, user);
                }
            });

        })



      
    }
    catch (e) {
        console.log(e);
    }
}

//process the signup form
router.post('/signUp', passport.authenticate('local-signup', {// redirect to the secure profile section
    failureRedirect: '/signUp', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}), function (req, res) {

    //create profile entity with forign key.

    var userId = req.user.id;
    //update email if there
    if (req.body.email != '') {
        updateEmailOnUser(req, req.body.email, req.user.id);
    }

    createProfileForUser(req, req.user.id);



    console.log("Sign up success redirecting to " + req.body['redirect']);
    res.redirect('/' + req.body['redirect']);
});




router.get('/login/federated/google', passport.authenticate('google'));

passport.use(new GoogleStrategy({
    clientID: '14072704931-t3airv9cjge19gns43tj0saa72kp89f0.apps.googleusercontent.com',
    clientSecret: 'GQZkP2gc_Zd4k9Jr_LEGmzoB',
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile']
}, function verify(issuer, profile, cb) {
    try {
        var db = mongoUtil.getDb();
        var name = profile.displayName;
        var collection = db.collection('federated_credentials');
        collection.find({ provider: issuer, subject: profile.id }).toArray(function (err, item) {
            if (err) {
                console.log('error', err);
            }
            else {
                var x = profile;
                if (item.length > 0) {
                    var userId = item[0].user_id;

                    console.log('found user', name);

                    grabGoogleUser(userId, issuer, profile, cb);
                    
                }
                else {
                    
                    console.log('user not found', err);

                    //insert into user/fedederated creds to create the google profile user
                    createProfileForGoogleUser(issuer, profile, cb);

                   // return cb(null, user);
                }
            }
        });

    }
    catch (e) {
        console.log(e);
    }

}));


router.get('/oauth2/redirect/google', passport.authenticate('google', {
  //  successRedirect: '/tipLib',
    failureRedirect: '/signUp'
}),function (req, res) {
    var db = mongoUtil.getDb();

    var collection = db.collection('tipsCollection');
	var cursor;

	cursor = collection.find();
	res.render('tipLib', { title: 'Tip Library', dbCursor: cursor });
});

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = router;