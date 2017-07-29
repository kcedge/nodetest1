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
	$scope.packname = "";
	
	$scope.adminAuth = true;
	$scope.authenticated = false;
	
	$scope.packsFilterOptions = ["Top Packs","Most Recent Packs","Most Liked Packs","Most Used Packs"];
	$scope.packsDurationOptions = ["All Time","Year","Month","Week"];

	$scope.packsFilter = "Top Packs";
	$scope.packsFilterDuration = "Month";
	$scope.activePack = {};
	
	isAuthenticated($http,false,function(username){
	    if(username == 'kcedge'){
		$scope.adminAuth = true;
		$scope.authenticated = true;
	    }
	    if(username != 0){
		$scope.authenticated = true;
		$scope.username = username;
	    }    
	});
	
	$scope.parseJson = function (jsonArray) {
	    for (var i = 0; i < jsonArray.length; i++) {
		if (jsonArray[i].hasOwnProperty("packImageJson") && jsonArray[i].packImageJson) {
		    jsonArray[i].packImageJson = JSON.parse(jsonArray[i].packImageJson);
		}
	    }
	   
	    return jsonArray;
	}
	
	$scope.savePack = function(pack){
	    var req = {
		method: 'PUT',
		url: '/savePack',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {id: pack._id,
		       packname:pack.packname,
		       packdesc:pack.packdesc
		   }
	    }
	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.responseData = response.data;
		$scope.packname = "";
		
		
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.failureData = response.data;
	    });
	}
	
	
	
	
	
	window.onload=function(){
	     styleSize(); 
	   $scope.setStyle();
	}
	
	$(window).resize(function(){
	   styleSize(); 
	   $scope.setStyle();
	});
	var styleSize = function(){
	    var height = $(window).height();
	    $(".sampleListWrapper").height(height - 50 - 90); //For banner and filter menu
	}
	
	
	
	$scope.setStyle = function(){
	    var packWrapper = $(".packWrapper");
	    var width = packWrapper.width();
	    if(width){
		var windowHeight = $(window).height();
		//$(".packWrapper").height(width/2);//SQUARE
		$(".packDescWrapper").height((width-20)/2);
		//$(".packHeaderWrapper").height((width-20)/2);
		$(".packViewBanner").height(width*2-100);
		$(".sampleListWrapper").height(windowHeight - $(".packViewBanner").height() - $(".filterBoxStyle").height() -50 - 50);
		$(".packList").height($(window).height() -$(".filterBoxStyle").height() -50 - 20);
		//$("#addContent").height = window.height();
		$('.packWrapper').height(width*.8);
		$('.packHeaderWrapper').height(width*.7);
		$('.packHeaderWrapper').css('background-size','contain');
		 $('.packBackGroundImage').height(width);
	    }
	    else{
		var windowHeight = $(window).height();
		//$(".packWrapper").height(150/2);
		 $(".packDescWrapper").height(130/2);
		// $(".packHeaderWrapper").height(130/2);
		 $(".packViewBanner").height(200);
		$(".sampleListWrapper").height(windowHeight - $(".packViewBanner").height() - $(".filterBoxStyle").height() -50 - 50);

		  $(".packList").height($(window).height() - $(".filterBoxStyle").height() - 50 - 50-20);
		// $("#addContent").height = window.height();
	    }
	   
	 
	 
	 
	}
	

	
	var getFilters = function () {

	    var req = {
		method: 'GET',
		url: '/getFilters',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {}

	    }
	    $scope.filters = [];
	    var findParent = function (parent) {
		for (var f = 0; f < $scope.filters.length; f++) {
		    if ($scope.filters[f].name == parent) {
			return f;
		    }
		}
		return -1;
	    }
	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.filters = response.data;
		$scope.filters.forEach(function (element) {
		    element.toggle = false;
		    element.inputToggle = false;
		});
		for (var f = 0; f < $scope.filters.length; f++) {
		    var req = {
			method: 'GET',
			url: '/getFilters/' + $scope.filters[f].name,
			headers: {
			    'Content-Type': "application/json"
			},
			data: {}

		    }
		    $http(req).then(function success(res) {
			var parentIndex = findParent(res.data[0].parent);
			$scope.filters[parentIndex].children = res.data;
			$scope.submitMessage = "Success";
			console.log(res);

		    }, function failure(res) {
			$scope.submitMessage = "Failure"


		    });


		}
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });

	};
	
	getFilters();
	
	$scope.uploadPackHeadClicked = function(){
	    var test = $scope.adminAuth;
	}
	$scope.uploader = new FileUploader({
	    url: '/uploadSample'
	});
	$scope.packImageUploader = new FileUploader({
	    url: '/uploadPackImage'
	});
	
	// FILTERS
	$scope.uploader.filters.push({	
	    name: 'customFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		return this.queue.length < 1000;
	    }
	});
	
	$scope.uploader.filters.push({
	    name: 'sizeFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		console.log(item);
		return item.size <= 10000000;
	    }
	});
	$scope.packImageUploader.filters.push({	
	    name: 'customFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		return this.queue.length < 1000;
	    }
	});
	
	$scope.packImageUploader.filters.push({
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
		       sampleArrayJson:JSON.stringify($scope.uploadedSamples),
		       packImageJson:JSON.stringify($scope.uploadedPackImages)}
	    }
	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.responseData = response.data;
		$scope.packname = "";
		
		
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
		$scope.packs = $scope.parseJson($scope.packs);
		
		$scope.updatePacks(); // UPDATES LEFT NAV BAR WITH PACKS
		if($scope.packs){
			$scope.activePack = $scope.packs[0];
		    }
		//$scope.$apply();
		$scope.setStyle();
		
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.failureData = response.data;
	    });
	}
	
	$scope.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
	    $scope.fileErrorMessage = "";
	    if(filter.name = 'sizeFilter'){
		$scope.fileErrorMessage = "File too big. Upload file limit 10 MB";
	    }
	    console.info('onWhenAddingFileFailed', item, filter, options);
	};
	$scope.uploader.onAfterAddingFile = function (fileItem) {
	    $scope.fileErrorMessage = "";
	    console.info('onAfterAddingFile', fileItem);
	};
	$scope.uploader.onAfterAddingAll = function (addedFileItems) {
	    console.info('onAfterAddingAll', addedFileItems);
	};
	$scope.uploader.onBeforeUploadItem = function (item) {
	    item.formData.push({bpm:item.bpm});
	    item.formData.push({key:item.key});
	    item.formData.push({tagJson:JSON.stringify(item.tags)});
	    item.formData.push({type:item.type});
	    item.formData.push({packname:$scope.packname});

	    item.formData.push({points:0});
	    console.info('onBeforeUploadItem', item);
	};
	$scope.uploader.onProgressItem = function (fileItem, progress) {
	    console.info('onProgressItem', fileItem, progress);
	};
	$scope.uploader.onProgressAll = function (progress) {
	    console.info('onProgressAll', progress);
	};
	$scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
	    console.info('onSuccessItem', fileItem, response, status, headers);
	    
	};
	$scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
	    console.info('onErrorItem', fileItem, response, status, headers);
	};
	$scope.uploader.onCancelItem = function (fileItem, response, status, headers) {
	    console.info('onCancelItem', fileItem, response, status, headers);
	};
	$scope.uploader.onCompleteItem = function (fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);

	    $scope.uploadedSamples.push(response);
	    
	    var imageFileNameLocal = response;
	    if (!runningProduction) {
			imageFileNameLocal = "resources/samples/" + response;
		}
	    //$scope.samplesArray.push({imageFileName: imageFileNameLocal, hasImage: true, submittedBy: "submittedBy"})
	    numberOfSamples++;

	};
	$scope.uploader.onCompleteAll = function () {
	    uploadPack();
	    console.info('onCompleteAll');
	};
	
	$scope.packImageUploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
	    $scope.fileErrorMessage = "";
	    if(filter.name = 'sizeFilter'){
		$scope.fileErrorMessage = "File too big. Upload file limit 10 MB";
	    }
	    console.info('onWhenAddingFileFailed', item, filter, options);
	};
	$scope.packImageUploader.onAfterAddingFile = function (fileItem) {
	    $scope.fileErrorMessage = "";
	    console.info('onAfterAddingFile', fileItem);
	};
	$scope.packImageUploader.onAfterAddingAll = function (addedFileItems) {
	    console.info('onAfterAddingAll', addedFileItems);
	};
	$scope.packImageUploader.onBeforeUploadItem = function (item) {
//	    item.formData.push({bpm:item.bpm});
//	    item.formData.push({key:item.key});
//	    item.formData.push({tagJson:JSON.stringify(item.tags)});
//	    item.formData.push({type:item.type});
//	    item.formData.push({packname:$scope.packname});
//
//	    item.formData.push({points:0});
	    console.info('onBeforeUploadItem', item);
	};
	$scope.packImageUploader.onProgressItem = function (fileItem, progress) {
	    console.info('onProgressItem', fileItem, progress);
	};
	$scope.packImageUploader.onProgressAll = function (progress) {
	    console.info('onProgressAll', progress);
	};
	$scope.packImageUploader.onSuccessItem = function (fileItem, response, status, headers) {
	    console.info('onSuccessItem', fileItem, response, status, headers);
	    
	};
	$scope.packImageUploader.onErrorItem = function (fileItem, response, status, headers) {
	    console.info('onErrorItem', fileItem, response, status, headers);
	};
	$scope.packImageUploader.onCancelItem = function (fileItem, response, status, headers) {
	    console.info('onCancelItem', fileItem, response, status, headers);
	};
	$scope.packImageUploader.onCompleteItem = function (fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);

	    var imagePath = response;
	  
	    if (!runningProduction) {
		imagePath = "resources/images/" + response;
	    }
	    if($scope.uploadedPackImages){
		 $scope.uploadedPackImages.push({image:imagePath,isPackImage:true});
	    }
	    else{
		$scope.uploadedPackImages = [];
		$scope.uploadedPackImages.push({image:imagePath,isPackImage:true});
	    }
	    
	   
	    //$sc
//	    $scope.queue = [];
//	    var bannerImageJson = JSON.stringify($scope.bannerImagesUploaded);
//	    ProfileService.postBannerImage($scope.$storage.username,bannerImageJson)

	};
	$scope.packImageUploader.onCompleteAll = function () {
	   // uploadPackImage();
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
		if(!runningProduction){
			$scope.samples[s].audio = ngAudio.load("resources/samples/"+$scope.samples[s].fileName);
		
		}
		else{
		    $scope.samples[s].audio = ngAudio.load($scope.samples[s].destination);
		}
		
		if($scope.samples[s].tagJson != 'undefined' && $scope.samples[s].tagJson)
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
	$scope.packMouseOver = function(pack){
	    pack.showDesc = true;
	    pack.showTitle = true;
	}
	$scope.updatePacks = function () {

	    for (var s = 0; s < $scope.packs.length; s++) {
		$scope.packs[s].showTitle = true;
		$scope.packs[s].showDesc = false;
		if(!$scope.packs[s].hasOwnProperty("desc")){
		    $scope.packs[s].desc = "";
		}
	    }
	}
	$scope.copyAll = function () {
	    if (uploader.queue) {
		var bpm = uploader.queue[0].bpm;
		var key = uploader.queue[0].key;
		var type = uploader.queue[0].type;
		var tags = uploader.queue[0].tags;
		
		for (var i = 0; i < uploader.queue.length; i++) {
			uploader.queue[i].bpm = bpm;
			uploader.queue[i].key = key
			uploader.queue[i].type = type;
			uploader.queue[i].tags = tags;
		}
	    }
	}
	$scope.showKey = function(key){
	    return (key != 'undefined' && key)
	}
	$scope.uploadAPackToggle = false;
	$scope.uploadPackToggleClicked = function(){
	    $scope.uploadAPackToggle = !$scope.uploadAPackToggle;
	}
	
	
	getPacks();
	getSamples();

    }]);

angular.module("myApp").controller('samplesCtrl', ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage', "ngAudio", function ($scope, $rootScope, $http, ProfileService, $localStorage,ngAudio ) {
	$scope.editToggle = false;
	$scope.keyValues = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];
	$scope.typeValues = ["One Shot","Loop"];
	$scope.adminAuthSamples = false;
	$scope.authenticated = false;
	
	//Second Parm is route to sign in
	isAuthenticated($http,false,function(username){
	    if(username == 'kcedge'){
		$scope.adminAuthSamples = true;
		$scope.authenticated = true;
	    }
	    if(username != 0){
		$scope.authenticated = true;
		$scope.username = username;
	    }    
	});
	
	$scope.getName = function(sample){
	    return sample.orginalName;
	}
	
	$scope.downloadClicked = function (sample) {
	    if ($scope.authenticated) {
		var link = document.createElement("a");
		link.target = '_self';
		link.href = sample.destination;
		link.click();
	    }
	    else{
		window.location.href = '/signUp/sampleLib';
	    }
	}
	
	
	
	$scope.progressInputClicked = function(sample,e){
	    var width = $("#duration"+sample._id).width();
	    var x = e;
	    var progressPercent = (e.layerX-5)/width;
	    sample.audio.progress = progressPercent;
	    if (sample.audio) {
		sample.audio.play();
	    }
	}
	$scope.samplePlayClicked = function(sample){
	    if(sample.audio){
		sample.audio.paused ? sample.audio.play() : sample.audio.pause();
	    }
	}
	
	$scope.editSampleClicked = function(sample){
	    $scope.editToggle = true;
	    $scope.editSample = sample;
	    $scope.editSample.bpm = parseInt($scope.editSample.bpm);
	}
	
	$scope.editSaveSample = function (sample) {
	    var req = {
		method: 'PUT',
		url: '/sample',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {sampleId: $scope.editSample._id,
		    bpm: $scope.editSample.bpm,
		    key: $scope.editSample.key,
		    tagJson: JSON.stringify($scope.editSample.tags)}}

	    $http(req).then(function success(response) {
		var resdata = response.data;
		$scope.editSample = "";
		$scope.editToggle = false;
		$scope.updateSamples();

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.failureData = response.data;
	    });
	}
    }]);

angular.module("myApp").controller('packsCtrl', ['$scope', '$rootScope', '$http', 'ProfileService', '$localStorage', "ngAudio", function ($scope, $rootScope, $http, ProfileService, $localStorage,ngAudio ) {
	$scope.setActivePack = function(pack,$index)
	{
	    for(var p = 0; p<$scope.$parent.packs.length;p++){
		$scope.$parent.packs[p].active = false;
	    }
	    if($scope.$parent.packs[$index]){
		$scope.$parent.activePack = $scope.$parent.packs[$index];
		$scope.$parent.activePackIndex = $index;
		$scope.$parent.packs[$index].active = true;
	    }
	  
	    
	   
	}
	
	$scope.packWidth = 0;
	$scope.getPackWrapperStyle = function(){
	    var packWrapper = $(".packWrapper");
	    var width = packWrapper.width();
	    var updatedWidth =false;
	    if($scope.packWidth == 0){
		    $scope.packWidth = width;
		    updatedWidth = true;
	    }
	    else if($scope.packWidth != width){
		updatedWidth = true;
	    }
	    
	    
	    if(updatedWidth && width){
		var windowHeight = $(window).height();
		//$(".packWrapper").height(width/2);//SQUARE
		$(".packDescWrapper").height((width-20)/2);
		//$(".packHeaderWrapper").height((width-20)/2);
		$(".packViewBanner").height(width*2-100);
		$(".sampleListWrapper").height(windowHeight - $(".packViewBanner").height() - $(".filterBoxStyle").height() -50 - 50);
		$(".packList").height($(window).height() -$(".filterBoxStyle").height() -50 - 60);
		//$("#addContent").height = window.height();
		$('.packWrapper').height(width*.8);
		$('.packHeaderWrapper').height(width*.7);
		$('.packHeaderWrapper').css('background-size','contain');
		 $('.packBackGroundImage').height(width);
	    }
	   
	   // return $(".packWrapper").css();
	}
	
	
	
	$scope.editPackToggle = false;
	$scope.editPackClicked = function(pack,$index){
	    $scope.editPackToggle = !$scope.editPackToggle;
	    $scope.editPackIndex = $index;
	    if($scope.editPack){
		 $scope.editPack.title = pack.packname;
		 $scope.editPack.desc = pack.packdesc;
	    }
	    else{
		$scope.editPack = {};
		 $scope.editPack.title = pack.packname;
		 $scope.editPack.desc = pack.packdesc;
	    }
	    
	    
	    
	}
	$scope.activePackTmpIndex = 0;
	
	$scope.setActivePackBanner=function(pack,$index){
	    $scope.$parent.activePack =  $scope.$parent.packs[$index];
	}
	
	$scope.packMouseOver = function(pack,$index){
	    $scope.$parent.updatePacks();
	    $scope.$parent.packs[$index].showTitle = false;
	    $scope.$parent.packs[$index].showDesc = true;
	    
	    $scope.activePackTmpIndex = $scope.$parent.activePackIndex;
	    $scope.setActivePackBanner(pack,$index);
	}
	$scope.packMouseLeave = function(pack,$index){
	    $scope.$parent.updatePacks();
	    $scope.$parent.packs[$index].showTitle = true;
	    $scope.$parent.packs[$index].showDesc = false;
	    

	    $scope.setActivePackBanner(pack, $scope.activePackTmpIndex);
	}
	
	$scope.editPackSave = function(){
	    if($scope.$parent.packs[$scope.editPackIndex]){
		
		$scope.$parent.packs[$scope.editPackIndex].packname = $scope.editPack.title;
		$scope.$parent.packs[$scope.editPackIndex].packdesc = $scope.editPack.desc;
		$scope.$parent.savePack($scope.$parent.packs[$scope.editPackIndex]);
	    }
	}
	
	$scope.packClicked = function(pack,$index){
	     $scope.activePackTmpIndex = $index;
	    $scope.setActivePack(pack,$index);
	    $scope.$parent.updateSamples(pack);
	     
	}
	

    }]);
