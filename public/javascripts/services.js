/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myApp.service('ProfileService', ['$http', function ($http) {
	this.getProfileInfo = function (username) {
	    return $http.get('/getProfileInfo/' + username)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Retreived profile data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
			return "no data";
		    });
	};
	this.getTopUsers = function (period) {
	    return $http.get('/getTopUsers/' + period)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Retreived top user data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
			return "no data";
		    });
	};

	this.postBannerImage = function (username, bannerImageJson) {
	    console.log('posting banner image data');
	    console.log(bannerImageJson);
	    var req = {
		method: 'POST',
		url: '/postBannerImage/' + username,
		headers: {
		    'Content-Type': "application/json"
		},
		data: {bannerImageJson: bannerImageJson
		}
	    };

	    return $http(req)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Posted banner image data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t upload image right now, please try again later');
			return "no data";
		    });
	}

	this.postProfileImage = function (username, profileImageJson) {
	    console.log('posting banner image data');
	    console.log(profileImageJson);
	    var req = {
		method: 'POST',
		url: '/postProfileImage/' + username,
		headers: {
		    'Content-Type': "application/json"
		},
		data: {profileImageJson: profileImageJson
		}
	    };

	    return $http(req)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Posted profileImageJson image data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t upload image right now, please try again later');
			return "no data";
		    });
	}
	this.postProfileMetaData = function (username, profileMetaDataJson) {
	    console.log('posting profileMetaDataJson data');
	    console.log(profileMetaDataJson);
	    var req = {
		method: 'POST',
		url: '/postProfileMetaData/' + username,
		headers: {
		    'Content-Type': "application/json"
		},
		data: {profileMetaDataJson: profileMetaDataJson
		}
	    };

	    return $http(req)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Posted profileImageJson image data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t upload image right now, please try again later');
			return "no data";
		    });
	}
	this.postTotalPoints = function (username, totalpoints) {
	    console.log('posting postTotalPoints data');
	    console.log(totalpoints);
	    var req = {
		method: 'POST',
		url: '/postProfilePoints/' + username,
		headers: {
		    'Content-Type': "application/json"
		},
		data: {totalpoints: totalpoints
		}
	    };

	    return $http(req)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Posted profileImageJson image data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t upload image right now, please try again later');
			return "no data";
		    });
	}
	this.getTipsSubmitted = function (username) {
	    return $http.get('/getTips/' + username)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Retreived profile tips submitted data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
			return "no data";
		    });
	};
	//
	this.getTipsByJsonArray = function (tipArray) {
	    console.log('gettingTipsByJsonArray');
	    console.log(tipArray);
	    var req = {
		method: 'POST',
		url: '/getTipsByArray',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {tipArray: tipArray
		}
	    };

	    return $http(req)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Retreived profile tips submitted data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
			return "no data";
		    });
	};

	this.getRecentTips = function () {
	    console.log('gettingRecentTips');
	    var req = {
		method: 'POST',
		url: '/getRecentTips',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {
		}
	    };


	    return $http(req)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Retreived recent tips data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
			return "no data";
		    });
	};
	this.getTopTips = function () {
	    console.log('gettingTopTips');
	    var req = {
		method: 'POST',
		url: '/getTopTips',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {
		}
	    };


	    return $http(req)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});
			console.log("Retreived profile tips submitted data");
			console.log(data);
			return data;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
			return "no data";
		    });
	};

    }]);

myApp.service('CommentsService', ['$http', function ($http) {
	this.getComments = function () {
	    return $http.get('/getComments/')
		    .then(function (data) {
			//console.log(data);
			angular.forEach(data, function (item) {
			    item.datePublished = new Date(item.datePublished);
			});
			this.commentData = data;
			return this.commentData;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the comments right now, please try again later');
			return "no data";
		    });
	};
	this.getCommentsWithTipId = function (tipId) {
	    return $http.get('/getComments/' + tipId)
		    .then(function (data) {
			//console.log(data);
			angular.forEach(data, function (item) {
			    item.datePublished = new Date(item.datePublished);
			});
			this.commentData = data;
			return this.commentData;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the comments right now, please try again later');
			return "no data";
		    });
	};
	this.commentData = [];
    }]);


myApp.service('TipsService', ['$http', function ($http) {
	this.getTips = function (username) {
	    return $http.get('/getTips/' + username)
		    .then(function (data) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//   item.datePublished = new Date(item.datePublished);
			//});
			this.commentData = data;
			return this.commentData;
		    })
		    .catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the comments right now, please try again later');
			return "no data";
		    });
	};
    }]);