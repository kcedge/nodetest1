myApp.service('PopUpService', ['$http', '$q', 'FileUploader', 'ProfileService', function ($http, $q, FileUploader, ProfileService) {
	var vm = this;
	vm.uploadingPictureType = "";
	vm.showPopUp = false;

	

	vm.popUpDismissed = false;
	vm.popUpDismissedEmail = false;
	vm.popUpDismissedProfile = false;

	vm.currentPopUp = "";
	vm.currentPopUpIndex = 1;
	vm.currentPageIndex = 0;
	vm.popUpTypes = [
		{ name: "email", pages: [{ name: "email" }] }, 
		{ name: "profile", pages: [{ pageName: "profileInit" }, { pageName: "profileImgr" }, {pageName: "interests"}, {pageName: "profileLinks"}] },
		{ name : "tip", pages: [{pageName: "tipInit"},{pageName: "tipLocalVideo"}]}

	];
	
	
	vm.popUp = vm.popUpTypes[vm.currentPopUpIndex];

	vm.profileImages = [];
	// this.getPopUp = function(){
	// 	return vm.popUp;
	// }
	// this.setPopUp= function(){
	// 	vm.popUp = popUp;
	// }

	this.getApplicationInterests = function () {
		let deffered = $q.defer();
		$http.get('/getApplicationInterests/')
			.then(function (response) {
				//console.log(data);
				//angular.forEach(data, function (item) {
				//    item.datePublished = new Date(item.datePublished);
				//});
				console.log("Retreived interests");
				console.log(response);
				deffered.resolve(response.data.items);
			})
			.catch(function (data, status) {
				console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
				deffered.resolve(data);
			});
		return deffered.promise;
	};
	
	this.getApplicationRoles = function () {
		let deffered = $q.defer();
		$http.get('/getApplicationRoles/')
			.then(function (response) {
				//console.log(data);
				//angular.forEach(data, function (item) {
				//    item.datePublished = new Date(item.datePublished);
				//});
				console.log("Retreived roles");
				console.log(response);
				deffered.resolve(response.data.items);
			})
			.catch(function (data, status) {
				console.log('ERROR: ' + status + '. We can\'t get the profile right now, please try again later');
				deffered.resolve(data);
			});
		return deffered.promise;
	};
	this.getProfileImages = function(){
		return vm.profileImages;
	}

	this.getPageIndex = function(){
		return vm.currentPageIndex;
	}
	this.getPopUpIndex = function(){
		return vm.currentPopUpIndex;
	}
	this.getPopUpTypes= function(){
		return vm.popUpTypes;
	}
	this.setPage= function(index){
		vm.currentPageIndex = index;
	}
	this.getPage= function(){
		return vm.popUpTypes[vm.currentPopUpIndex].pages[vm.currentPageIndex].pageName;
	}
	this.setPopUp= function(index){
		vm.popUp =  vm.popUpTypes[index];

		vm.currentPopUpIndex = index;
	}
	this.getPopUp = function(){
		return vm.popUp;
	}

	this.showPage = function (pageName) {
		if(vm.popUpTypes[vm.currentPopUpIndex].pages.length > vm.currentPageIndex){
			var popUpPageName = vm.popUpTypes[vm.currentPopUpIndex].pages[vm.currentPageIndex].pageName;
			if (pageName == popUpPageName) {
				return true;
			}
			else {
				return false;
			}
		}
		else{
			vm.currentPageIndex = 0;
		}
	}

	this.setImageUploadingType = function (type) {
		vm.uploadingPictureType = type;
	}

	this.dismissClicked = function(popUpName){
		if(popUpName == 'email'){
			vm.popUpDismissedEmail = true;
		}
		if(popUpName == 'profile'){
			vm.popUpDismissedProfile = true;
		}
		this.setShowPopUp();
		return false;
	}
	
	this.openPopUp = function(popUpName){
		vm.showPopUp = true;
		vm.currentPopUp = popUpName;
		for(var a = 0; a < vm.popUpTypes.length;a++){
			if(vm.popUpTypes[a].name == popUpName){
				vm.currentPopUpIndex = a;
				break;
			}	
		}
		vm.popUp = vm.popUpTypes[vm.currentPopUpIndex];
		vm.currentPageIndex = 0;
	}

	this.openPopUp = function(popUpName, popUpPage){
		

		for(var a = 0; a < vm.popUpTypes.length;a++){
			if(vm.popUpTypes[a].name == popUpName){
				vm.currentPopUpIndex = a;
				break;
			}	
		}

		var popUpLength = vm.popUpTypes[vm.currentPopUpIndex].pages.length;
		for(var i =0; i < popUpLength; i++){
			if(vm.popUpTypes[vm.currentPopUpIndex].pages[i].pageName == popUpPage){
				vm.currentPageIndex = i;
				break;
			}
		}
		vm.popUp = vm.popUpTypes[vm.currentPopUpIndex];

		vm.showPopUp = true;
		vm.currentPopUp = popUpName;
		
	}

	this.getShowPopUp = function(popUpName){
		if(popUpName == vm.currentPopUp){



			return vm.showPopUp;
		}
		else{
			return false;
		}
	}

	this.getCurrentPopUp = function(){
		return vm.currentPopUp;
	}
	this.setShowPopUp = function(user){
		if(user){
			if((user.email == '' || user.email == null) && !vm.popUpDismissedEmail){
				vm.showPopUp = true;
				vm.currentPopUp = 'email';
			}
			// else if(user.profileDetails[0] == null){
			// 	vm.showPopUp = true;
			// 	vm.currentPopUp = 'profile';
			// }
			else if((user.profileDetails.length == 0 || user.profileDetails[0].bio == '') && !vm.popUpDismissedProfile){
				vm.showPopUp = true;
				vm.currentPopUp = 'profile';
			}
			else if(vm.popUpDismissed){
				vm.showPopUp = false;
				vm.currentPopUp = '';
			}
			else{
				vm.showPopUp = false;
				vm.currentPopUp = '';
			}
		}
		else{
			vm.showPopUp = false;
			vm.currentPopUp = '';
		}
		
	}


	vm.nextPage = function () {
		if (vm.currentPageIndex != vm.popUp.pages.length){
			vm.currentPageIndex++;
		}
	}
	vm.backPage = function () {
		if (vm.currentPageIndex != 0) {
			vm.currentPageIndex--;
		}
	}








	//PROFILE IMAGE LOADER
	var profileImageUploader = vm.profileImageUploader = new FileUploader({
		url: '/uploadImage'
	});

	
	vm.profileImageUploader.profileImagesUploaded = [];

	this.getProfileImageUploader = function () {
		return vm.profileImageUploader;
	}
	this.getProfileImagesUploaded = function () {
		return vm.profileImageUploader.profileImagesUploaded;
	}

	this.getProfileBannerImageUploader = function () {
		return vm.profileImageUploader;
	}
	this.getProfileImagesUploaded = function () {
		return vm.profileImageUploader.profileImagesUploaded;
	}

	// FILTERS

	profileImageUploader.filters.push({
		name: 'customFilter',
		fn: function (item /*{File|FileLikeObject}*/, options) {
			return this.queue.length < 2;
		}
	});

	profileImageUploader.filters.push({
		name: 'sizeFilter',
		fn: function (item /*{File|FileLikeObject}*/, options) {
			console.log(item);
			return item.size <= 10000000; a
		}
	});


	// CALLBACKS
	//vm.uploadedImages = [];
	//var numberOfImages = 0;

	profileImageUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
		vm.fileErrorMessage = "";
		if (filter.name = 'sizeFilter') {
			vm.fileErrorMessage = "File too big. Upload file limit 1 MB";
		}
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	profileImageUploader.onAfterAddingFile = function (fileItem) {
		vm.fileErrorMessage = "";
		console.info('onAfterAddingFile', fileItem);
	};
	profileImageUploader.onAfterAddingAll = function (addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	profileImageUploader.onBeforeUploadItem = function (item) {
		console.info('onBeforeUploadItem', item);
	};
	profileImageUploader.onProgressItem = function (fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	profileImageUploader.onProgressAll = function (progress) {
		console.info('onProgressAll', progress);
	};
	profileImageUploader.onSuccessItem = function (fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);

	};
	profileImageUploader.onErrorItem = function (fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	profileImageUploader.onCancelItem = function (fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
	};
	vm.profileImagesUploaded = [];
	profileImageUploader.onCompleteItem = function (fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);

		var imagePath = response;

		if (!runningProduction) {
			imagePath = "resources/images/" + response;
		}
		vm.profileImageUploader.profileImagesUploaded.push({ image: imagePath, isProfile: true, imageType: vm.uploadingPictureType });
		//$sc
		vm.profileImageUploader.queue = [];

		var images = vm.profileImageUploader.profileImagesUploaded;
		var previousImages = ProfileService.getProfileImagesByType('profilePicture');
	    var profileImageJson = JSON.stringify(previousImages.concat(images));

		var user = ProfileService.getUserInfo();

		ProfileService.postProfileImage(user._id, profileImageJson)

	};
	profileImageUploader.onCompleteAll = function () {
		console.info('onCompleteAll');
	};




	//BANNER UPLOADER
	//PROFILE IMAGE LOADER
	var profileBannerImageUploader = vm.profileBannerImageUploader = new FileUploader({
		url: '/uploadImage'
	});
	vm.profileBannerImageUploader.profileImagesUploaded = [];

	this.getProfileBannerImageUploader = function () {
		return vm.profileBannerImageUploader;
	}
	this.getProfileBannerImagesUploaded = function () {
		return vm.profileBannerImageUploader.profileImagesUploaded;
	}

	this.getProfileBannerImageUploader = function () {
		return vm.profileBannerImageUploader;
	}
	this.getProfileBannerImagesUploaded = function () {
		return vm.profileBannerImageUploader.profileImagesUploaded;
	}
	profileBannerImageUploader.filters.push({
		name: 'customFilter',
		fn: function (item /*{File|FileLikeObject}*/, options) {
			return this.queue.length < 2;
		}
	});

	profileBannerImageUploader.filters.push({
		name: 'sizeFilter',
		fn: function (item /*{File|FileLikeObject}*/, options) {
			console.log(item);
			return item.size <= 10000000; a
		}
	});


	// CALLBACKS
	//vm.uploadedImages = [];
	//var numberOfImages = 0;

	profileBannerImageUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
		vm.fileErrorMessage = "";
		if (filter.name = 'sizeFilter') {
			vm.fileErrorMessage = "File too big. Upload file limit 1 MB";
		}
		console.info('onWhenAddingFileFailed', item, filter, options);
	};
	profileBannerImageUploader.onAfterAddingFile = function (fileItem) {
		vm.fileErrorMessage = "";
		console.info('onAfterAddingFile', fileItem);
	};
	profileBannerImageUploader.onAfterAddingAll = function (addedFileItems) {
		console.info('onAfterAddingAll', addedFileItems);
	};
	profileBannerImageUploader.onBeforeUploadItem = function (item) {
		console.info('onBeforeUploadItem', item);
	};
	profileBannerImageUploader.onProgressItem = function (fileItem, progress) {
		console.info('onProgressItem', fileItem, progress);
	};
	profileBannerImageUploader.onProgressAll = function (progress) {
		console.info('onProgressAll', progress);
	};
	profileBannerImageUploader.onSuccessItem = function (fileItem, response, status, headers) {
		console.info('onSuccessItem', fileItem, response, status, headers);

	};
	profileBannerImageUploader.onErrorItem = function (fileItem, response, status, headers) {
		console.info('onErrorItem', fileItem, response, status, headers);
	};
	profileBannerImageUploader.onCancelItem = function (fileItem, response, status, headers) {
		console.info('onCancelItem', fileItem, response, status, headers);
	};
	vm.profileImagesUploaded = [];
	profileBannerImageUploader.onCompleteItem = function (fileItem, response, status, headers) {
		console.info('onCompleteItem', fileItem, response, status, headers);

		var imagePath = response;

		if (!runningProduction) {
			imagePath = "resources/images/" + response;
		}
		vm.profileBannerImageUploader.profileImagesUploaded.push({ image: imagePath, isProfile: true, imageType: vm.uploadingPictureType });
		//$sc
		vm.profileBannerImageUploader.queue = [];

		//var profileImagesUploaded = ProfileService.getProfileImages();
		
		var images = vm.profileBannerImageUploader.profileImagesUploaded;

	    var profileBannerImageJson = JSON.stringify(images);

		var user = ProfileService.getUserInfo();

		ProfileService.postBannerProfileImage(user._id, profileBannerImageJson)
		// numberOfImages++;

	};
	profileBannerImageUploader.onCompleteAll = function () {
		console.info('onCompleteAll');
	};




}]);