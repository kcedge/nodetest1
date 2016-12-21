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
	    url = "mongodb://kcedge3:Golions91!@ec2-54-218-53-245.us-west-2.compute.amazonaws.com:27017/dummyDb"
	}
	else {
	    url = "mongodb://localhost:27017/tipsDb"
	}

	return {
	    runningProd: runningProd,
	    url: url
	}
    }
};


