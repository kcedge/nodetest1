/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("myApp").controller('bodySampleController', ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage',"FileUploader","ngAudio", function ($scope, $rootScope, $http, ProfileService, $localStorage,FileUploader,ngAudio) {
	$scope.keyValues = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];
	$scope.typeValues = ["One Shot","Loop"];
	$scope.sortReverse  = false;
	$scope.sortType     = 'originalName';
	$scope.searchSample   = '';
	
	var uploader = $scope.uploader = new FileUploader({
	    url: '/uploadSample'
	});
	
	// FILTERS
	uploader.filters.push({	
	    name: 'customFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		return this.queue.length < 1000;
	    }
	});
	
	uploader.filters.push({
	    name: 'sizeFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		console.log(item);
		return item.size <= 10000000;
	    }
	});


	// CALLBACKS
	$scope.uploadedSamples = [];
	var numberOfSamples = 0;
	var uploadPack = function(){
	     var req = {
		method: 'POST',
		url: '/uploadPack',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {packname: $scope.packname,
		       sampleArrayJson:JSON.stringify($scope.uploadedSamples)}
	    }
	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.responseData = response.data;
		
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.failureData = response.data;
	    });
	}
	var getSamples = function(){
	      var req = {
		method: 'GET',
		url: '/samples',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {}
	    } 
	     $http(req).then(function success(response) {
		$scope.samples = response.data;
		$scope.updateSamples();
		
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.failureData = response.data;
	    });
	}
	var getPacks = function(){
	      var req = {
		method: 'GET',
		url: '/packs',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {}
	    } 
	     $http(req).then(function success(response) {
		$scope.packs = response.data;
		$scope.updatePacks();
		
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.failureData = response.data;
	    });
	}
	
	uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
	    $scope.fileErrorMessage = "";
	    if(filter.name = 'sizeFilter'){
		$scope.fileErrorMessage = "File too big. Upload file limit 10 MB";
	    }
	    console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function (fileItem) {
	    $scope.fileErrorMessage = "";
	    console.info('onAfterAddingFile', fileItem);
	};
	uploader.onAfterAddingAll = function (addedFileItems) {
	    console.info('onAfterAddingAll', addedFileItems);
	};
	uploader.onBeforeUploadItem = function (item) {
	    item.formData.push({bpm:item.bpm});
	    item.formData.push({key:item.key});
	    item.formData.push({tagJson:JSON.stringify(item.tags)});
	    item.formData.push({type:item.type});
	    item.formData.push({packname:$scope.packname});

	    item.formData.push({points:0});
	    console.info('onBeforeUploadItem', item);
	};
	uploader.onProgressItem = function (fileItem, progress) {
	    console.info('onProgressItem', fileItem, progress);
	};
	uploader.onProgressAll = function (progress) {
	    console.info('onProgressAll', progress);
	};
	uploader.onSuccessItem = function (fileItem, response, status, headers) {
	    console.info('onSuccessItem', fileItem, response, status, headers);
	    
	};
	uploader.onErrorItem = function (fileItem, response, status, headers) {
	    console.info('onErrorItem', fileItem, response, status, headers);
	};
	uploader.onCancelItem = function (fileItem, response, status, headers) {
	    console.info('onCancelItem', fileItem, response, status, headers);
	};
	uploader.onCompleteItem = function (fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);

	    $scope.uploadedSamples.push(response);
	    
	    var imageFileNameLocal = response;
	    if (!runningProduction) {
			imageFileNameLocal = "resources/samples/" + response;
		}
	    //$scope.samplesArray.push({imageFileName: imageFileNameLocal, hasImage: true, submittedBy: "submittedBy"})
	    numberOfSamples++;

	};
	uploader.onCompleteAll = function () {
	    uploadPack();
	    console.info('onCompleteAll');
	};
	
	$scope.getTags = function(query){
	    return [
                    { text: 'percs' },
                    { text: 'drums' },
                    { text: 'kick' },
                    { text: 'snare' },
		    { text: 'synth' },
		    { text: 'sfx' },	
                ];
	}
	$scope.updateSamples = function (pack) {

	    for (var s = 0; s < $scope.samples.length; s++) {
		$scope.samples[s].audio = ngAudio.load("resources/samples/"+$scope.samples[s].fileName);
		$scope.samples[s].tags = JSON.parse($scope.samples[s].tagJson);
		if (typeof pack != 'undefined' && pack.active) {
		    if (($scope.samples[s].packname == pack.packname)) {
			$scope.samples[s].show = true;
		    }
		    else{
			$scope.samples[s].show = false;
		    }
		}
		else {
		    $scope.samples[s].show = true;
		}
	    }
	}
	$scope.updatePacks = function () {

	    for (var s = 0; s < $scope.packs.length; s++) {
		
	    }
	}
	
	
	getPacks();
	getSamples();

    }]);

angular.module("myApp").controller('samplesCtrl', ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage', "ngAudio", function ($scope, $rootScope, $http, ProfileService, $localStorage,ngAudio ) {
	$scope.getName = function(sample){
	    return sample.orginalName;
	}
	$scope.downloadClicked = function(sample){
	    $("#download"+sample._id).attr('download',sample.originalName);
	}
	$scope.progressInputClicked = function(sample,e){
	    var width = $("#duration"+sample._id).width();
	    var x = e;
	    var progressPercent = (e.layerX-5)/width;
	    sample.audio.progress = progressPercent;
	    sample.audio.play();
	}
	$scope.samplePlayClicked = function(sample){
	    sample.audio.paused ? sample.audio.play() : sample.audio.pause();
	}
    }]);

angular.module("myApp").controller('packsCtrl', ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage', "ngAudio", function ($scope, $rootScope, $http, ProfileService, $localStorage,ngAudio ) {
	$scope.setActivePack = function(pack){
	    for(var p = 0; p<$scope.$parent.packs.length;p++){
		if(pack._id === $scope.$parent.packs[p]._id){
		    $scope.$parent.packs[p].active =  !$scope.$parent.packs[p].active;
		}
		else{
		    $scope.$parent.packs[p].active = false;
		}
	    }
	}
	
	$scope.packClicked = function(pack){
	    $scope.setActivePack(pack);
	    $scope.$parent.updateSamples(pack);
	     
	}
	

    }]);
