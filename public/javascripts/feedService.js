myApp.service('FeedService', ['$http', '$q', 'ProfileService','CommentsService', function ($http, $q, ProfileService,CommentsService) {
    var vm = this;
    vm.tipArrayData = [];

    function compare(a, b) {
		if (a.tipTitle < b.tipTitle)
			return -1;
		if (a.tipTitle > b.tipTitle)
			return 1;
		return 0;
	}
    
	vm.findInTipArray = function (id) {
		for (var i = 0; i < vm.tipArrayData.length; i++) {
			if (vm.tipArrayData[i]._id == id) {
				return i;
			}
		}
		return -1;
	}

    var convertTipDataToJson = function () {
		for (var i = 0; i < vm.tipArrayData.length; i++) {
			if (vm.tipArrayData[i].dawJson) {
				if (vm.tipArrayData[i].hasOwnProperty("tipDescJson")) {
					vm.tipArrayData[i].tipDescJson = JSON.parse(vm.tipArrayData[i].tipDescJson);
				}
				if (vm.tipArrayData[i].hasOwnProperty("dawJson")) {
					vm.tipArrayData[i].dawJson = JSON.parse(vm.tipArrayData[i].dawJson);
				}
				if (vm.tipArrayData[i].hasOwnProperty("genreJson")) {
					vm.tipArrayData[i].genreJson = JSON.parse(vm.tipArrayData[i].genreJson);
				}
				if (vm.tipArrayData[i].hasOwnProperty("imageDataJson")) {
					vm.tipArrayData[i].imageDataJson = JSON.parse(vm.tipArrayData[i].imageDataJson);
				}
				if (vm.tipArrayData[i].hasOwnProperty("audioSampleObjectJson")) {
					vm.tipArrayData[i].audioSampleObjectJson = JSON.parse(vm.tipArrayData[i].audioSampleObjectJson);

				}
				if (vm.tipArrayData[i].hasOwnProperty("tipTypeJson")) {
					vm.tipArrayData[i].tipTypeJson = JSON.parse(vm.tipArrayData[i].tipTypeJson);
				}
				if (vm.tipArrayData[i].hasOwnProperty("videoLinkJson")) {
					vm.tipArrayData[i].videoLinkJson = JSON.parse(vm.tipArrayData[i].videoLinkJson);
				}
				if (vm.tipArrayData[i].hasOwnProperty("filtersJson")) {
					vm.tipArrayData[i].filtersJson = JSON.parse(vm.tipArrayData[i].filtersJson);
				}
				if (vm.tipArrayData[i].hasOwnProperty("vstJson")) {
					vm.tipArrayData[i].vstJson = JSON.parse(vm.tipArrayData[i].vstJson);
				}
			}
		}
	}
    
    vm.getTipsFromMongo = function () {
        //dd tip to database
        let deffered = $q.defer();
        var req = {
            method: 'GET',
            url: '/tipsPageGet',
            headers: {
                'Content-Type': "application/json"
            },
            data: {}
        }


        $http(req).then(function success(response) {
            vm.tipArrayData = response.data;
            vm.tipArrayData.sort(compare);
            convertTipDataToJson();



           // vm.profileDataFromMongo();
           
           
            //vm.initilizeTipData();
            CommentsService.getComments().then(function (response) {
                for (var i = 0; i < vm.tipArrayData.length; i++) {

                    vm.tipArrayData[i].parentComments = [];
                    vm.tipArrayData[i].replyComments = [];
                    vm.tipArrayData[i].comments = [];

                }

                vm.setTipComments(response.data);
            });

            //Update comments
            // CommentsService.getCommentsWithTipId(vm.tipArrayData[vm.tipCounter]._id).then(function (response) {

            //     var comment = response.data;
            //     //setTipComments();
            // });


            for (var i = 0; i < vm.tipArrayData.length; i++) {
                vm.tipArrayData[i].showComments = true;
                //		    vm.updateBodyArray();
                //		    vm.tipCounter++
            }
            //vm.tipCounter =  vm.tipArrayData.length - 1;


            //	vm.updateImageFileName();
            //vm.updateBodyArray();	


            //check if current tip id was set through the url
            if (vm.currentTipId != null) {
                vm.tipCounter = vm.findInTipArray(vm.currentTipId);
            }
            vm.updateTipsData();


            getTipAudioSamples();

            vm.navBarArray = "[";
            for (var i = 0; i < vm.tipArrayData.length; i++) {
                var object = '{text:"' + vm.tipArrayData[i].tipTitle + '",href:"#"},';
                vm.navBarArray += object;

            }
            //vm.tipCounter = vm.tipArrayData.length-1;
            vm.navBarArray += "]"

            deffered.resolve(vm.tipArrayData);
        }, function failure(response) {

            console.log('ERROR: ' + status + '. We can\'t get the profile tips now, please try again later');
            vm.submitMessage = "Failure"
            vm.responseData = response.data;
            deffered.response(data);

        });

        return deffered.promise;


        
    }

	//Display Functions
	vm.showButton = function (buttonName) {

        return true;
		// if (buttonName == "Add") {
		// 	return true;
		// 	//return vm.isLoggedIn();
		// }
		// else if (buttonName == "Edit") {
		// 	if ($localStorage.username == "kcedge") {
		// 		return true;
		// 	}
		// 	if (vm.tipArrayData.length) {
		// 		if (vm.tipArrayData[vm.tipCounter]) {
		// 			if (vm.tipArrayData[vm.tipCounter].submittedBy == $localStorage.username) {
		// 				return true;
		// 			}
		// 		}
		// 	}
		// 	return false;

		// }
		// else if (buttonName == "Delete") {
		// 	if ($localStorage.username == "kcedge") {
		// 		return true;
		// 	}
		// 	if (vm.tipArrayData.length) {
		// 		if (vm.tipArrayData[vm.tipCounter]) {
		// 			if (vm.tipArrayData[vm.tipCounter].submittedBy == $localStorage.username) {
		// 				return true;
		// 			}
		// 		}
		// 	}

		// 	return false;

		// }
		// else if (buttonName == "ErasePoints") {
		// 	if ($localStorage.username == "kcedge") {
		// 		return true;
		// 	}
		// 	else {
		// 		return false;
		// 	}
		// }
	};

    
    vm.updateTipsData = function () {
		// var currentTipId = vm.currentTipId;

		if (vm.tipCounter === undefined) {
			vm.tipCounter = 0;
		}
		vm.tipCounterTmp = vm.tipCounter;
		vm.tipCounter = 0;
		for (var i = 0; i < vm.tipArrayData.length; i++) {
			vm.tipArrayData[i].isActive = false;
			vm.updateBodyArray();//call to update all tip bodies
			vm.tipCounter++;
		}
		vm.tipCounter = vm.tipCounterTmp;
		vm.tipArrayData[vm.tipCounter].isActive = true;


		vm.currentTipId = vm.tipArrayData[vm.tipCounter]._id
		vm.currentTipPoints = vm.tipArrayData[vm.tipCounter].tipPoints;
		vm.removeImageBodyArray = false;
		vm.submittedDate = vm.tipArrayData[vm.tipCounter].dateSubmitted;
		// vm.updateBodyArray(); //update current tip
	};

    vm.updateBodyArray = function () {
		if (vm.tipArrayData.length) {
			vm.tipBodyArray = [];
			vm.tipImageArray = [];



			if (!vm.tipArrayData[vm.tipCounter].hasOwnProperty("tipImageArray")) {
				vm.tipArrayData[vm.tipCounter].tipImageArray = [];
			}
			if (!vm.tipArrayData[vm.tipCounter].hasOwnProperty("tipBodyArray")) {
				vm.tipArrayData[vm.tipCounter].tipBodyArray = [];
			}



			//vm.tipArrayData[vm.tipCounter].isActive = true;


			vm.currentTipId = vm.tipArrayData[vm.tipCounter]._id
			vm.currentTipPoints = vm.tipArrayData[vm.tipCounter].tipPoints;
			vm.removeImageBodyArray = false;
			vm.submittedDate = vm.tipArrayData[vm.tipCounter].dateSubmitted;


			if (vm.tipArrayData[vm.tipCounter].hasOwnProperty("tipDescJson")) {

				for (var i = 1; i < vm.tipArrayData[vm.tipCounter].tipDescJson.length; i++) {
					var tipDescriptionLocal = vm.tipArrayData[vm.tipCounter].tipDescJson[i].tipDescription;
					var submittedByLocal = vm.tipArrayData[vm.tipCounter].submittedBy;
					var submittedDateLocal = vm.tipArrayData[vm.tipCounter].dateSubmitted;
					var imageFileNameLocal = "";
					var audioSampleLocal = {};

					if (vm.tipArrayData[vm.tipCounter].imageDataJson[i - 1]) {
						imageFileNameLocal = vm.tipArrayData[vm.tipCounter].imageDataJson[i - 1].newFileName;
					}
					if (vm.tipArrayData[vm.tipCounter].hasOwnProperty("audioSampleObjectJson") && vm.tipArrayData[vm.tipCounter].audioSampleObjectJson.length > (i - 1))
						if (vm.tipArrayData[vm.tipCounter].audioSampleObjectJson[i - 1] && vm.tipArrayData[vm.tipCounter].audioSampleObjectJson[i - 1].hasOwnProperty('audioSampleObject')) {
							audioSampleLocal = vm.tipArrayData[vm.tipCounter].audioSampleObjectJson[i - 1].audioSampleObject;
						}

					if (!runningProduction) {
						imageFileNameLocal = "resources/images/" + imageFileNameLocal;
					}
					var hasImage = (imageFileNameLocal != "" && imageFileNameLocal != "resources/images/" && imageFileNameLocal != "resources/images/undefined");
					vm.tipArrayData[vm.tipCounter].tipBodyArray.push({ tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: hasImage, audioSampleObject: audioSampleLocal, submittedBy: submittedByLocal, submittedDate: submittedDateLocal })
					if (hasImage) {
						vm.tipArrayData[vm.tipCounter].tipImageArray.push({ tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: hasImage, submittedBy: submittedByLocal, submittedDate: submittedDateLocal });
					}
				}
			}
			if ((vm.tipArrayData[vm.tipCounter].tipDescJson.length) <= vm.tipArrayData[vm.tipCounter].imageDataJson.length) {
				var i = vm.tipArrayData[vm.tipCounter].tipDescJson.length - 1;
				for (var i; i < vm.tipArrayData[vm.tipCounter].imageDataJson.length; i++) {
					var tipDescriptionLocal = "";
					var submittedByLocal = vm.tipArrayData[vm.tipCounter].submittedBy;
					var submittedDateLocal = vm.tipArrayData[vm.tipCounter].dateSubmitted;
					var imageFileNameLocal = "";
					if (vm.tipArrayData[vm.tipCounter].imageDataJson[i]) {
						imageFileNameLocal = vm.tipArrayData[vm.tipCounter].imageDataJson[i].newFileName;
					}
					if (!runningProduction) {
						imageFileNameLocal = "resources/images/" + imageFileNameLocal;
					}
					var hasImage = (imageFileNameLocal != "" && imageFileNameLocal != "resources/images/");
					if (hasImage) {
						vm.tipArrayData[vm.tipCounter].tipImageArray.push({ tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: hasImage, submittedBy: submittedByLocal, submittedDate: submittedDateLocal })
						vm.tipArrayData[vm.tipCounter].tipBodyArray.push({ tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: hasImage, submittedBy: submittedByLocal, submittedDate: submittedDateLocal })
					}
				}
			}



			vm.tipTagsArray = [];
			if (vm.tipArrayData[vm.tipCounter].hasOwnProperty("tipTypeJson")) {
				var isMastering = vm.tipArrayData[vm.tipCounter].tipTypeJson['masteringTip'];
				var isMixing = vm.tipArrayData[vm.tipCounter].tipTypeJson['mixingTip'];
				var isSoundDesign = vm.tipArrayData[vm.tipCounter].tipTypeJson['soundDesignTip'];
				var isTheory = vm.tipArrayData[vm.tipCounter].tipTypeJson['theoryTip'];
				var isWorkFlow = vm.tipArrayData[vm.tipCounter].tipTypeJson['workFlowTip'];

				if (isMastering) {
					vm.tipTagsArray.push('Mastering');
				}
				if (isMixing) {
					vm.tipTagsArray.push('Mixing');
				}
				if (isSoundDesign) {
					vm.tipTagsArray.push('Sound Design');
				}
				if (isTheory) {
					vm.tipTagsArray.push('Theory');
				}
				if (isWorkFlow) {
					vm.tipTagsArray.push('Work Flow');
				}
			}
			if (vm.tipArrayData[vm.tipCounter].hasOwnProperty("genreJson")) {
				for (var i = 1; i < vm.tipArrayData[vm.tipCounter].genreJson.length; i++) {
					var genreObj = vm.tipArrayData[vm.tipCounter].genreJson[i];
					if (genreObj.genreToggle) {
						vm.tipTagsArray.push(genreObj.genreName);
					}
				}
			}
			if (vm.tipArrayData[vm.tipCounter].hasOwnProperty("dawJson")) {
				for (var i = 1; i < vm.tipArrayData[vm.tipCounter].dawJson.length; i++) {
					var dawObj = vm.tipArrayData[vm.tipCounter].dawJson[i];
					if (dawObj.dawToggle) {
						vm.tipTagsArray.push(dawObj.dawName);
					}
				}
			}
			if (vm.tipArrayData[vm.tipCounter].hasOwnProperty("vstJson")) {
				for (var i = 1; i < vm.tipArrayData[vm.tipCounter].vstJson.length; i++) {
					var vstObj = vm.tipArrayData[vm.tipCounter].vstJson[i];
					if (vstObj.vstToggle) {
						vm.tipTagsArray.push(vstObj.vstName);
					}
				}
			}






			//vm.$apply();
			vm.showButton('Edit');
			vm.showButton('Delete');
			//		$('html, body').animate({
			//			scrollTop: $("#filterWrapper").offset().top
			//		   }, 1000);
		}
	}

    var getTipAudioSamples = function () {
		for (var i = 0; i < vm.tipArrayData.length; i++) {
			if (vm.tipArrayData[i].hasOwnProperty("audioSampleObjectJson")) {
				for (var j = 0; j < vm.tipArrayData[i].audioSampleObjectJson.length; j++) {

					var req = {
						method: 'GET',
						url: '/getTipAudioSample/' + i + '/' + j + '/' + vm.tipArrayData[i].audioSampleObjectJson[j]._id,
						headers: {
							'Content-Type': "application/json",
							'tipCount': i,
							'audioCount': j
						},
						data: {}
					}
					$http(req).then(function success(response) {
						var audioId = response.config.url.replace("/getTipAudioSample/", "");

						var tipIndex = parseInt(response.data.tipIndex);
						var audioIndex = parseInt(response.data.audioIndex);
						vm.tipArrayData[tipIndex].audioSampleObjectJson[parseInt(audioIndex)].audioSampleObject = response.data.item[0];

						if (vm.tipArrayData[tipIndex].tipBodyArray[audioIndex] != null) {
							vm.tipArrayData[tipIndex].tipBodyArray[audioIndex].audioSampleObject = response.data.item[0];
							if (!runningProduction) {
								vm.tipArrayData[tipIndex].tipBodyArray[audioIndex].audioSampleObject.audio = ngAudio.load("resources/samples/" + vm.tipArrayData[tipIndex].tipBodyArray[audioIndex].audioSampleObject.fileName);

							}
							else {
								vm.tipArrayData[tipIndex].tipBodyArray[audioIndex].audioSampleObject.audio = ngAudio.load(vm.tipArrayData[tipIndex].tipBodyArray[audioIndex].audioSampleObject.destination);
							}

						}
						// vm.updateTipSamples();

					}, function failure(response) {

						vm.submitMessage = "Failure"
						vm.responseData = response.data;

					});
				}

			}

		}


	}

    vm.setTipComments = function (comments) {
		if (comments) {
			for (var i = 0; i < comments.length; i++) {
				comments[i].showReplies = true;
				var tipId = comments[i].tip_id;
				var tipCounter = vm.findInTipArray(tipId);
				if (tipCounter != -1) {
					if (!vm.tipArrayData[tipCounter].hasOwnProperty('comments')) {
						vm.tipArrayData[tipCounter].comments = [];

					}
					vm.tipArrayData[tipCounter].comments.push(comments[i]);
					if (comments[i].parentComment_id == -1) {

						vm.tipArrayData[tipCounter].parentComments.push(comments[i]);
					}
					else {
						vm.tipArrayData[tipCounter].replyComments.push(comments[i]);
					}
				}
			}
		}

		var test = vm.tipArrayData;
	}

    vm.profileDataFromMongo = function(user) {


        var username = $localStorage.username;
        var req = {
            method: 'POST',
            url: '/profileInfoPostGet/' + username,
            headers: {
                'Content-Type': "application/json"
            },
            data: { userName: username }
        }
        $http(req).then(function success(response) {
            vm.profileTipData = {};
            if (response.data.length > 0) {
                var responseData = response.data[0];
                if (responseData.hasOwnProperty('lovedTipsJson')) {
                    vm.profileTipData.lovedTipsArray = JSON.parse(responseData.lovedTipsJson);
                    vm.updateTipDataWithLovedTipData();
                }
                if (responseData.hasOwnProperty('likedTipsJson')) {
                    vm.profileTipData.likedTipsArray = JSON.parse(responseData.likedTipsJson);
                    vm.updateTipDataWithLikedTipData();
                }
                if (responseData.hasOwnProperty('dislikedTipsJson')) {
                    vm.profileTipData.dislikedTipsArray = JSON.parse(responseData.dislikedTipsJson);
                    vm.updateTipDataWithDislikedTipData();
                }

                if (responseData.profileTipData.hasOwnProperty('submittedTips')) {
                    vm.submittedTipsArray = JSON.parse(responseData.submittedTips);
                }
                deffered.resolve(profileTipData);
                
            }
        }, function failure(response) {

            vm.submitMessage = "Failure"
            //vm.responseData = response.data;

        });
        //vm.updateBodyArray();
    }


}]);