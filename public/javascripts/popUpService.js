myApp.service('PopUpService', ['$http', '$q', 'FileUploader', 'ProfileService', function ($http, $q, FileUploader, ProfileService) {
	var vm = this;
	vm.uploadingPictureType = "";

	this.setImageUploadingType = function (type) {
		vm.uploadingPictureType = type;
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

		var profileImagesUploaded = ProfileService.getProfileImages();
		
		var images = profileImagesUploaded.concat(vm.profileImageUploader.profileImagesUploaded);
		
	    var profileImageJson = JSON.stringify(images);

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

		var profileImagesUploaded = ProfileService.getProfileImages();
		
		var images = profileImagesUploaded.concat(vm.profileBannerImageUploader.profileImagesUploaded);

	    var profileImageJson = JSON.stringify(images);

		var user = ProfileService.getUserInfo();

		ProfileService.postProfileImage(user._id, profileImageJson)
		// numberOfImages++;

	};
	profileBannerImageUploader.onCompleteAll = function () {
		console.info('onCompleteAll');
	};




}]);