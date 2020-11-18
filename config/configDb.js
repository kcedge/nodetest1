/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var exports = module.exports = {};
// Functions which will be available to external callers
module.exports = {dbSettings: function () {
	//CHANGE THIS TO RUN LOCAL OR PRODUCTION DB
	var runningProd = false;
	var url = "";
	if (runningProd) {
	   // url = "mongodb://mphelperDbUser:mphelper91!@ec2-54-174-236-80.compute-1.amazonaws.com:27017/mphelperDb"
	   url = "mongodb://mphelperDbUser:mphelper91!@ec2-54-174-236-80.compute-1.amazonaws.com:27017/mphelperDb";
	}
	else {
	    url = "mongodb://127.0.0.1:27017/tipsDb"
	}

	return {
	    runningProd: runningProd,
	    url: url
	}
    }
};


