
var express = require('express');
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

jade.fromSource('/views/profile.jade', opts, function(err, html) {
  console.log("//** Compiler Output **//");
  console.log(err);
  console.log(html);
});

jade.fromFile('/views/profile.jade', opts, function (err, html) {
    console.log("//** Compiler Output 2 **//");
    console.log(err);

    console.log(html);
});


var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');

var mongoose = require('mongoose');
// New Code
var mongo = require('mongodb');
var monk = require('monk');

var dbConfig = require('./config/configDb');
console.log("db Config");
console.log(dbConfig.dbSettings());
var runningProduction = dbConfig.dbSettings().runningProd;
var url = dbConfig.dbSettings().url;

//Set global root path
global.appRoot = path.resolve(__dirname);

var db = monk(url);
mongoose.connect(url); 

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







module.exports = app;