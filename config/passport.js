// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
//var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var SoundCloudTokenStrategy = require('passport-soundcloud-token');

//var db = require('./db');

// load up the user model
var User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //bearer

    passport.use(new BearerStrategy(
        function (token, done) {
            User.findOne({ 'bearer.token': token }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

    //google sign in 


    //  //SOUND CLOUD SIGN UP
    //  passport.use(new SoundCloudTokenStrategy({
    //	clientID: SOUND_CLOUD_CLIENT_ID,
    //	clientSecret: SOUND_CLOUD_CLIENT_SECRET,
    //	passReqToCallback: true
    //  }, function (req, accessToken, refreshToken, profile, next) {
    //	User.findOrCreate({'soundcloud.id': profile.id}, function (error, user) {
    //	    return next(error, user);
    //	});
    //  }));
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password
        usernameField: 'username',
        //emailField    : 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            console.log("SIGN UP INDVIDUAL")
            console.log(username);
            //console.log(email);
            console.log(password);

            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists

                User.findOne({ 'local.username': username }).then(function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        console.log(user);
                        return done(null, false, req.flash('signupMessage', 'Username already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.local.username = username;
                        //newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save the user
                        newUser.save().then(function (err) {
                            
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) { // callback with email and password from our form
            console.log("SIGN IN INDVIDUAL")
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.username': username }).then(function (user) {
              
                // if no user is found, return the message
                if (!user) {
                    console.log('No user found');
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (!user.validPassword(password)) {
                    console.log('Wrong password');
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }
                // all is well, return successful user
                return done(null, user);
            });

        }));

};