
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//JADE COMPILER
var jade = require('jade-compiler');
var opts = {
  pretty: true
};

// jade.fromSource('/views/profile.jade', opts, function(err, html) {
//   console.log("//** Compiler Output **//");
//   console.log(err);
//   console.log(html);
// });

// jade.fromFile('/views/profile.jade', opts, function (err, html) {
//     console.log("//** Compiler Output 2 **//");
//     console.log(err);

//     console.log(html);
// });


var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');


var flash    = require('connect-flash');
//session store
var mongoose = require('mongoose');

// Just add bluebird to your package.json, and then the following line should work
mongoose.Promise = require('bluebird');

// New Code
var mongo = require('mongodb');

var dbConfig = require('./config/configDb');
console.log("db Config");
console.log(dbConfig.dbSettings());
var runningProduction = dbConfig.dbSettings().runningProd;
var url = dbConfig.dbSettings().url;

//Set global root path
global.appRoot = path.resolve(__dirname);

//var db = monk(url);
//mongoose connection
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}); 
var db = mongoose.connection;

var app = express();

app.set('runningProd',runningProduction);
app.set('dbUrl',url);


// view engine setup
app.set('views',[__dirname + '/views']);
console.log("VIEWS");
console.log(app.get('views'));

app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/scriptsRoute',express.static(__dirname + '/node_modules/ng-country-select/dist/'));
app.use('/scriptsFlagRoute',express.static(__dirname + '/node_modules/flag-icons/css/'));
app.use('/scriptsFlagIcons',express.static(__dirname + '/node_modules/flag-icons/flags'));

app.use('/bootStrapIcons',express.static(__dirname + '/node_modules/bootstrap-icons/font'));


app.use('/publicResources',express.static(__dirname + '/public/resources'));


/*var routes = require('./routes/index');
var users = require('./routes/users');
var images = require('./routes/images');
var profile = require('./routes/profile');
var tips = require('./routes/tips');
var comments = require('./routes/comments');
var sampleLib = require('./routes/sampleLibRoutes');*/


require('./routes/index')(app,passport);
require('./routes/comments')(app,passport);
require('./routes/profile')(app,passport);
require('./routes/sampleLibRoutes')(app,passport);

//require('./routes/auth')(app,passport);
var authRouter = require('./routes/auth');
app.use('/', authRouter);


require('./config/passport')(passport); // pass passport for configuration

//
// required for passport

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
/*app.use('/', routes);
app.use('/users.js', users);
app.use('/images.js', images);
app.use('/profile.js', profile);
app.use('/tips.js', tips);
app.use('/comments.js', comments);
app.use('/sampleLibRoutes.js', sampleLib);*/
//require('./routes/index.js')(app, passport); // load our routes and pass in our app and fully configured passport

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




var mongodb = require('mongodb');

var path = require('path');
var dbConfig = require(appRoot + '/config/configDb');
var runningProduction = dbConfig.dbSettings().runningProd;
var url = dbConfig.dbSettings().url;
var MongoClient = mongodb.MongoClient;


// var mongoUtil = require( './mongoUtil' );
// mongoUtil.connectToServer(app, function( err, client ) {
//   if (err) console.log(err);
//   // start the rest of your app here
// } );

// // Create a MongoDB connection pool and start the application
// // after the database connection is ready
// MongoClient.connect(url, { promiseLibrary: Promise }, (err, client) => {
//   if (err) {
//     logger.warn(`Failed to connect to the database. ${err.stack}`);
//   }
//   app.locals.db = client.db('krazyl3gzDb');

//   app.listen('28017', () => {
//     //logger.info(`Node.js app is listening at http://localhost:28017`);
//   });
 
// });


var SQLiteStore = require('connect-sqlite3')(session);


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: app.locals.db })
}));
app.use(passport.authenticate('session'));



module.exports = app;