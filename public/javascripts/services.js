/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myApp.service('ProfileService', ['$http','$q', function ($http, $q) {
	var vm = this;
	vm.user = {};
	vm.user.userName = '';
	vm.user.userType = '';
	
	vm.showPopUp = false;
	vm.popUpDismissed = false;
	
	vm.userReturned = false;
	
	this.getShowPopUp = function(){
		return vm.showPopUp;
	}

	this.setShowPopUp = function(){
		if((vm.user.email == '' || vm.user.email == null) && !vm.popUpDismissed){
			vm.showPopUp = true;
		}
		else{
			vm.showPopUp = false;

		}
	}

	this.dismissClicked = function(){
		vm.popUpDismissed = true;
		vm.setShowPopUp();
	}


	this.isLoggedIn = function(){
		if(vm.user!=null &&vm.user._id){
			return true;
		}
		else{
			return false
		}
	}
	
	this.isAuthenticated = function(callback) {
		let deffered = $q.defer();

		var callback = callback;
		this.authenticated().then(function (response) {
			var authenticatedResp = response;
			if (response.data && response.data.id) {
				vm.getUserProfile(response.data.id).then(function (response) {
					deffered.resolve(callback(response));

				});
			}
			else{
				window.location.href = '/signUp';
			}
		});
	
		return deffered.promise;
	};

	this.authenticated = function(){
		let deffered = $q.defer();

		var req = {
			method: 'GET',
			url: '/authenticated',
			headers: {
				'Content-Type': "application/json"
			},
			data: {
			}
		}
		$http(req).then(function success(response) {
			deffered.resolve(response);

		
		});

		return deffered.promise;
	}

	this.getUserProfile = function(authenticated){
		let deffered = $q.defer();
		$http.get('/getUserProfile/' + authenticated)
		.then(function (response) {
			//console.log(data);
			//angular.forEach(data, function (item) {
			//    item.datePublished = new Date(item.datePublished);
			//});

			console.log("profile info gathered");
			console.log(response);
			//set local storage and make sure this.user/this.username is set.
			
			
			vm.user = response.data[0];//one result
			vm.setUserInfo(vm.user);

			//success, returning user
			vm.userReturned = true;

			vm.setShowPopUp();
			deffered.resolve(vm.user);
			return vm.user;
		})
		.catch(function (data, status) {
			console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
			deffered.response(data);

			return "no data";
		});

		return deffered.promise;

	}




	vm.setUserInfo = function (user) {
		if (user.local != undefined) {
			vm.user.userName = user.local.username;
			vm.user.userType = 'local';
		}

		vm.user = user;
	}

	this.getUserInfo = function () {
		return vm.user;
	}
	this.getUserName = function () {
		if (vm.user.userType == 'local') {
			vm.user.userName = user.local.username;
		}
		return vm.user.userName;

	}
	this.getUserType = function (user) {
		if (user.local != null) {
			return 'local';
		}
		else {
			return 'google';
		}
	}
	this.getProfileInfo = function (username) {


		return $http.get('/getProfileInfo/' + username)
			.then(function (data) {
				//console.log(data);
				//angular.forEach(data, function (item) {
				//    item.datePublished = new Date(item.datePublished);
				//});
				console.log("Retreived profile data");
				console.log(data);
				this.user.profileInfo = data;
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
				this.user.topUsers = data;

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
			data: {
				bannerImageJson: bannerImageJson
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
			data: {
				profileImageJson: profileImageJson
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
				window.href.location = '/profile'
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
			data: {
				profileMetaDataJson: profileMetaDataJson
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
				window.href.location = '/profile'

				return data;
			})
			.catch(function (data, status) {
				console.log('ERROR: ' + status + '. We can\'t upload image right now, please try again later');
				return "no data";
			});
	}
	this.postProfileDownloadedSamples = function (username, downloadedSamples) {
		console.log('posting downloadedSamples data');
		console.log(downloadedSamples);
		var req = {
			method: 'POST',
			url: '/postProfileDownloadedSamples/' + username,
			headers: {
				'Content-Type': "application/json"
			},
			data: {
				downloadedSamples: downloadedSamples
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
			data: {
				totalpoints: totalpoints
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
			data: {
				tipArray: tipArray
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

		//	this.getProfileSampleData = function (username) {
		//	    return $http.get('/getSampleProfileInfo/' + username)
		//		    .then(function (data) {
		//			//console.log(data);
		//			//angular.forEach(data, function (item) {
		//			//    item.datePublished = new Date(item.datePublished);
		//			//});
		//			console.log("Retreived profile data");
		//			console.log(data);
		//			return data;
		//		    })
		//		    .catch(function (data, status) {
		//			console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
		//			return "no data";
		//		    });
		//	};


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


