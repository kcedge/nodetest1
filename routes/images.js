var express = require('express');
var fs = require('fs');
var http = require('http');
var url = require('url');

var router = express.Router();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

//DB CONFIG
var path = require('path');
var dbConfig = require(appRoot + '/config/configDb');
var runningProduction = dbConfig.dbSettings().runningProd;
var url = dbConfig.dbSettings().url;
//Local
//var url = 'mongodb://localhost:27017/tipsDb'
/* GET images page. */


module.exports = router;

