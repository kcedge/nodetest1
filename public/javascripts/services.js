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
	
	this.getTipsSubmitted = function (username){
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
	this.getTipsByJsonArray = function (tipArray){
	    console.log('gettingTipsByJsonArray');
	    console.log(tipArray);
	    var req = {
		method: 'POST',
		url: '/getTipsByArray',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {tipArray:tipArray
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