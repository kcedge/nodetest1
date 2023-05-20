/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


myApp.service('ProfileService', ['$http', '$q', function ($http, $q) {
	var vm = this;
	vm.user = {};
	vm.user.userName = '';
	vm.user.userType = '';

	vm.showPopUp = false;
	vm.popUpDismissed = false;

	vm.userReturned = false;

	vm.profileImagesArray = [];

	this.getProfileImages = function () {
		return vm.profileImagesArray;
	}
	this.setImages = function (images) {
		vm.profileImages = images;
	}
	this.getProfileImagesByType = function (type) {
		var profileImages = [];
		if (type == 'profilePicture') {
			if (vm.user && vm.user.profileDetails.length > 0 && vm.user.profileDetails[0].profileImageJson != null) {
				var json = vm.user.profileDetails[0].profileImageJson;
				if (typeof json == "string") {
					vm.user.profileDetails[0].profileImages = JSON.parse(json);
					vm.profileImagesArray = vm.user.profileDetails[0].profileImages;
					if (type) {
						var profileImages = vm.user.profileDetails[0].profileImages.filter(obj => {
							return (obj.imageType === type);
						});
					}
					else {
						var profileImages = vm.user.profileDetails[0].profileImages;
					}
					
					return profileImages;
				}
				else if (typeof json === "object") {
					profileImages.push(json);

					return profileImages;

				}
			}
		}
		else if (type == 'profileBanner') {
			if (vm.user && vm.user.profileDetails.length > 0 && vm.user.profileDetails[0].profileBannerImageJson != null) {
				var json = vm.user.profileDetails[0].profileBannerImageJson;
				if (typeof json == "string") {
					vm.user.profileDetails[0].profileImages = JSON.parse(json);
					vm.profileImagesArray = vm.user.profileDetails[0].profileImages;
					if (type) {
						var profileImages = vm.user.profileDetails[0].profileImages.filter(obj => {
							return (obj.imageType === type);
						});
					}
					else {
						var profileImages = vm.user.profileDetails[0].profileImages;
					}
					return profileImages;
				}
				else if (typeof json === "object") {
					profileImages.push(json);

					return profileImages;

				}
			}
		}

		return [];
	}






	this.isLoggedIn = function () {
		if (vm.user != null && vm.user._id) {
			return true;
		}
		else {
			return false
		}
	}

	this.isAuthenticated = function (callback) {
		let deffered = $q.defer();

		var callback = callback;
		this.authenticated().then(function (response) {
			var authenticatedResp = response;
			if (response.data && response.data.id) {
				vm.getUserProfile(response.data.id).then(function (response) {
					deffered.resolve(callback(response));

				});
			}
			else {
				deffered.resolve(callback('authentication failed'));
			}
		});

		return deffered.promise;
	};

	this.authenticated = function () {
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
	function setUserName(user) {
		if (user.username == null) {
			if (user.profileDetails.length > 0 && user.profileDetails[0].username) {
				var userDetails = user.profileDetails[0];
				user.username = userDetails.username;
			}
		}

	}

	var digestUserLinks = function(data){
		if(data.links){
			for(var i = 0; i < data.links.length;i++){
				if(data.links[i].userLinkTypeSelected == null){
					data.links[i].iconImg = 'http.png';
				}
				else{
					if(data.links[i].userLinkTypeSelected == "Soundcloud"){
						data.links[i].iconImg = 'soundcloud.png';

					}
					else if(data.links[i].userLinkTypeSelected == "Twitter"){
						data.links[i].iconImg = 'twitter.png';

					}
					else if(data.links[i].userLinkTypeSelected == "Tik Tok"){
						data.links[i].iconImg = 'tiktok.png';

					}
					else if(data.links[i].userLinkTypeSelected == "Facebook"){
						data.links[i].iconImg = 'facebook2.png';

					}
					else if(data.links[i].userLinkTypeSelected == "Other"){
						data.links[i].iconImg = 'http.png';

					}
				}
			}
		}
	}

	this.getProfileInterests = function () {
		if (vm.user.profileDetails[0].interests != null && typeof vm.user.profileDetails[0].interests != 'string') {

			return vm.user.profileDetails[0].interests;
		}
		if (typeof vm.user.profileDetails[0].interests == 'string') {
			return JSON.parse(vm.user.profileDetails[0].interests);
		}
		else {
			return [];
		}
	}
	this.getProfileRoles = function () {
		if (vm.user.profileDetails[0].roles != null && typeof vm.user.profileDetails[0].roles != 'string') {
			return vm.user.profileDetails[0].roles;
		}
		else if (typeof vm.user.profileDetails[0].roles == 'string') {
			return JSON.parse(vm.user.profileDetails[0].roles);
		}
		else {
			return [{ text: "General", type: "General", iconImg: "icons8-wwi-german-helmet-50.png" }, { text: "Reader", type: "General", bootStrapIcon: "book" }];
		}
	}

	var processUserJsonData = function (user) {
		if (user.profileDetails[0].roles) {
			user.profileDetails[0].roles = JSON.parse(user.profileDetails[0].roles);
		}
		if (user.profileDetails[0].interests) {
			user.profileDetails[0].interests = JSON.parse(user.profileDetails[0].interests);
		}
		if (user.profileDetails[0].links) {
			user.profileDetails[0].links = JSON.parse(user.profileDetails[0].links);
		}
		if (user.profileDetails[0].followingArray) {
			user.profileDetails[0].followingArray = JSON.parse(user.profileDetails[0].followingArray);
		}
		if (user.profileDetails[0].followerArray) {
			user.profileDetails[0].followerArray = JSON.parse(user.profileDetails[0].followerArray);
		}
		return user;
	};

	this.getFollowers = function (userProfile) {
		let deffered = $q.defer();

		var userIds = userProfile.followerArray;
		var getFollowers = true;
		if (typeof userIds == 'undefined') {
			getFollowers = false;
			userIds = [{}];
		}

		if (getFollowers) {
			var req = {
				method: 'POST',
				url: '/getFollowers',
				headers: {
					'Content-Type': "application/json"
				},
				data: {
					userIds: userIds
				}
			}
			$http(req).then(function success(response) {
				vm.user.followers = response.data;
				for(var i = 0; i < vm.user.followers.length;i++){
					vm.user.followers[i] = vm.processUserData( vm.user.followers[i])
				}


				deffered.resolve(vm.user.followers);
			});
		}
		else {
			deffered.resolve(null);
		}
		return deffered.promise;


	}

	this.getFollowing = function (userProfile) {
		let deffered = $q.defer();
		var userIds = userProfile.followingArray;
		var getFollowing = true;
		if (typeof userIds == 'undefined') {
			getFollowing = false;
			userIds = [{}];
		}
		if (getFollowing) {
			var req = {
				method: 'POST',
				url: '/getFollowings',
				headers: {
					'Content-Type': "application/json"
				},
				data: {
					userIds: userIds
				}
			}
			$http(req).then(function success(response) {
				vm.user.followings = response.data;

				for(var i = 0; i < vm.user.followings.length;i++){
					vm.user.followings[i] = vm.processUserData( vm.user.followings[i])
				}

				deffered.resolve(vm.user.followings);


			});
		}
		else {
			deffered.resolve(null);
		}
		return deffered.promise;


	}

	this.getUserProfile = function (authenticated) {
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
				setUserName(vm.user);//set username in one spot

				vm.user = processUserJsonData(vm.user);
				if(vm.user.profileDetails[0].links.length > 0){
					digestUserLinks(vm.user.profileDetails[0]);
				}
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
			vm.user.username = user.local.username;
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
	vm.processUserData = function (data) {

		if (data.hasOwnProperty("profileBannerImageJson")) {
			data.profileBannerImageJson = JSON.parse(data.profileBannerImageJson);
		}
		if (data.hasOwnProperty("profileImageJson")) {
			data.profileImageJson = JSON.parse(data.profileImageJson);
		}
		if (data.hasOwnProperty("interests")) {
			data.interests = JSON.parse(data.interests);
		}
		if (data.hasOwnProperty("links")) {
			data.links = JSON.parse(data.links);
		}
		if (data.hasOwnProperty("followingArray")) {
			data.followingArray = JSON.parse(data.followingArray);
		}
		if (data.hasOwnProperty("followerArray")) {
			data.followerArray = JSON.parse(data.followerArray);
		}
		return data;

	};
	this.getProfileInfoByName = function (username) {
		let deffered = $q.defer();


		$http.get('/getProfileInfo/' + username)
			.then(function (response) {
				//console.log(data);
				//angular.forEach(data, function (item) {
				//    item.datePublished = new Date(item.datePublished);
				//});
				console.log("Retreived profile data");
				console.log(response);

				var data = vm.processUserData(response.data[0]);
				if(data.links!=null && data.links.length > 0){
					digestUserLinks(data);
				}

				deffered.resolve(data);

			})
			.catch(function (data, status) {
				console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
				deffered.resolve(data);
			});

		return deffered.promise;

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
	this.unfollowUser = function(followerUser, followingUser, username) {
		console.log('following user');
		let deffered = $q.defer();
		var req = {
			method: 'POST',
			url: '/unfollowUser',
			headers: {
				'Content-Type': "application/json"
			},
			data: {
				followerProfileId: followerUser.profileDetails[0]._id,
				followingProfileId: followingUser._id,
				username: followingUser.username
			}
		};

		$http(req)
			.then(function (data) {
				//console.log(data);
				//angular.forEach(data, function (item) {
				//    item.datePublished = new Date(item.datePublished);
				//});
				console.log("unfollowed");
				console.log(data);
				deffered.resolve(data);
				return data;
			})
			.catch(function (data, status) {
				console.log('ERROR: ' + status + 'please try again later');
				deffered.resolve(status);
				return "no data";
			});

		return deffered.promise;
	}
	this.followUser = function (followerUser, followingUser, username) {
		console.log('following user');
		let deffered = $q.defer();
		var req = {
			method: 'POST',
			url: '/followUser',
			headers: {
				'Content-Type': "application/json"
			},
			data: {
				followerProfileId: followerUser.profileDetails[0]._id,
				followingProfileId: followingUser._id,
				username: followingUser.username
			}
		};

		$http(req)
			.then(function (data) {
				//console.log(data);
				//angular.forEach(data, function (item) {
				//    item.datePublished = new Date(item.datePublished);
				//});
				console.log("followed");
				console.log(data);
				deffered.resolve(data);
				return data;
			})
			.catch(function (data, status) {
				console.log('ERROR: ' + status + 'please try again later');
				deffered.resolve(status);
				return "no data";
			});

		return deffered.promise;

	}
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

	this.postProfileImage = function (userId, profileImageJson) {
		console.log('posting banner image data');
		console.log(profileImageJson);
		var req = {
			method: 'POST',
			url: '/postProfileImage/',
			headers: {
				'Content-Type': "application/json"
			},
			data: {
				userId: userId,
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

				window.location.href = '/profile/editing'

					;
			})
			.catch(function (data, status) {
				console.log('ERROR: ' + status + '. We can\'t upload image right now, please try again later');
				return "no data";
			});
	}
	this.postBannerProfileImage = function (userId, profileBannerImageJson) {
		console.log('posting banner image data');
		console.log(profileBannerImageJson);
		var req = {
			method: 'POST',
			url: '/postBannerProfileImage/',
			headers: {
				'Content-Type': "application/json"
			},
			data: {
				userId: userId,
				profileBannerImageJson: profileBannerImageJson
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

				window.location.href = '/profile/editing'

					;
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

	vm.getUsersForUserManagement = function () {
		let deffered = $q.defer();
		console.log('getting users for user management');
		var req = {
			method: 'GET',
			url: '/getUsersForUserManagement',
			headers: {
				'Content-Type': "application/json"
			},
			data: {
			}
		}

		$http(req).then(function (data) {
			var data = data;
			deffered.resolve(data.data);
		});

		return deffered.promise;

	}
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

	//get file for right widget
	vm.rightWidgetHtml = "";
	vm.getTrendingWidgetFile = function(){		
		let deffered = $q.defer();
		var xhr= new XMLHttpRequest();
		xhr.open('GET', 'trendingWidget', true);
		xhr.onreadystatechange= function() {
		if (this.readyState!==4) return;
		if (this.status!==200) return; // or whatever error handling you want
			// document.getElementById('y').innerHTML= this.responseText;
			$('#trendingWidget').html(this.responseText);
			var html = this.responseText
			vm.rightWidgetHtml = html;
			deffered.resolve(html);
		
		};
		xhr.send();
		return deffered.promise;
	}

	vm.getTrendingWidgetHtml = function(){
		return vm.rightWidgetHtml;
	}



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


