$("#soundCloudLink").attr("target", '_blank');
$("#soundCloudLink").attr("href", 'https://soundcloud.com/crazylegsmusic');
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(".soundCloudLink").children().first().attr("target", "_blank");
$(".facebookLink").children().first().attr("target", "_blank");
$(".twitterLink").children().first().attr("target", "_blank");

//angular.module("myApp", ["$scope","$http", "ngCookies"]);
var runningProduction = true;
function isAuthenticated($http, routeToSignUp, callback) {
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
	if (response.data) {
	    return callback(response.data);
	}
	else {
	    if (routeToSignUp)
		window.location.href = '/signUp';
	    else {
		callback(0);//calls back with false if no need to route to sign in
	    }
	}
    }, function failure(response) {
	window.location.href = '/signUp';
	return false;
    });

}
angular.module('myApp')
	.filter('to_trusted', ['$sce', function ($sce) {
		return function (text) {
		    return $sce.trustAsHtml(text);
		};
	    }]);
angular.module("myApp").controller('bodyController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.isLoggedIn = function () {
	    if ($localStorage.username != "" && $localStorage.username) {
		return true;
	    }
	    else {
		return false;
	    }
	}
	console.log("MYAPP");
	console.log(angular.module("myApp"));

	$scope.signOutClicked = function () {
	    $localStorage.username = "";
	    $localStorage.userSignedIn = false;

	}
    }]);
angular.module("myApp").controller('signUpController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.signUpEmail = "";
	$scope.signUpPassword = "";
	$scope.signUpPasswordConfirm = "";
	$scope.signUpUsername = "";
	$scope.$storage = $localStorage.$default({
	    username: "",
	    userSignedIn: false
	});
	$scope.gotoSignInClicked = function () {
	    window.location.href = '/signIn/' + $('#redirect').text();
	}

	$scope.signUpGood = function () {
	    if ($scope.signUpUsername.length == 0) {
		$scope.signUpErrorMessage = "enter username";
		return false;
	    }
	    else if ($scope.signUpUsername.length < 3) {
		$scope.signUpErrorMessage = "make username >= 3 characters";
		return false;
	    }
	    else if ($scope.signUpPassword.length < 6) {
		$scope.signUpErrorMessage = "make password >= 6 characters";
		return false;
	    }
	    else if ($scope.signUpPasswordConfirm.length == 0) {
		$scope.signUpErrorMessage = "confirm password";
		return false;
	    }
	    else if ($scope.signUpPassword != $scope.signUpPasswordConfirm) {
		$scope.signUpErrorMessage = "passwords do not match"
		return false;
	    }

	    $scope.signUpErrorMessage = "";
	    return true;
	}

	$scope.signUpClicked = function () {
	    var req = {
		method: 'POST',
		url: '/signUp',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {username: $scope.signUpUsername,
		    email: $scope.signUpEmail,
		    password: $scope.signUpPassword,
		    redirect: $("#redirect").text()}
	    }

	    $http(req).then(function success(response) {
		window.location.href = '/' + $('#redirect').text();
		$scope.authres = response.data;

	    }, function failure(response) {
		$scope.authres = response.data;

	    });
	}

    }]);
angular.module("myApp").controller('signInController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.signUpEmail = "";
	$scope.signUpPassword = "";
	$scope.signUpPasswordConfirm = "";
	$scope.$storage = $localStorage.$default({
	    username: "",
	    userSignedIn: false
	});
	$scope.signInWithSoundCloud = function () {
	    var req = {
		method: 'GET',
		url: '/soundCloudAuth',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {}
	    }

	    $http(req).then(function success(response) {
		window.location.href = '/' + $('#redirect').text();
		$scope.authres = response.data;

	    }, function failure(response) {
		$scope.authres = response.data;

	    });
	}
	$scope.signInClicked = function () {
	    var req = {
		method: 'POST',
		url: '/signIn',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {username: $scope.signInUsername,
		    password: $scope.signInPassword,
		    redirect: $("#redirect").text()}
	    }

	    $http(req).then(function success(response) {
		window.location.href = '/' + $('#redirect').text();
		$scope.authres = response.data;

	    }, function failure(response) {
		$scope.authres = response.data;

	    });
	}



    }]);


angular.module("myApp").controller('bodyMelodyHelperController', ['$scope', '$http', function ($scope, $http) {

	$scope.hello = "HELLLOOO";
	$scope.hi = "HIIIIII"
	$scope.alertInformation = "Select your root note "
	$scope.selectedKey = ""

	$scope.sharpSelected = false;
	$scope.flatSelected = false;
	$scope.majorSelected = false;
	$scope.minorSelected = false;
	$scope.majorOrMinorString = ""
	$scope.BPM = "122"
	$scope.BARS = "16"

	$scope.majorFormula = [false, true, false, true, true, false, true, false, true, false, true, true];
	$scope.minorFormula = [false, true, true, false, true, false, true, true, false, true, false, true];
	$scope.majorChordIFormula = [false, false, false, true, false, false, true, false, false, false, false, true];
	$scope.minorChordIFormula = [false, false, true, false, false, false, true, false, false, false, false, true];
	$scope.majorChordIIFormula = [false, true, false, false, true, false, false, false, true, false, false, false];
	$scope.minorChordIIFormula = [false, true, false, false, true, false, false, true, false, false, false, false];
	$scope.majorChordIIIFormula = [false, false, false, true, false, false, true, false, false, false, true, false];
	$scope.minorChordIIIFormula = [false, false, true, false, false, false, true, false, false, true, false, false];
	$scope.majorChordIVFormula = [false, false, false, false, true, false, false, false, true, false, false, true];
	$scope.minorChordIVFormula = [false, false, false, false, true, false, false, true, false, false, false, true];
	$scope.majorChordVFormula = [false, true, false, false, false, false, true, false, false, false, true, false];
	$scope.minorChordVFormula = [false, true, false, false, false, false, true, false, false, true, false, false];
	$scope.majorChordVIFormula = [false, false, false, true, false, false, false, false, true, false, false, true];
	$scope.minorChordVIFormula = [false, false, true, false, false, false, false, true, false, false, false, true];
	$scope.majorChordVIIFormula = [false, true, false, false, true, false, false, false, false, false, true, false];
	$scope.minorChordVIIFormula = [false, true, false, false, true, false, false, false, false, true, false, false];

	//7th Chords 
	$scope.majorChordIFormula7th = [false, false, false, true, false, false, true, false, false, false, true, true];
	$scope.minorChordIFormula7th = [false, false, true, false, false, false, true, false, false, true, false, true];
	$scope.majorChordIIFormula7th = [false, true, false, false, true, false, false, false, true, false, false, true];
	$scope.minorChordIIFormula7th = [false, true, false, false, true, false, false, true, false, false, false, true];
	$scope.majorChordIIIFormula7th = [false, true, false, true, false, false, true, false, false, false, true, false];
	$scope.minorChordIIIFormula7th = [false, true, true, false, false, false, true, false, false, true, false, false];
	$scope.majorChordIVFormula7th = [false, false, false, true, true, false, false, false, true, false, false, true];
	$scope.minorChordIVFormula7th = [false, false, true, false, true, false, false, true, false, false, false, true];
	$scope.majorChordVFormula7th = [false, true, false, false, true, false, true, false, false, false, true, false];
	$scope.minorChordVFormula7th = [false, true, false, false, true, false, true, false, false, true, false, false];
	$scope.majorChordVIFormula7th = [false, false, false, true, false, false, true, false, true, false, false, true];
	$scope.minorChordVIFormula7th = [false, false, true, false, false, false, true, true, false, false, false, true];
	$scope.majorChordVIIFormula7th = [false, true, false, false, true, false, false, false, true, false, true, false];
	$scope.minorChordVIIFormula7th = [false, true, false, false, true, false, false, true, false, true, false, false];

	//9th Chords 
	$scope.majorChordIFormula9th = [false, true, false, true, false, false, true, false, false, false, true, true];
	$scope.minorChordIFormula9th = [false, true, true, false, false, false, true, false, false, true, false, true];
	$scope.majorChordIIFormula9th = [false, true, false, true, true, false, false, false, true, false, false, true];
	$scope.minorChordIIFormula9th = [false, true, false, true, true, false, false, true, false, false, false, true];
	$scope.majorChordIIIFormula9th = [false, true, false, true, true, false, true, false, false, false, true, false];
	$scope.minorChordIIIFormula9th = [false, true, true, false, true, false, true, false, false, true, false, false];
	$scope.majorChordIVFormula9th = [false, false, false, true, true, false, true, false, true, false, false, true];
	$scope.minorChordIVFormula9th = [false, false, true, false, true, false, true, true, false, false, false, true];
	$scope.majorChordVFormula9th = [false, true, false, false, true, false, true, false, true, false, true, false];
	$scope.minorChordVFormula9th = [false, true, false, false, true, false, true, true, false, true, false, false];
	$scope.majorChordVIFormula9th = [false, false, false, true, false, false, true, false, true, false, true, true];
	$scope.minorChordVIFormula9th = [false, false, true, false, false, false, true, true, false, true, false, true];
	$scope.majorChordVIIFormula9th = [false, true, false, false, true, false, false, false, true, false, true, true];
	$scope.minorChordVIIFormula9th = [false, true, false, false, true, false, false, true, false, true, false, true];



	$scope.noteOrderForChart = ["E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb"];
	$scope.sharpOrFlat = "";

	$scope.chordNumberSelected = 0;

	$scope.hasKeyBeenSelected = function () {
	    return ($scope.selectedKey != "" && ($scope.majorSelected || $scope.minorSelected));
	};
	$scope.rootNoteNotSelected = function () {
	    return ($scope.selectedKey == "");
	};
	$scope.keyButtonClicked = function () {
	    $scope.alertInformation = " selected. Major or Minor?";
	    $scope.keyHasBeenSelected = true;
	    $scope.ScaleOrChord = "Scale";
	    $scope.chordNumberSelected = 0;
	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorFormula);
	    }
	    else if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorFormula);
	    }
	};
	$scope.keyButtonAClicked = function () {
	    $scope.selectedKey = "A";
	    $scope.keyButtonClicked();

	};
	$scope.keyButtonBClicked = function () {
	    $scope.selectedKey = "B";
	    $scope.keyButtonClicked();

	};
	$scope.keyButtonCClicked = function () {
	    $scope.selectedKey = "C";

	    $scope.keyButtonClicked();
	};
	$scope.keyButtonDClicked = function () {
	    $scope.selectedKey = "D";

	    $scope.keyButtonClicked();
	};
	$scope.keyButtonEClicked = function () {
	    $scope.selectedKey = "E";

	    $scope.keyButtonClicked();
	};
	$scope.keyButtonFClicked = function () {
	    $scope.selectedKey = "F";

	    $scope.keyButtonClicked();
	    ;
	}
	$scope.keyButtonGClicked = function () {
	    $scope.selectedKey = "G";

	    $scope.keyButtonClicked();
	};


	$scope.sharpButtonClicked = function () {
	    if ($scope.selectedKey.includes("#")) {
		$scope.sharpOrFlat = "";
		$scope.selectedKey = $scope.selectedKey.replace('#', '');
	    }
	    else if (!$scope.selectedKey.includes("E") && !$scope.selectedKey.includes("B")) {
		$scope.selectedKey += "#";
		$scope.selectedKey = $scope.selectedKey.replace('b', '');

		$scope.sharpOrFlat = "Sharp";
	    }
	    $scope.ScaleOrChord = "Scale";
	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorFormula);
	    }
	    else if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorFormula);
	    }
	}
	$scope.flatButtonClicked = function () {
	    if ($scope.selectedKey.includes("b")) {
		$scope.sharpOrFlat = "";
		$scope.flatSelected = false;
		$scope.selectedKey = $scope.selectedKey.replace('b', '');
	    }
	    else if (!$scope.selectedKey.includes("C") && !$scope.selectedKey.includes("F")) {
		$scope.selectedKey += "b";
		$scope.selectedKey = $scope.selectedKey.replace('#', '');
	    }
	    $scope.ScaleOrChord = "Scale";
	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorFormula);
	    }
	    else if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorFormula);
	    }
	};
	$scope.chordButton1 = "I";
	$scope.chordButton2 = "II";
	$scope.chordButton3 = "III";
	$scope.chordButton4 = "IV";
	$scope.chordButton5 = "V";
	$scope.chordButton6 = "VI";
	$scope.chordButton7 = "VII";

	$scope.updateChordButtons = function (majorOrMinor) {
	    if (majorOrMinor == "Major") {
		$scope.chordButton1 = "I";
		$scope.chordButton2 = "ii";
		$scope.chordButton3 = "iii";
		$scope.chordButton4 = "IV";
		$scope.chordButton5 = "V";
		$scope.chordButton6 = "vi";
		$scope.chordButton7 = "vii dm";
	    }
	    if (majorOrMinor == "Minor") {
		$scope.chordButton1 = "i";
		$scope.chordButton2 = "ii dm";
		$scope.chordButton3 = "III";
		$scope.chordButton4 = "iv";
		$scope.chordButton5 = "v";
		$scope.chordButton6 = "VI";
		$scope.chordButton7 = "VII";
	    }

	}
	$scope.majorButtonClicked = function () {
	    $scope.majorSelected = true;
	    $scope.minorSelected = false;
	    $scope.majorOrMinorString = "Major";
	    $scope.ScaleOrChord = "Scale";
	    $scope.updateChordButtons("Major");
	    $scope.setColorSet($scope.majorFormula);
	};
	$scope.minorButtonClicked = function () {
	    $scope.majorSelected = false;
	    $scope.minorSelected = true;
	    $scope.majorOrMinorString = "Minor";
	    $scope.ScaleOrChord = "Scale";
	    $scope.updateChordButtons("Minor");
	    $scope.setColorSet($scope.minorFormula);
	};
	$scope.ChordIButtonClicked = function () {

	    if ($scope.chordButton1 === "I") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton1 + " (" + $scope.selectedKey + " Major" + ")";
	    }
	    else if ($scope.chordButton1 === "i") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton1 + " (" + $scope.selectedKey + " Minor" + ")";
	    }

	    $scope.chordNumberSelected = 1;

	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorChordIFormula);
	    }
	    if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorChordIFormula);
	    }
	};
	$scope.ChordIIButtonClicked = function () {
	    //$scope.ScaleOrChord = "Chord " + $scope.chordButton2;
	    if ($scope.chordButton2 === "II") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton2 + " (" + $scope.findRootNoteInChord(2) + " Major" + ")";
	    }
	    else if ($scope.chordButton2.includes("dm")) {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton2 + " (" + $scope.findRootNoteInChord(2) + " Minor" + " diminished)";
	    }
	    else if ($scope.chordButton2 === "ii") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton2 + " (" + $scope.findRootNoteInChord(2) + " Minor" + ")";
	    }

	    $scope.chordNumberSelected = 2;

	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorChordIIFormula);
	    }
	    if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorChordIIFormula);
	    }

	};
	$scope.ChordIIIButtonClicked = function () {
	    $scope.ScaleOrChord = "Chord " + $scope.chordButton3;
	    $scope.chordNumberSelected = 3;
	    if ($scope.chordButton3 === "III") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton3 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Major" + ")";
	    }
	    else if ($scope.chordButton3 === "iii") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton3 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Minor" + ")";
	    }

	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorChordIIIFormula);
	    }
	    if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorChordIIIFormula);
	    }
	};
	$scope.ChordIVButtonClicked = function () {
	    $scope.ScaleOrChord = "Chord " + $scope.chordButton4;

	    $scope.chordNumberSelected = 4;
	    if ($scope.chordButton4 === "IV") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton4 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Major" + ")";
	    }
	    else if ($scope.chordButton4 === "iv") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton4 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Minor" + ")";
	    }
	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorChordIVFormula);
	    }
	    if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorChordIVFormula);
	    }
	};
	$scope.ChordVButtonClicked = function () {
	    $scope.ScaleOrChord = "Chord " + $scope.chordButton5;
	    $scope.chordNumberSelected = 5;
	    if ($scope.chordButton5 === "V") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton5 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Major" + ")";
	    }
	    else if ($scope.chordButton5 === "v") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton5 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Minor" + ")";
	    }
	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorChordVFormula);
	    }
	    if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorChordVFormula);
	    }
	};
	$scope.ChordVIButtonClicked = function () {
	    $scope.ScaleOrChord = "Chord " + $scope.chordButton6;
	    $scope.chordNumberSelected = 6;
	    if ($scope.chordButton6 === "VI") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton6 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Major" + ")";
	    }
	    else if ($scope.chordButton6 === "vi") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton6 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Minor" + ")";
	    }
	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorChordVIFormula);
	    }
	    if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorChordVIFormula);
	    }
	};
	$scope.ChordVIIButtonClicked = function () {
	    $scope.ScaleOrChord = "Chord " + $scope.chordButton7;
	    $scope.chordNumberSelected = 7;
	    if ($scope.chordButton7 === "VII") {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton7 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Major" + ")";
	    }
	    else if ($scope.chordButton7.includes("vii")) {
		$scope.ScaleOrChord = "Chord " + $scope.chordButton7 + " (" + $scope.findRootNoteInChord($scope.chordNumberSelected) + " Minor" + " diminished)";
	    }
	    if ($scope.majorOrMinorString == "Major") {
		$scope.setColorSet($scope.majorChordVIIFormula);
	    }
	    if ($scope.majorOrMinorString == "Minor") {
		$scope.setColorSet($scope.minorChordVIIFormula);
	    }
	};
	$scope.Chord7thClicked = function () {
	    if ($scope.chordNumberSelected != 0) {
		if ($scope.seventhOrNinth == "7th") {
		    $scope.seventhOrNinth = "";
		}
		else {
		    $scope.seventhOrNinth = "7th";
		}

		if ($scope.majorOrMinorString == "Major") {
		    if ($scope.chordNumberSelected == 1) {
			$scope.setColorSet($scope.majorChordIFormula7th);
		    }
		    if ($scope.chordNumberSelected == 2) {
			$scope.setColorSet($scope.majorChordIIFormula7th);
		    }
		    if ($scope.chordNumberSelected == 3) {
			$scope.setColorSet($scope.majorChordIIIFormula7th);
		    }
		    if ($scope.chordNumberSelected == 4) {
			$scope.setColorSet($scope.majorChordIVFormula7th);
		    }
		    if ($scope.chordNumberSelected == 5) {
			$scope.setColorSet($scope.majorChordVFormula7th);
		    }
		    if ($scope.chordNumberSelected == 6) {
			$scope.setColorSet($scope.majorChordVIFormula7th);
		    }
		    if ($scope.chordNumberSelected == 7) {
			$scope.setColorSet($scope.majorChordVIIFormula7th);
		    }

		}
		else if ($scope.majorOrMinorString == "Minor") {
		    if ($scope.chordNumberSelected == 1) {
			$scope.setColorSet($scope.minorChordIFormula7th);
		    }
		    if ($scope.chordNumberSelected == 2) {
			$scope.setColorSet($scope.minorChordIIFormula7th);
		    }
		    if ($scope.chordNumberSelected == 3) {
			$scope.setColorSet($scope.minorChordIIIFormula7th);
		    }
		    if ($scope.chordNumberSelected == 4) {
			$scope.setColorSet($scope.minorChordIVFormula7th);
		    }
		    if ($scope.chordNumberSelected == 5) {
			$scope.setColorSet($scope.minorChordVFormula7th);
		    }
		    if ($scope.chordNumberSelected == 6) {
			$scope.setColorSet($scope.minorChordVIFormula7th);
		    }
		    if ($scope.chordNumberSelected == 7) {
			$scope.setColorSet($scope.minorChordVIIFormula7th);
		    }

		}
	    }

	};
	$scope.Chord9thClicked = function () {
	    if ($scope.chordNumberSelected != 0) {
		if ($scope.seventhOrNinth == "9th") {
		    $scope.seventhOrNinth = "";
		}
		else {
		    $scope.seventhOrNinth = "9th";
		}

		if ($scope.majorOrMinorString == "Major") {
		    if ($scope.chordNumberSelected == 1) {
			$scope.setColorSet($scope.majorChordIFormula9th);
		    }
		    if ($scope.chordNumberSelected == 2) {
			$scope.setColorSet($scope.majorChordIIFormula9th);
		    }
		    if ($scope.chordNumberSelected == 3) {
			$scope.setColorSet($scope.majorChordIIIFormula9th);
		    }
		    if ($scope.chordNumberSelected == 4) {
			$scope.setColorSet($scope.majorChordIVFormula9th);
		    }
		    if ($scope.chordNumberSelected == 5) {
			$scope.setColorSet($scope.majorChordVFormula9th);
		    }
		    if ($scope.chordNumberSelected == 6) {
			$scope.setColorSet($scope.majorChordVIFormula9th);
		    }
		    if ($scope.chordNumberSelected == 7) {
			$scope.setColorSet($scope.majorChordVIIFormula9th);
		    }

		}
		else if ($scope.majorOrMinorString == "Minor") {
		    if ($scope.chordNumberSelected == 1) {
			$scope.setColorSet($scope.minorChordIFormula9th);
		    }
		    if ($scope.chordNumberSelected == 2) {
			$scope.setColorSet($scope.minorChordIIFormula9th);
		    }
		    if ($scope.chordNumberSelected == 3) {
			$scope.setColorSet($scope.minorChordIIIFormula9th);
		    }
		    if ($scope.chordNumberSelected == 4) {
			$scope.setColorSet($scope.minorChordIVFormula9th);
		    }
		    if ($scope.chordNumberSelected == 5) {
			$scope.setColorSet($scope.minorChordVFormula9th);
		    }
		    if ($scope.chordNumberSelected == 6) {
			$scope.setColorSet($scope.minorChordVIFormula9th);
		    }
		    if ($scope.chordNumberSelected == 7) {
			$scope.setColorSet($scope.minorChordVIIFormula9th);
		    }

		}
	    }
	};

	$scope.radioKeyClicked = function () {
	    var test = $('#keyButtonWrapper').find([checked = 'checked']);


	};
	$('.keyButtonWrapper').change(function () {
	    $scope.thisIs = (this).prop('checked');
	});

	$scope.canvasClick = function () {
	    var charttest = $scope.chart;

	};
//	var canvas = document.getElementById("canvasDiv");
//	canvas.width = 400;
//	canvas.height = 400;
//	var myColor = ['red', 'green', 'blue','red', 'green', 'blue','red', 'green', 'blue','red', 'green', 'blue'];
//	for(var i = 0; i < 13;i++){
//	    var canvasContext = canvas.getContext("2d");
//	    canvasContext.fillStyle = myColor[i];
//	    canvasContext.beginPath();
//	    canvasContext.arc(100,125,100,0,(1/6)*i*Math.PI);
//	    canvasContext.stroke();
//	}
	$scope.getCurrentScaleFormula = function ()
	{
	    if ($scope.majorOrMinorString == "Major") {
		return $scope.majorFormula;

	    }
	    else if ($scope.majorOrMinorString == "Minor") {
		return $scope.minorFormula;
	    }
	}

	$scope.findNoteIndex = function () {
	    var noteIndex = 0;
	    for (var i = 0; i < $scope.noteOrderForChart.length; i++) {
		if ($scope.noteOrderForChart[i].includes($scope.selectedKey) && ($scope.selectedKey.includes("#") || $scope.selectedKey.includes("b"))) {
		    noteIndex = i;
		    break;
		}
		else if ($scope.noteOrderForChart[i] == $scope.selectedKey) {
		    noteIndex = i;
		    break;
		}
	    }
	    return noteIndex;
	}
	$scope.findRootNoteInChord = function (chordNumber) {
	    var noteIndex = $scope.findNoteIndex();
	    var noteCount = 0;
	    var formulaArray = $scope.getCurrentScaleFormula();
	    var indexForFormula = 0;
	    for (var i = noteIndex + 1; indexForFormula < formulaArray.length; i++, indexForFormula++)
	    {
		if (i == $scope.noteOrderForChart.length) {
		    i = 0;
		}
		if (formulaArray[indexForFormula]) {
		    if (noteCount == (chordNumber - 2)) {
			return $scope.noteOrderForChart[i];
		    }
		    noteCount++;
		}


	    }
	}

	$scope.setColorSet = function (formulaArray) {
	    var colorSetArray = [];
	    var noteIndex = $scope.findNoteIndex();
	    //  if ($scope.majorOrMinorString == "Major" && scaleOrChord == "Scale") {
	    // for (var i = 0; i < $scope.noteOrderForChart.length; i++) {
	    //	if ($scope.noteOrderForChart[i].includes($scope.selectedKey) && ($scope.selectedKey.includes("#") || $scope.selectedKey.includes("b"))) {
	    //	    noteIndex = i;
	    //	    break;
	    //	}
	    //	else if ($scope.noteOrderForChart[i] == $scope.selectedKey) {
	    //	    noteIndex = i;
	    //	    break;
	    //	}
	    // }
	    var indexForFormula = 0;
	    for (var i = noteIndex + 1; indexForFormula < formulaArray.length; i++, indexForFormula++)
	    {
		if (i == $scope.noteOrderForChart.length) {
		    i = 0;
		}
		if (formulaArray[indexForFormula]) {

		    colorSetArray[i] = "#00cc66";

		}
		else {
		    colorSetArray[i] = "#f2f3f5";
		}



	    }

	    CanvasJS.addColorSet("colorSet",
		    colorSetArray);
	    $scope.UpdateChromaticWheel();
	    var indexForFormula = 0;
	    for (var i = noteIndex + 1; indexForFormula < formulaArray.length; i++, indexForFormula++)
	    {
		if (i == $scope.noteOrderForChart.length) {
		    i = 0;
		}
		if (formulaArray[indexForFormula]) {
		    $scope.chart.options.data[0].dataPoints[i].exploded = true;

		}
		else {
		    $scope.chart.options.data[0].dataPoints[i].exploded = false;
		}



	    }


	    // }
//	    else if ($scope.majorOrMinorString == "Minor" && scaleOrChord == "Scale") {
//		for (var i = 0; i < $scope.noteOrderForChart.length; i++) {
//		    if ($scope.noteOrderForChart[i] == $scope.selectedKey) {
//			noteIndex = i;
//			break;
//		    }
//		}
//		var indexForFormula = 0;
//		for(var i = noteIndex+1; indexForFormula < $scope.minorFormula.length;i++,indexForFormula++)
//		{
//		    if(i == $scope.noteOrderForChart.length){
//			i = 0;
//		    }
//		    if($scope.minorFormula[indexForFormula]){
//			colorSetArray[i] = "#00cc66";	    
//		    }
//		    else{
//			colorSetArray[i] = "#f2f2f2";	    	
//		      }
//		      
//		    
//		
//		}
//		
//		CanvasJS.addColorSet("colorSet",
//			colorSetArray);
//	    }
//	    else if ($scope.majorOrMinorString == "Major" && scaleOrChord == "Chord1") {
//		for (var i = 0; i < $scope.noteOrderForChart.length; i++) {
//		    if ($scope.noteOrderForChart[i] == $scope.selectedKey) {
//			noteIndex = i;
//			break;
//		    }
//		}
//		var indexForFormula = 0;
//		for(var i = noteIndex+1; indexForFormula < $scope.majorChordIFormula.length;i++,indexForFormula++)
//		{
//		    if(i == $scope.noteOrderForChart.length){
//			i = 0;
//		    }
//		    if($scope.majorChordIFormula[indexForFormula]){
//			colorSetArray[i] = "#00cc66";	    
//		    }
//		    else{
//			colorSetArray[i] = "#f2f2f2";	    	
//		      }
//		      
//		    
//		
//		}
//		
//		CanvasJS.addColorSet("colorSet", 
//			colorSetArray);
//	    }
	    $scope.chart.render();
	};

	new CanvasJS.addColorSet("colorSet",
		[//colorSet Array

		    "#2F4F4F",
		    "#008080",
		    "#2E8B57",
		    "#3CB371",
		    "#90EE90",
		    "#ccffcc",
		]);


	$scope.UpdateChromaticWheel = function () {
	    $scope.chart = new CanvasJS.Chart("canvasDiv",
		    {colorSet: "colorSet",
			title: {
			},
			toolTip: {
			    enabled: false,
			},
			legend: {
			    maxWidth: 350,
			    itemWidth: 120
			},
			backgroundColor: "#f1f1f1",
			data: [
			    {
				type: "pie",
				showInLegend: 0,
				legendText: "{indexLabel}",
				dataPoints: [
				    {y: 1, indexLabel: "E", exploded: false},
				    {y: 1, indexLabel: "F", exploded: false},
				    {y: 1, indexLabel: "F#/Gb", exploded: false},
				    {y: 1, indexLabel: "G", exploded: false},
				    {y: 1, indexLabel: "G#/Ab", exploded: false},
				    {y: 1, indexLabel: "A", exploded: false},
				    {y: 1, indexLabel: "A#/Bb", exploded: false},
				    {y: 1, indexLabel: "B", exploded: false},
				    {y: 1, indexLabel: "C", exploded: false},
				    {y: 1, indexLabel: "C#/Db", exploded: false},
				    {y: 1, indexLabel: "D", exploded: false},
				    {y: 1, indexLabel: "D#/Eb", exploded: false},
				]
			    }
			]
		    });
	    $scope.chart.render();

	}
	$scope.UpdateChromaticWheel();
    }]);


angular.module("myApp").factory('TipData', function () {
    return [];
});


angular.module("myApp").controller('bodyTipHelperController', ['$scope', '$rootScope', '$http', '$localStorage', 'FileUploader', 'TipData', 'CommentsService', 'ProfileService', function ($scope, $rootScope, $http, $localStorage, FileUploader, TipData, CommentsService, ProfileService) {


	$scope.title = "HELLLOOO";
	$scope.hi = "HIIIIII"
	$scope.alertInformation = "Select your root note "
	$scope.selectedKey = ""

	$scope.sharpSelected = false;
	$scope.flatSelected = false;
	$scope.majorSelected = false;
	$scope.minorSelected = false;
	$scope.majorOrMinorString = "";
	$scope.tipCounter = 0;
	$scope.BPM = "122";
	$scope.BARS = "16";
	$scope.tipArrayData = TipData;
	$scope.filtersToggle = true;
	$scope.navRightToggle = true;

	var url_in = window.location.href;
	var urlComponents = url_in.split("/");
	$scope.currentTipId = urlComponents[urlComponents.length - 1];
	//$(document).ready(function(){
	// var objectIdToLoad = $('#currentTipId2')[0].innerText;
	//objectIdToLoad = objectIdToLoad.replace('<','');
	//objectIdToLoad = objectIdToLoad.replace('>','');
	//$scope.tipCounter = $scope.findInTipArray(objectIdToLoad);
	//$scope.updateBodyArray();
	//});

	$scope.findInTipArray = function (id) {
	    for (var i = 0; i < $scope.tipArrayData.length; i++) {
		if ($scope.tipArrayData[i]._id == id) {
		    return i;
		}
	    }
	}
	$scope.setCurrentTipCounter = function (currentTipId) {
	    if (currentTipId)
		$scope.tipCounter = $scope.findInTipArray(currentTipId);
	    else {
		$scope.tipCounter = 0;
	    }
	    // $scope.tipNavBarClicked($scope.tipArrayData[$scope.tipCounter])
	}



	$scope.tipClicked = function (tip) {
	    var tipIdClicked = tip._id;
	    $scope.tipCounter = $scope.findInTipArray(tipIdClicked);
	    $scope.updateBodyArray();

	}
	$scope.toggleNavBarRight = function () {
	    $scope.navRightToggle = !$scope.navRightToggle;
	    if (!$scope.navRightToggle) {
		$("#middleDivTipLib").addClass("col-xs-8 col-sm-8 col-md-8 col-lg-8");
		$("#middleDivTipLib").removeClass("col-xs-6 col-sm-6 col-md-6 col-lg-6");
	    }
	    else {
		$("#middleDivTipLib").removeClass("col-xs-8 col-sm-8 col-md-8 col-lg-8");
		$("#middleDivTipLib").addClass("col-xs-6 col-sm-6 col-md-6 col-lg-6");
	    }

	}
	window.onload = function () {
	    // var currentTipId = $scope.currentTipId;

	    if ($scope.tipCounter === undefined) {
		$scope.tipCounter = 0;
	    }
	     $scope.updateBodyArray();
	    for (var i = 0; i < $scope.tipArrayData.length; i++) {
		$scope.tipNavBarClicked($scope.tipArrayData[i]);
	    }

	   

	};
	var convertProfileDataToJson = function (profileArrayData) {
	    for (var i = 0; i < profileArrayData.length; i++) {
		if (profileArrayData[i].hasOwnProperty("bannerImageJson")) {
		    profileArrayData[i].bannerImageJson = JSON.parse(profileArrayData[i].bannerImageJson);
		}
		if (profileArrayData[i].hasOwnProperty("dislikedTipsJson")) {
		    profileArrayData[i].dislikedTipsJson = JSON.parse(profileArrayData[i].dislikedTipsJson);
		}
		if (profileArrayData[i].hasOwnProperty("likedTipsJson")) {
		    profileArrayData[i].likedTipsJson = JSON.parse(profileArrayData[i].likedTipsJson);
		}
		if (profileArrayData[i].hasOwnProperty("lovedTipsJson")) {
		    profileArrayData[i].lovedTipsJson = JSON.parse(profileArrayData[i].lovedTipsJson);
		}
		if (profileArrayData[i].hasOwnProperty("profileImageJson")) {
		    profileArrayData[i].profileImageJson = JSON.parse(profileArrayData[i].profileImageJson);
		}
		if (profileArrayData[i].hasOwnProperty("profileMetaDataJson")) {
		    profileArrayData[i].profileMetaDataJson = JSON.parse(profileArrayData[i].profileMetaDataJson);
		}
//		if (profileArrayData[i].hasOwnProperty("submittedTips")) {
//		    profileArrayData[i].submittedTips = JSON.parse(submittedTips[i].submittedTips);
//		}

	    }
	    return profileArrayData;
	}
	$scope.userNavBarClicked = function (user) {
	    $scope.userActive = user;
	    window.location.href = '/profile/' + $scope.userActive.userName;

	}
	ProfileService.getTopUsers($scope.filterPeriodTopUsersDropDown)
		.then(function (response) {
		    $scope.topUsers = convertProfileDataToJson(response.data);

		    //$scope.$apply();

		    //$scope.parentobj.comments = response.data;
		});
//	$("#tipsScrollWrapper").scroll(function () {
//	    var scrollableScrollTop = $('#tipsScrollWrapper').scrollTop();
//	    var totalOffset = 0;
//
//	    var tipId = $scope.tipArrayData[$scope.tipCounter]._id;
//	    totalOffset = $("#tipsWrapper" + tipId).offset();
//	    var globalOffset = (-$("#tipsWrapper" + tipId).height());
//	    if (totalOffset.top < globalOffset + 600) {
//		$scope.tipCounter --;
//		//$scope.updateBodyArray();
//		//$scope.prevButtonClicked();
//	    }
//	    if (totalOffset.top > 600) {
//		$scope.tipCounter ++;
//		//$scope.updateBodyArray();
//		//$scope.nextButtonClicked();
//	    }
//	    $scope.updateBodyArray();
//	    $scope.$apply();
//	})

	$(window).resize(function () {

	    $scope.stickyHeight = $('#stickyheader').height();
	    // var stickyWidth =;
	    $scope.navbarHeight = $('#navbar_menu').height();
	    $(window).scroll(function () {
		if ($(window).scrollTop() > $scope.stickyHeaderTop) {
		    $('#stickyheader').css({position: 'fixed', top: $scope.navbarHeight, height: $scope.stickyHeight, width: '100%'});
		    $('#stickyalias').css('display', 'block');
		    $('#stickyalias').css('height', $scope.stickyHeight + "px");
		    $('#stickyheaderNavLeft').css({position: 'fixed', top: $scope.stickyHeight + $scope.navbarHeight + 5, height: $scope.stickyNavLeftHeight, width: $scope.stickyNavLeftWidth});

		} else {
		    $('#stickyheader').css({position: 'static', top: '0px', width: ''});
		    $('#stickyalias').css('display', 'none');
		}


	    });
	});
	$(function () {
	    $('#tipsScrollWrapper').css('height', ($(window).height() - 222));
	    // Check the initial Poistion of the Sticky Header
	    $scope.navbarTop = $('#navbar_menu').offset().top;
	    $scope.navbarHeight = $('#navbar_menu').height();
	    $scope.navbarWidth = $('#navbar_menu').width();

	    $scope.stickyHeaderTop = $('#stickyheader').offset().top;
	    $scope.stickyHeight = $('#stickyheader').height() + 5;
	    $scope.stickyWidth = $('#stickyheader').width();

	    $scope.stickyHeaderNavLeftTop = $('#stickyheaderNavLeft').offset().top;
	    $scope.stickyNavLeftHeight = $('#stickyheaderNavLeft').height();
	    $scope.stickyNavLeftWidth = $('#stickyheaderNavLeft').width();
	    $scope.stickyNavRightHeight = $('#stickyaliasNavRight').height();
	    $scope.stickyNavRightWidth = $('#stickyaliasNavRight').width();



	    $(window).resize(function () {
		//$scope.stickyHeaderTop = $('#stickyheader').offset().top;
		$scope.stickyHeight = $('#stickyheader').height();
		$scope.stickyWidth = $('#stickyheader').width();
		$scope.stickyNavLeftHeight = $('#stickyheaderNavLeft').height();
		$scope.stickyNavLeftWidth = $('#stickyheaderNavLeft').width();
		$scope.stickyNavRightHeight = $('#stickyaliasNavRight').height();
		$scope.stickyNavRightWidth = $('#stickyaliasNavRight').width();
		$('#tipsScrollWrapper').css('height', ($(window).height() - 222));
		$(window).scroll(function () {
		    if ($(window).scrollTop() > $scope.stickyHeaderTop) {
			$('#stickyheader').css({position: 'fixed', top: $scope.navbarHeight, height: $scope.stickyHeight + 10, width: $scope.stickyNavLeftWidth});
			$('#stickyalias').css('display', 'block');
			$('#stickyalias').css('height', $scope.stickyHeight + "px");
		    } else {
			$('#stickyheader').css({position: '', top: $scope.navbarHeight, width: ''});
			$('#stickyalias').css('display', 'none');
		    }


		});
	    });
	    $(window).scroll(function () {

		if ($(window).scrollTop() >= $scope.stickyHeaderTop - 50) {
		    $('#stickyheader').css({position: 'fixed', top: $scope.navbarHeight, height: $scope.stickyHeight + 10, width: $scope.stickyWidth});
		    $('#stickyalias').css('display', 'block');
		    $('#stickyalias').css('height', $scope.stickyHeight + "px");
		    $('#stickyheaderNavLeft').css({position: 'fixed', top: $scope.stickyHeight + $scope.navbarHeight + 5, height: 100 + '%', width: $scope.stickyNavLeftWidth});
		    $('#stickyaliasNavLeft').css('display', 'block');
		    $('#stickyaliasNavLeft').css('height', $scope.stickyNavLeftHeight + "px");
		    $('#stickyheaderNavRight').css({position: 'fixed', top: $scope.stickyHeight + $scope.navbarHeight + 5, height: 100 + '%', width: $scope.stickyNavRightWidth});
		    $('#stickyaliasNavRight').css('display', 'block');
		    $('#stickyaliasNavRight').css('height', $scope.stickyNavRightHeight + $scope.navbarHeight + "px");
		    $('#stickyheaderNavRight').css('left', 75 + '%');
		    $('#stickyaliasNavRight').css('height', $scope.stickyHeight + $scope.navbarHeight + "px");

		    $('#scrollable').css('left', 25 + '%');
		    $('#stickyalias').css('height', $scope.stickyHeight + "px");

		} else {
		    $('#stickyheader').css({position: '', top: '', height: '', width: ''});
		    $('#stickyalias').css('display', 'none');
		    $('#stickyheaderNavLeft').css({position: '', top: '', width: ''});
		    $('#stickyaliasNavLeft').css('display', '');
		    $('#stickyheaderNavRight').css({position: '', top: '', width: ''});
		    $('#stickyaliasNavRight').css('display', '');
		    $('#stickyheaderNavRight').css('left', '');
		    $('#scrollable').css('left', '');

		}


	    });
	});
	$scope.isAdmin = function () {
	    return $localStorage.username === "kcedge";
	}

	//Display Functions
	$scope.showButton = function (buttonName) {
	    if (buttonName == "Add") {
		return true;
		//return $scope.isLoggedIn();
	    }
	    else if (buttonName == "Edit") {
		if ($localStorage.username == "kcedge") {
		    return true;
		}
		if ($scope.tipArrayData.length) {
		    if ($scope.tipArrayData[$scope.tipCounter].submittedBy == $localStorage.username) {
			return true;
		    }
		}
		return false;

	    }
	    else if (buttonName == "Delete") {
		if ($localStorage.username == "kcedge") {
		    return true;
		}
		if ($scope.tipArrayData.length) {
		    if ($scope.tipArrayData[$scope.tipCounter].submittedBy == $localStorage.username) {
			return true;
		    }
		}

		return false;

	    }
	    else if (buttonName == "ErasePoints") {
		if ($localStorage.username == "kcedge") {
		    return true;
		}
		else {
		    return false;
		}
	    }
	};


	//FILTER FUNCTIONS
	$scope.theory_toggle = false;
	$scope.theoryToggle = function () {

	};

	$scope.mixing_toggle = false;
	$scope.mixingToggle = function () {
	    return $scope.mixing_toggle = !$scope.mixing_toggle;
	};

	$scope.mastering_toggle = false;
	$scope.masteringToggle = function () {
	    return $scope.mastering_toggle = !$scope.mastering_toggle;
	};
	$scope.workflow_toggle = false;
	$scope.workflowToggle = function () {
	    return $scope.workflow_toggle = !$scope.workflow_toggle;
	};
	$scope.workflow_toggle = false;
	$scope.workflowToggle = function () {
	    return $scope.workflow_toggle = !$scope.workflow_toggle;
	};
	$scope.sound_design_toggle = false;
	$scope.soundDesignToggle = function () {
	    return $scope.sound_design_toggle = !$scope.sound_design_toggle;
	};
	$scope.house_toggle = false;
	$scope.trance_toggle = false;
	$scope.breakbeat_toggle = false;
	$scope.downtempo_toggle = false;
	$scope.techno_toggle = false;
	$scope.hardcore_toggle = false;
	$scope.drumandbass_toggle = false;
	$scope.dubstep_toggle = false;
	$scope.minimal_toggle = false;
	$scope.trap_toggle = false;

	$scope.filterGenreClicked = function (genre) {
	    genre.toggle = !genre.toggle;
	    if (genre.genreName == "House") {
		return $scope.house_toggle = !$scope.house_toggle;
	    }
	    if (genre.genreName == "Trance") {
		return $scope.trance_toggle = !$scope.trance_toggle;
	    }
	    if (genre.genreName == "Breakbeat") {
		return $scope.breakbeat_toggle = !$scope.breakbeat_toggle;
	    }
	    if (genre.genreName == "Downtempo") {
		return $scope.downtempo_toggle = !$scope.downtempo_toggle;
	    }
	    if (genre.genreName == "Techno") {
		return $scope.techno_toggle = !$scope.techno_toggle;
	    }
	    if (genre.genreName == "Hardcore") {
		return $scope.hardcore_toggle = !$scope.hardcore_toggle;
	    }
	    if (genre.genreName == "Drum_and_bass") {
		return $scope.drumandbass_toggle = !$scope.drumandbass_toggle;
	    }
	    if (genre.genreName == "Dubstep") {
		return $scope.dubstep_toggle = !$scope.dubstep_toggle;
	    }
	    if (genre.genreName == "Minimal") {
		return $scope.minimal_toggle = !$scope.minimal_toggle;
	    }
	    if (genre.genreName == "Trap") {
		return $scope.trap_toggle = !$scope.trap_toggle;
	    }
	};

	$scope.fl_studio_toggle = false;
	$scope.ableton_live_toggle = false;
	$scope.logic_pro_toggle = false;
	$scope.pro_tools_toggle = false;
	$scope.bitwig_studio_toggle = false;
	$scope.studio_one_toggle = false;
	$scope.other_toggle = false;

	$scope.filterDawClicked = function (daw) {
	    daw.toggle = !daw.toggle;
	    if (daw.dawName == "Fl_studio") {
		return $scope.fl_studio_toggle = !$scope.fl_studio_toggle;
	    }
	    if (daw.dawName == "Ableton_Live") {
		return $scope.ableton_live_toggle = !$scope.ableton_live_toggle;
	    }
	    if (daw.dawName == "Logic_Pro") {
		return $scope.logic_pro_toggle = !$scope.logic_pro_toggle;
	    }
	    if (daw.dawName == "Pro_Tools") {
		return $scope.pro_tools_toggle = !$scope.pro_tools_toggle;
	    }
	    if (daw.dawName == "Bitwig_Studio") {
		return $scope.bitwig_studio_toggle = !$scope.bitwig_studio_toggle;
	    }
	    if (daw.dawName == "Studio_One") {
		return $scope.studio_one_toggle = !$scope.studio_one_toggle;
	    }
	    if (daw.dawName == "Other") {
		return $scope.other_toggle = !$scope.other_toggle;
	    }

	};

	$scope.massive_toggle = false;
	$scope.serum_toggle = false;
	$scope.sylenth1_toggle = false;
	$scope.kontakt_toggle = false;
	$scope.ozone_toggle = false;
	$scope.nexus_toggle = false;
	$scope.spire_toggle = false;
	$scope.othervst_toggle = false;

	$scope.filterVstClicked = function (vst) {
	    vst.toggle = !vst.toggle;
	    if (vst.vstName == "Massive") {
		return $scope.massive_toggle = !$scope.massive_toggle;
	    }
	    if (vst.vstName == "Serum") {
		return $scope.serum_toggle = !$scope.serum_toggle;
	    }
	    if (vst.vstName == "Sylenth1") {
		return $scope.sylenth1_toggle = !$scope.sylenth1_toggle;
	    }
	    if (vst.vstName == "Kontakt") {
		return $scope.kontakt_toggle = !$scope.kontakt_toggle;
	    }
	    if (vst.vstName == "Ozone") {
		return $scope.ozone_toggle = !$scope.ozone_toggle;
	    }
	    if (vst.vstName == "Nexus") {
		return $scope.nexus_toggle = !$scope.nexus_toggle;
	    }
	    if (vst.vstName == "Spire") {
		return $scope.spire_toggle = !$scope.spire_toggle;
	    }
	    if (vst.vstName == "Other") {
		return $scope.othervst_toggle = !$scope.othervst_toggle;
	    }

	};

	function testTipType(tip) {
	    if (tip.hasOwnProperty("tipTypeJson")) {
		return (tip.tipTypeJson["theoryTip"] || !$scope.theory_toggle)
	    }
	    else
		return !$scope.theory_toggle;
	}


	function testTipGenre(tip) {
	    if (tip.hasOwnProperty("genreJson")) {
		var passed = true;
		var genreFound = false;
		for (var f = 0; f < $scope.filters.length; f++) {
		    for (var i = 0; i < tip.genreJson.length; i++) {
			if (tip.genreJson[i].genreName == $scope.filters[f].name) {
			    genreFound = true;
			    if (tip.genreJson[i].genreToggle || !$scope.filters[f].toggle) {

			    }
			    else {
				passed = false;
			    }
			}
		    }
		}

		return passed;


	    }
	    return false;
	}
	function testTipDaw(tip) {
	    var passedFlStudio = true;
	    var passedAbleton = true;
	    var passedLogicPro = true;
	    var passedProTools = true;
	    var passedBitwigStudio = true;
	    var passedStudioOne = true;
	    var passedOther = true;

	    if (tip.hasOwnProperty("dawJson")) {
		for (var i = 0; i < tip.dawJson.length; i++) {
		    if (tip.dawJson[i].dawName == "Fl_studio") {
			passedFlStudio = (tip.dawJson[i].dawToggle || !$scope.fl_studio_toggle)
		    }
		    if (tip.dawJson[i].dawName == "Ableton_Live") {
			passedAbleton = (tip.dawJson[i].dawToggle || !$scope.ableton_live_toggle)
		    }
		    if (tip.dawJson[i].dawName == "Logic_Pro") {
			passedLogicPro = (tip.dawJson[i].dawToggle || !$scope.logic_pro_toggle)
		    }
		    if (tip.dawJson[i].dawName == "Pro_Tools") {
			passedProTools = (tip.dawJson[i].dawToggle || !$scope.pro_tools_toggle)
		    }
		    if (tip.dawJson[i].dawName == "Bitwig_Studio") {
			passedBitwigStudio = (tip.dawJson[i].dawToggle || !$scope.bitwig_studio_toggle)
		    }
		    if (tip.dawJson[i].dawName == "Studio_One") {
			passedStudioOne = (tip.dawJson[i].dawToggle || !$scope.studio_one_toggle)
		    }
		    if (tip.dawJson[i].dawName == "Other") {
			passedOther = (tip.dawJson[i].dawToggle || !$scope.other_toggle)
		    }
		}
		return passedFlStudio && passedAbleton && passedLogicPro && passedProTools && passedBitwigStudio && passedStudioOne && passedOther;
	    }
	    else
		return !$scope.fl_studio_toggle && !$scope.ableton_live_toggle && !$scope.logic_pro_toggle && !$scope.pro_tools_toggle && !$scope.bitwig_studio_toggle && !$scope.studio_one_toggle && !$scope.other_toggle;

	}
	function testTipVst(tip) {
	    var passedMassive = true;
	    var passedSerum = true;
	    var passedSylenth1 = true;
	    var passedKontakt = true;
	    var passedOzone = true;
	    var passedNexus = true;
	    var passedSpire = true;
	    var passedOther = true;
	    if (tip.hasOwnProperty("vstJson")) {
		for (var i = 0; i < tip.vstJson.length; i++) {
		    if (tip.vstJson[i].vstName == "Massive") {
			passedMassive = (tip.vstJson[i].vstToggle || !$scope.massive_toggle)
		    }
		    if (tip.vstJson[i].vstName == "Serum") {
			passedSerum = (tip.vstJson[i].vstToggle || !$scope.serum_toggle)
		    }
		    if (tip.vstJson[i].vstName == "Sylenth1") {
			passedSylenth1 = (tip.vstJson[i].vstToggle || !$scope.sylenth1_toggle)
		    }
		    if (tip.vstJson[i].vstName == "Kontakt") {
			passedKontakt = (tip.vstJson[i].vstToggle || !$scope.kontakt_toggle)
		    }
		    if (tip.vstJson[i].vstName == "Ozone") {
			passedOzone = (tip.vstJson[i].vstToggle || !$scope.ozone_toggle)
		    }
		    if (tip.vstJson[i].vstName == "Nexus") {
			passedNexus = (tip.vstJson[i].vstToggle || !$scope.nexus_toggle)
		    }
		    if (tip.vstJson[i].vstName == "Spire") {
			passedSpire = (tip.vstJson[i].vstToggle || !$scope.spire_toggle)
		    }
		    if (tip.vstJson[i].vstName == "Other") {
			passedOther = (tip.vstJson[i].vstToggle || !$scope.othervst_toggle)
		    }
		}
		return passedMassive && passedSerum && passedSylenth1 && passedKontakt && passedOzone && passedNexus && passedSpire && passedOther;
	    }
	    else
		return !$scope.massive_toggle && !$scope.serum_toggle && !$scope.sylenth1_toggle && !$scope.kontakt_toggle && !$scope.ozone_toggle && !$scope.nexus_toggle && !$scope.spire_toggle && !$scope.othervst_toggle;

	}
	$scope.showItem = function (tip) {
	    var matchedName = false;
	    var toggleClicked = false;
	    for (var i = 0; i < $scope.filters.length; i++) {
		if ($scope.filters[i].toggle) {
		    toggleClicked = true;
		    break;

		}
	    }
	    for (var i = 0; i < $scope.filters.length; i++) {
		for (var f = 0; f < tip.filtersJson.length; f++) {
		    if (tip.filtersJson[f].name == $scope.filters[i].name) {
			matchedName = true;
			if (($scope.filters[i].toggle && tip.filtersJson[f].toggle) || !toggleClicked) {
			    return true;
			}
		    }
		}
	    }


	    return false;

	};





	//END FILTER FUNCTIONS
	$scope.navBarFilterClick = function (filter) {
	    $scope.sortType = filter;


	}

	$scope.navBarRightFilterClick = function (filter) {
	    $scope.rightBarSortType = filter;
	}

	$scope.navBarRightFilter2Click = function (filter) {
	    $scope.rightBarSortType2 = filter;
	}


	$scope.sortFiltersArray = ["Tip Title ", "Latest", "Rating"/*, "Tip Type ", "Genre ", "Level ", "DAW "*/];

	$scope.rightBarSortFiltersArray = ["Week", "Month", "All Time"];

	$scope.getOrderByNavBar = function () {
	    if ($scope.sortType == "Tip Title") {
		return "tipTitle";
	    }
	    if ($scope.sortType == "Rating") {
		$scope.sortReverse = true;
		//$scope.tipArrayData.sort(compareRating);
		return "tipPoints";

	    }
	    if ($scope.sortType == "Latest") {
		$scope.sortReverse = true;
		//$scope.tipArrayData.sort(compareRating);
		return "dateSubmitted";

	    }
	    else {
		return "tipTitle";
	    }
	}



	//Sort Functions for Nav Bar
	$scope.sortType = $scope.sortFiltersArray[1]; // set the default sort type
	$scope.rightBarSortType = $scope.rightBarSortFiltersArray[0];

	$scope.sortReverse = false;  // set the default sort order
	$scope.searchTerm = '';     // set the default search/filter term

	$scope.getSortType = function () {
	    return $scope.sortType;
	};
	$scope.getRightBarSortType = function () {
	    return $scope.rightBarSortType;
	};
	$scope.sortReverseClicked = function () {
	    $scope.sortReverse = !$scope.sortReverse;
	}
	$scope.getImageSrc = function (tip, imgIndex) {

	    if (tip && tip.imageDataJson.length) {
		if (imgIndex < tip.imageDataJson.length && tip.imageDataJson.length != 0) {
		    var tipImg = tip.imageDataJson[imgIndex];

		    if (runningProduction) {
			return tipImg['imageName'];
		    }
		    else {
			return "resources/images/" + tipImg['imageName'];
		    }
		}
		else
		    return "";
	    }
	    else
		return ""
	}






	$scope.addATipToggle = false;

	$scope.addATip = function () {
	    return $scope.addATipToggle;
	}
	$scope.addATipClicked = function () {
	    //Start with one description
	    $scope.removeAllButOneTipDescriptions("Add");
	    $scope.responseData = "";
	    $scope.addATipToggle = !$scope.addATipToggle;
	    $scope.tipTitleAdd = "";
	    $scope.tipDescAdd = "";

	    $scope.tipImageArray = [];
	    tinyMCE.get('textAreaTip').setContent('');
	}

	$scope.deleteATipClicked = function () {
	    var idOfTip = $scope.tipArrayData[$scope.tipCounter]._id
	    var req = {
		method: 'DELETE',
		url: '/tipsPageDelete',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {id: idOfTip}
	    }
	    $http(req).then(function success(response) {
		$scope.deleteResponse = response.data;


	    }, function failure(response) {

		$scope.deleteResponse = response.data;

	    });
	}



	$scope.getTipFiltersData = function () {
	    if ($scope.tipArrayData[$scope.tipCounter])
		return $scope.tipArrayData[$scope.tipCounter].filtersJson;
	    else
		return [];
	}


	//EDIT A TIP
	$scope.imageSelectedData = "";
	$scope.imageSelected = false;
	$scope.selectedImgObj = "";
	$scope.selectedImgObjIndex = "";
	$scope.editImageClicked = function ($index) {
	    $scope.selectedImgObj = $('.imageAttached' + $index);
	    if ($scope.selectedImgObj.hasClass('active')) {
		$scope.selectedImgObj.removeClass('active');
		$scope.imageSelected = false;
	    }
	    else {
		//$scope.imageSelectedData = $scope.tipBodyArray[$index].imageFileName;
		$('.imageThumbNail').removeClass('active');
		$scope.selectedImgObj.addClass('active');
		$scope.imageSelected = true;
		$scope.selectedImgObjIndex = $index;
	    }
	}
	$scope.removeImageBodyArray = false;
	$scope.removeSelectedImage = function () {
	    var removeImageBodyArray = $scope.tipImageArray[$scope.selectedImgObjIndex];
	    var spliceReturn = $scope.tipImageArray.splice($scope.selectedImgObjIndex, 1);
	    $scope.removeImageBodyArray = true;

	}

	$scope.editATipToggle = false;
	$scope.editATip = function () {
	    return $scope.editATipToggle;
	}

	$scope.editATipClicked = function () {
	    $scope.editATipToggle = !$scope.editATipToggle;
	    $scope.addATipToggle = false;
	    $scope.responseData = "";
	    $scope.imageSelected = false;
	    var tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle;


	    //Start with one description
	    $scope.removeAllButOneTipDescriptions("Edit");


	    $("#tipTitleEditInput").val(tipTitle);

	    //Update tip description
	    if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("tipDescJson")) {
		//starts at 2 because number of tips is in first array space
		for (var i = 1; i < $scope.tipArrayData[$scope.tipCounter].tipDescJson.length; i++) {
		    if (i == 1) {
			var tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDescJson[i].tipDescription;
			var mce = tinyMCE.get('textAreaEditTip');
			mce.setContent(tipDesc);
			//$("#textAreaEditTip").val(tipDesc);
		    }
		    else {
			$scope.editAddDescription();//put text area elements into the DOM 
			tinyMCE.get('textAreaEditTip' + i).setContent($scope.tipArrayData[$scope.tipCounter].tipDescJson[i].tipDescription);
			//$("#textAreaEditTip" + i).val($scope.tipArrayData[$scope.tipCounter].tipDescJson[i].tipDescription);
		    }
		}
	    }
	    else {
		var tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
		$("#textAreaEditTip").val(tipDesc);
	    }


	    for (var f = 0; f < $scope.filters.length; f++) {
		for (var i = 0; i < $scope.tipArrayData[$scope.tipCounter].filtersJson.length; i++) {
		    if ($scope.filters[f].name == $scope.tipArrayData[$scope.tipCounter].filtersJson[i].name) {
			$scope.filters[f].inputToggle = $scope.tipArrayData[$scope.tipCounter].filtersJson[i].toggle;

		    }
		}
	    }
	    /*
	     for (var i = 0; i < $scope.tipArrayData[$scope.tipCounter].dawJson.length; i++) {
	     var dawName = $scope.tipArrayData[$scope.tipCounter].dawJson[i].dawName;
	     
	     if ($scope.tipArrayData[$scope.tipCounter].dawJson[i].dawToggle) {
	     if (dawName) {
	     $("#editInputDawId" + dawName).prop("checked", true);
	     }
	     }
	     else {
	     if (dawName) {
	     $("#editInputDawId" + dawName).prop("checked", false);
	     }
	     }
	     
	     }
	     
	     //Mark VST
	     for (var i = 0; i < $scope.tipArrayData[$scope.tipCounter].vstJson.length; i++) {
	     var vstName = $scope.tipArrayData[$scope.tipCounter].vstJson[i].vstName;
	     if ($scope.tipArrayData[$scope.tipCounter].vstJson[i].vstToggle) {
	     if (vstName) {
	     $("#editInputVstId" + vstName).prop("checked", true);
	     }
	     
	     }
	     else {
	     $("#editInputVstId" + vstName).prop("checked", false);
	     
	     }
	     }
	     //Mark Genre
	     for (var i = 0; i < $scope.tipArrayData[$scope.tipCounter].genreJson.length; i++) {
	     var genreName = $scope.tipArrayData[$scope.tipCounter].genreJson[i].genreName;
	     if ($scope.tipArrayData[$scope.tipCounter].genreJson[i].genreToggle) {
	     if (genreName) {
	     $("#editInputGenreId" + genreName).prop("checked", true);
	     }
	     }
	     else {
	     $("#editInputGenreId" + genreName).prop("checked", false);
	     }
	     }
	     //Mark Tip TYPE
	     $("#editMixingYes").prop("checked", $scope.tipArrayData[$scope.tipCounter].tipTypeJson.mixingTip);
	     $("#editTheoryYes").prop("checked", $scope.tipArrayData[$scope.tipCounter].tipTypeJson.theoryTip);
	     $("#editMasteringYes").prop("checked", $scope.tipArrayData[$scope.tipCounter].tipTypeJson.masteringTip);
	     $("#editWorkFlowYes").prop("checked", $scope.tipArrayData[$scope.tipCounter].tipTypeJson.workFlowTip);
	     $("#editSoundDesignYes").prop("checked", $scope.tipArrayData[$scope.tipCounter].tipTypeJson.soundDesignTip);
	     */
	}
	$scope.descriptionCounter = 1;
	$scope.addDescription = function () {
	    $scope.descriptionCounter++;
	    var textArea = $('<textarea/>');
	    textArea.prop("id", "textAreaTip" + $scope.descriptionCounter);
	    textArea.prop("placeholder", "Tip Description " + $scope.descriptionCounter);
	    textArea.addClass("form-control");
	    textArea.addClass("tipDescInput");
	    $("#descriptionWrapper").append(textArea);
	    tinyMCE.init({
		selector: '#textAreaTip' + $scope.descriptionCounter,
		plugins: "link",
		menubar: 'file edit insert view format table tools',
		toolbar: "link | fontselect| undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
		target_list: [
		    {title: 'None', value: ''},
		    {title: 'Same page', value: '_self'},
		    {title: 'New page', value: '_blank'},
		    {title: 'LIghtbox', value: '_lightbox'}
		],
		font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n'

	    });
	}
	$scope.subtractDescription = function () {
	    if ($scope.descriptionCounter > 1) {
		tinyMCE.remove('#textAreaTip' + $scope.descriptionCounter);
		$("#textAreaTip" + $scope.descriptionCounter).last().remove();
		$scope.descriptionCounter--;

	    }
	}
	$scope.editAddDescription = function () {
	    $scope.descriptionCounter++;
	    var textArea = $('<textarea/>');
	    textArea.prop("id", "textAreaEditTip" + $scope.descriptionCounter);
	    textArea.prop("placeholder", "Tip Description " + $scope.descriptionCounter);
	    textArea.addClass("form-control");
	    textArea.addClass("tipDescInput");
	    $("#editDescriptionWrapper").append(textArea);
	    tinyMCE.init({
		selector: '#textAreaEditTip' + $scope.descriptionCounter,
		plugins: "link",
		menubar: 'file edit insert view format table tools',
		toolbar: "link |fontselect| undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
		target_list: [
		    {title: 'None', value: ''},
		    {title: 'Same page', value: '_self'},
		    {title: 'New page', value: '_blank'},
		    {title: 'LIghtbox', value: '_lightbox'}
		],
		font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n'
	    });
	}
	$scope.editSubtractDescription = function () {
	    tinyMCE.remove('#textAreaEditTip' + $scope.descriptionCounter);
	    if ($scope.descriptionCounter > 1) {
		$("#textAreaEditTip" + $scope.descriptionCounter).last().remove();
		$scope.descriptionCounter--;
	    }
	}
	$scope.removeAllButOneTipDescriptions = function (editOrAdd) {
	    if (editOrAdd == "Add") {
		for (i = $scope.descriptionCounter; i > 1; i--) {
		    tinyMCE.remove('#textAreaTip' + $scope.descriptionCounter);
		    $("#textAreaTip" + $scope.descriptionCounter).last().remove();
		    $scope.descriptionCounter--;
		}
	    }
	    else if (editOrAdd == "Edit") {
		for (i = $scope.descriptionCounter; i > 1; i--) {
		    tinyMCE.remove('#textAreaEditTip' + $scope.descriptionCounter);
		    $("#textAreaEditTip" + $scope.descriptionCounter).last().remove();
		    $scope.descriptionCounter--;
		}
	    }
	    $scope.descriptionCounter = 1;
	}

	$scope.getDescription = function (tipNumber) {
	    if ($scope.tipArrayData.length != 0) {
		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("tipDescJson")) {
		    return $scope.tipArrayData[$scope.tipCounter].tipDescJson[tipNumber].tipDescription;
		}
		else {
		    return $scope.tipDesc;
		}
	    }
	    return false;
	}

	$scope.editSubmitButtonClicked = function () {
	    //dd tip to database
	    var tipTitle = $("#tipTitleEditInput").val();
	    var tipId = $scope.tipArrayData[$scope.tipCounter]._id;

	    var tipDescObject = [{tipDescriptionCounter: $scope.descriptionCounter}]
	    //Collect Tip Description JSON
	    for (var i = 1; i <= $scope.descriptionCounter; i++) {
		if (i == 1) {
		    // var tipDescriptionLocal = $("#textAreaEditTip").val();
		    var tipDescriptionLocal = tinyMCE.get('textAreaEditTip').getContent();
		    tipDescObject[i] = {tipNumber: i, tipDescription: tipDescriptionLocal}
		}
		else {
		    //var tipDescriptionLocal = $("#textAreaEditTip" + i).val();
		    var tipDescriptionLocal = tinyMCE.get('textAreaEditTip' + i).getContent();
		    tipDescObject[i] = {tipNumber: i, tipDescription: tipDescriptionLocal}
		}
	    }
	    var tipDescObjectJson = JSON.stringify(tipDescObject);


	    var genreObject = [{}]


	    var vstObject = [{}]


	    var vstObjectJson = JSON.stringify(vstObject);

	    var dawObject = [{}]

	    var dawObjectJson = JSON.stringify(dawObject);

	    var updatingImages = false;

	    //if(($scope.tipBodyArray.length != $scope.tipArrayData[$scope.tipCounter].imageDataJson.length) || $scope.removeImageBodyArray){
	    var imageDataObject = [];
	    for (var i = 0; i < $scope.tipImageArray.length; i++) {
		var imageName = "";
		if (!runningProduction) {
		    imageName = $scope.tipImageArray[i].imageFileName.replace("resources/images/", "");
		}
		else {
		    imageName = $scope.tipImageArray[i].imageFileName
		}
		imageDataObject.push({imageName: imageName, imageSize: 0,
		    dateModified: 0, newFileName: imageName});
	    }
	    var imageDataObjectJson = JSON.stringify(imageDataObject);
	    updatingImages = true;
	    //}


	    /*   if ($scope.uploader.queue.length > 0) {
	     var imageDataObject = $scope.tipArrayData[$scope.tipCounter].imageDataJson;
	     for (var i = 0; i < $scope.uploader.queue.length; i++) {
	     imageDataObject.push({imageName: $scope.uploader.queue[i]._file.name, imageSize: $scope.uploader.queue[i]._file.size,
	     dateModified: $scope.uploader.queue[i]._file.lastModifiedDate, newFileName: $scope.uploadedImages[i]});
	     }
	     var imageDataObjectJson = JSON.stringify(imageDataObject);
	     updatingImages = true;
	     }*/


	    var videoLink = $("#editVideoLink")[0].value;
	    var videoLinkObject = {videoLink: videoLink};
	    var videoLinkJson = JSON.stringify(videoLinkObject);

	    var filtersData = [];
	    for (var i = 0; i < $scope.filters.length; i++) {
		var imageName = "";

		filtersData.push({name: $scope.filters[i].name, toggle: $scope.filters[i].inputToggle});
	    }
	    var filtersJson = JSON.stringify(filtersData);


	    var tipPoints;
	    if ($scope.tipArrayData[$scope.tipCounter].tipPoints) {
		tipPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints;
	    }
	    else {
		tipPoints = 1;
	    }
	    var req = "";

	    var date = $scope.tipArrayData[$scope.tipCounter].dateSubmitted;

	    var genreObjectJson = JSON.stringify([]);
	    var tipTypeObjectJson = JSON.stringify([]);

	    if (updatingImages) {
		req = {
		    method: 'PUT',
		    url: '/tipsPagePut',
		    headers: {
			'Content-Type': "application/json"
		    },
		    data: {tipId: tipId,
			tipTitle: tipTitle,
			tipDescJson: tipDescObjectJson,
			genreJson: genreObjectJson,
			tipTypeJson: tipTypeObjectJson,
			vstJson: vstObjectJson,
			dawJson: dawObjectJson,
			imageDataJson: imageDataObjectJson,
			videoLinkJson: videoLinkJson,
			filtersJson: filtersJson,
			submittedBy: $localStorage.username,
			points: tipPoints,
			dateSubmitted: date
		    }

		}
	    }
	    else {
		req = {
		    method: 'PUT',
		    url: '/tipsPagePut',
		    headers: {
			'Content-Type': "application/json"
		    },
		    data: {tipId: tipId,
			tipTitle: tipTitle,
			tipDescJson: tipDescObjectJson,
			genreJson: genreObjectJson,
			tipTypeJson: tipTypeObjectJson,
			vstJson: vstObjectJson,
			dawJson: dawObjectJson,
			imageDataJson: imageDataObjectJson,
			filtersJson: filtersJson,
			submittedBy: $localStorage.username,
			points: tipPoints,
			dateSubmitted: date
		    }

		}
	    }

	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.responseData = response.data;
		$scope.getTipsFromMongo();//add to current tips array
		$scope.editATipToggle = false;
	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });

	}





	$scope.navBarHoverMouseOver = function (tip) {

	    tip.hoverActive = true;
	}
	$scope.rightBarWidgetMouseOver = function (tip) {
	    tip.hoverRightActive = true;

	}
	$scope.navBarHoverMouseLeave = function (tip) {
	    $("#navBarBottomRow" + tip._id).removeClass('animated');
	    tip.hoverActive = false;
	}
	$scope.navBarHoverRightMouseLeave = function (tip) {
	    // $("#navBarBottomRow"+tip._id).removeClass('animated');
	    tip.hoverRightActive = false;
	}

	$scope.tipNavBarClicked = function (tip) {
	    var tipIdClicked = tip._id;
	    var tipObjClicked = $("#tipsWrapper" + tipIdClicked);
	    var tipObjClickedOffset = tipObjClicked[0].offsetTop;
	    var scrollWrapper = $("#tipsScrollWrapper");
	    scrollWrapper.scrollTop(tipObjClickedOffset - 90);

	    $scope.tipCounter = $scope.findInTipArray(tip._id);
	    // $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle
	    // $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
	    // $scope.submittedBy = $scope.tipArrayData[$scope.tipCounter].submittedBy;

	    $scope.addATipToggle = false;
	    $scope.editATipToggle = false;
	    $scope.updateBodyArray();

	    //   $scope.updateImageFileName();

	}

	var convertTipDataToJson = function () {
	    for (var i = 0; i < $scope.tipArrayData.length; i++) {
		if ($scope.tipArrayData[i].dawJson) {
		    if ($scope.tipArrayData[i].hasOwnProperty("tipDescJson")) {
			$scope.tipArrayData[i].tipDescJson = JSON.parse($scope.tipArrayData[i].tipDescJson);
		    }
		    $scope.tipArrayData[i].dawJson = JSON.parse($scope.tipArrayData[i].dawJson);
		    $scope.tipArrayData[i].genreJson = JSON.parse($scope.tipArrayData[i].genreJson);
		    $scope.tipArrayData[i].imageDataJson = JSON.parse($scope.tipArrayData[i].imageDataJson);
		    $scope.tipArrayData[i].tipTypeJson = JSON.parse($scope.tipArrayData[i].tipTypeJson);
		    $scope.tipArrayData[i].videoLinkJson = JSON.parse($scope.tipArrayData[i].videoLinkJson);
		    $scope.tipArrayData[i].filtersJson = JSON.parse($scope.tipArrayData[i].filtersJson);
		    $scope.tipArrayData[i].vstJson = JSON.parse($scope.tipArrayData[i].vstJson);
		}
	    }
	}
	function compare(a, b) {
	    if (a.tipTitle < b.tipTitle)
		return -1;
	    if (a.tipTitle > b.tipTitle)
		return 1;
	    return 0;
	}

	$scope.getTipsFromMongo = function () {
	    //dd tip to database

	    var req = {
		method: 'GET',
		url: '/tipsPageGet',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {}
	    }


	    $http(req).then(function success(response) {
		$scope.tipArrayData = response.data;
		$scope.tipArrayData.sort(compare);
		convertTipDataToJson();
		
		$scope.profileDataFromMongo();
		CommentsService.getComments().then(function (response) {
		    for (var i = 0; i < $scope.tipArrayData.length; i++) {

			$scope.tipArrayData[i].parentComments = [];
			$scope.tipArrayData[i].replyComments = [];
			$scope.tipArrayData[i].comments = [];

		    }

		    $scope.setTipComments(response.data);
		});

		//Update comments
		CommentsService.getCommentsWithTipId($scope.tipArrayData[$scope.tipCounter]._id).then(function (response) {

		    var comment = response.data;
		    //setTipComments();
		});


		for (var i = 0; i < $scope.tipArrayData.length; i++) {
		    $scope.tipArrayData[i].showComments = true;
//		    $scope.updateBodyArray();
//		    $scope.tipCounter++
		}
		//$scope.tipCounter =  $scope.tipArrayData.length - 1;
		$scope.setCurrentTipCounter($scope.currentTipId);

		$scope.submitMessage = "Success"
		$scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle
		$scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
		$scope.submittedBy = $scope.tipArrayData[$scope.tipCounter].submittedBy;
		//	$scope.updateImageFileName();
		$scope.updateBodyArray();
		$scope.navBarArray = "[";
		for (var i = 0; i < $scope.tipArrayData.length; i++) {
		    var object = '{text:"' + $scope.tipArrayData[i].tipTitle + '",href:"#"},';
		    $scope.navBarArray += object;

		}
		//$scope.tipCounter = $scope.tipArrayData.length-1;
		$scope.navBarArray += "]"
	    }, function failure(response) {

		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });


	}


	$scope.updateTipDataWithLovedTipData = function () {
	    for (var i = 0; i < $scope.tipArrayData.length; i++) {
		$scope.tipArrayData[i].isLoved = false;
		for (var j = 0; j < $scope.lovedTipsArray.length; j++) {
		    var tipId = $scope.tipArrayData[i]._id;
		    var profileId = $scope.lovedTipsArray[j];
		    if (tipId == profileId) {
			$scope.tipArrayData[i].isLoved = true;
		    }
		}
	    }
	}
	$scope.updateTipDataWithLikedTipData = function () {
	    for (var i = 0; i < $scope.tipArrayData.length; i++) {
		$scope.tipArrayData[i].isLiked = false;
		for (var j = 0; j < $scope.likedTipsArray.length; j++) {
		    var tipId = $scope.tipArrayData[i]._id;
		    var profileId = $scope.likedTipsArray[j];
		    if (tipId == profileId) {
			$scope.tipArrayData[i].isLiked = true;
		    }
		}
	    }
	}
	$scope.updateTipDataWithDislikedTipData = function () {
	    for (var i = 0; i < $scope.tipArrayData.length; i++) {
		$scope.tipArrayData[i].isDisliked = false;
		for (var j = 0; j < $scope.dislikedTipsArray.length; j++) {
		    var tipId = $scope.tipArrayData[i]._id;
		    var profileId = $scope.dislikedTipsArray[j];
		    if (tipId == profileId) {
			$scope.tipArrayData[i].isDisliked = true;
		    }
		}
	    }
	}


	$scope.profileDataFromMongo = function () {
	    var username = $localStorage.username;
	    var req = {
		method: 'POST',
		url: '/profileInfoPostGet/' + username,
		headers: {
		    'Content-Type': "application/json"
		},
		data: {userName: username}
	    }
	    $http(req).then(function success(response) {
		if (response.data.length > 0) {
		    var responseData = response.data[0];
		    if (responseData.hasOwnProperty('lovedTipsJson')) {
			$scope.lovedTipsArray = JSON.parse(responseData.lovedTipsJson);
			$scope.updateTipDataWithLovedTipData();
		    }
		    if (responseData.hasOwnProperty('likedTipsJson')) {
			$scope.likedTipsArray = JSON.parse(responseData.likedTipsJson);
			$scope.updateTipDataWithLikedTipData();
		    }
		    if (responseData.hasOwnProperty('dislikedTipsJson')) {
			$scope.dislikedTipsArray = JSON.parse(responseData.dislikedTipsJson);
			$scope.updateTipDataWithDislikedTipData();
		    }

		    if (responseData.hasOwnProperty('submittedTips')) {
			$scope.submittedTipsArray = JSON.parse(responseData.submittedTips);
		    }


		}
	    }, function failure(response) {

		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });
	    //$scope.updateBodyArray();

	}

	$scope.submittedDate = "";

	//Update Tip arrays when the tip is changed
	$scope.updateBodyArray = function () {
	    if ($scope.tipArrayData.length) {
		$scope.tipBodyArray = [];
		$scope.tipImageArray = [];
		$scope.tipArrayData[$scope.tipCounter].tipImageArray = [];
		$scope.tipArrayData[$scope.tipCounter].tipBodyArray = []

		for (var i = 0; i < $scope.tipArrayData.length; i++) {
		    $scope.tipArrayData[i].isActive = false;
		}
		$scope.tipArrayData[$scope.tipCounter].isActive = true;


		$scope.currentTipId = $scope.tipArrayData[$scope.tipCounter]._id
		$scope.currentTipPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints;
		$scope.removeImageBodyArray = false;
		$scope.submittedDate = $scope.tipArrayData[$scope.tipCounter].dateSubmitted;


		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("tipDescJson")) {

		    for (var i = 1; i < $scope.tipArrayData[$scope.tipCounter].tipDescJson.length; i++) {
			var tipDescriptionLocal = $scope.tipArrayData[$scope.tipCounter].tipDescJson[i].tipDescription;
			var submittedByLocal = $scope.tipArrayData[$scope.tipCounter].submittedBy;
			var submittedDateLocal = $scope.tipArrayData[$scope.tipCounter].dateSubmitted;
			var imageFileNameLocal = "";

			if ($scope.tipArrayData[$scope.tipCounter].imageDataJson[i - 1]) {
			    imageFileNameLocal = $scope.tipArrayData[$scope.tipCounter].imageDataJson[i - 1].newFileName;
			}

			if (!runningProduction) {
			    imageFileNameLocal = "resources/images/" + imageFileNameLocal;
			}
			var hasImage = (imageFileNameLocal != "" && imageFileNameLocal != "resources/images/" && imageFileNameLocal != "resources/images/undefined");
			$scope.tipArrayData[$scope.tipCounter].tipBodyArray.push({tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: hasImage, submittedBy: submittedByLocal, submittedDate: submittedDateLocal})
			if (hasImage) {
			    $scope.tipArrayData[$scope.tipCounter].tipImageArray.push({tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: hasImage, submittedBy: submittedByLocal, submittedDate: submittedDateLocal});
			}
		    }
		}
		if (($scope.tipArrayData[$scope.tipCounter].tipDescJson.length) <= $scope.tipArrayData[$scope.tipCounter].imageDataJson.length) {
		    var i = $scope.tipArrayData[$scope.tipCounter].tipDescJson.length - 1;
		    for (var i; i < $scope.tipArrayData[$scope.tipCounter].imageDataJson.length; i++) {
			var tipDescriptionLocal = "";
			var submittedByLocal = $scope.tipArrayData[$scope.tipCounter].submittedBy;
			var submittedDateLocal = $scope.tipArrayData[$scope.tipCounter].dateSubmitted;
			var imageFileNameLocal = "";
			if ($scope.tipArrayData[$scope.tipCounter].imageDataJson[i]) {
			    imageFileNameLocal = $scope.tipArrayData[$scope.tipCounter].imageDataJson[i].newFileName;
			}
			if (!runningProduction) {
			    imageFileNameLocal = "resources/images/" + imageFileNameLocal;
			}
			var hasImage = (imageFileNameLocal != "" && imageFileNameLocal != "resources/images/");
			if (hasImage) {
			    $scope.tipArrayData[$scope.tipCounter].tipImageArray.push({tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: hasImage, submittedBy: submittedByLocal, submittedDate: submittedDateLocal})
			    $scope.tipArrayData[$scope.tipCounter].tipBodyArray.push({tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: hasImage, submittedBy: submittedByLocal, submittedDate: submittedDateLocal})
			}
		    }
		}



		$scope.tipTagsArray = [];
		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("tipTypeJson")) {
		    var isMastering = $scope.tipArrayData[$scope.tipCounter].tipTypeJson['masteringTip'];
		    var isMixing = $scope.tipArrayData[$scope.tipCounter].tipTypeJson['mixingTip'];
		    var isSoundDesign = $scope.tipArrayData[$scope.tipCounter].tipTypeJson['soundDesignTip'];
		    var isTheory = $scope.tipArrayData[$scope.tipCounter].tipTypeJson['theoryTip'];
		    var isWorkFlow = $scope.tipArrayData[$scope.tipCounter].tipTypeJson['workFlowTip'];

		    if (isMastering) {
			$scope.tipTagsArray.push('Mastering');
		    }
		    if (isMixing) {
			$scope.tipTagsArray.push('Mixing');
		    }
		    if (isSoundDesign) {
			$scope.tipTagsArray.push('Sound Design');
		    }
		    if (isTheory) {
			$scope.tipTagsArray.push('Theory');
		    }
		    if (isWorkFlow) {
			$scope.tipTagsArray.push('Work Flow');
		    }
		}
		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("genreJson")) {
		    for (var i = 1; i < $scope.tipArrayData[$scope.tipCounter].genreJson.length; i++) {
			var genreObj = $scope.tipArrayData[$scope.tipCounter].genreJson[i];
			if (genreObj.genreToggle) {
			    $scope.tipTagsArray.push(genreObj.genreName);
			}
		    }
		}
		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("dawJson")) {
		    for (var i = 1; i < $scope.tipArrayData[$scope.tipCounter].dawJson.length; i++) {
			var dawObj = $scope.tipArrayData[$scope.tipCounter].dawJson[i];
			if (dawObj.dawToggle) {
			    $scope.tipTagsArray.push(dawObj.dawName);
			}
		    }
		}
		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("vstJson")) {
		    for (var i = 1; i < $scope.tipArrayData[$scope.tipCounter].vstJson.length; i++) {
			var vstObj = $scope.tipArrayData[$scope.tipCounter].vstJson[i];
			if (vstObj.vstToggle) {
			    $scope.tipTagsArray.push(vstObj.vstName);
			}
		    }
		}







		$scope.showButton('Edit');
		$scope.showButton('Delete');
//		$('html, body').animate({
//			scrollTop: $("#filterWrapper").offset().top
//		   }, 1000);
	    }
	}

	$scope.setTipComments = function (comments) {


	    if (comments) {
		for (var i = 0; i < comments.length; i++) {
		    comments[i].showReplies = true;
		    var tipId = comments[i].tip_id;
		    var tipCounter = $scope.findInTipArray(tipId);
		    $scope.tipArrayData[tipCounter].comments.push(comments[i]);
		    if (comments[i].parentComment_id == -1) {

			$scope.tipArrayData[tipCounter].parentComments.push(comments[i]);
		    }
		    else {
			$scope.tipArrayData[tipCounter].replyComments.push(comments[i]);
		    }

		}
	    }

	    var test = $scope.tipArrayData;
	}
	$scope.getReplys = function (tip, comment) {
	    var tipCounter = $scope.findInTipArray(tip._id);
	    var reply_array = [];
	    if ($scope.tipArrayData[tipCounter].replyComments) {
		for (var i = 0; i < $scope.tipArrayData[tipCounter].replyComments.length; i++) {
		    if (comment._id == $scope.tipArrayData[tipCounter].replyComments[i].parentComment_id) {
			reply_array.push($scope.tipArrayData[tipCounter].replyComments[i])
		    }

		}
	    }
	    return reply_array;
	}
	$scope.setReplyComments = function (tipId, comment) {
	    var tipCounter = $scope.findInTipArray(tipId);
	    if ($scope.tipArrayData[tipCounter].comments) {
		for (var i = 0; i < $scope.tipArrayData[tipCounter].comments.length; i++) {
		    var comment = $scope.tipArrayData[tipCounter].comments[i];


		}

	    }
	}
	$scope.getComments = function (tipId) {
	    var tipCounter = $scope.findInTipArray(tipId);
	    $scope.setReplyComments(tipId);
	    return $scope.tipArrayData[tipCounter].comments

	}


	$scope.updateProfile = function () {
	    var tipId = $scope.tipArrayData[$scope.tipCounter]._id;
	    var userName = $localStorage.username;
	    var likedTipsJson = JSON.stringify($scope.likedTipsArray);
	    var lovedTipsJson = JSON.stringify($scope.lovedTipsArray);
	    var dislikedTipsJson = JSON.stringify($scope.dislikedTipsArray);
	    var tipsSubmittedJson = JSON.stringify($scope.submittedTipsArray);

	    var req = {
		method: 'PUT',
		url: '/tipsPageUpdateProfile',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {username: userName,
		    lovedTips: lovedTipsJson,
		    likedTips: likedTipsJson,
		    dislikedTips: dislikedTipsJson,
		    submittedTips: tipsSubmittedJson
		}
	    }

	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.profileUpdateData = response.data;
		$scope.getTipsFromMongo();//add to current tips array

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.profileUpdateData = response.data;

	    });

	}
	$scope.likedTipsArray = [];
	$scope.lovedTipsArray = [];
	$scope.dislikedTipsArray = [];
	$scope.submittedTipsArray = [];

	$scope.loveButtonClicked = function (tip) {
	    $scope.tipClicked(tip);
	    if (!$scope.isLoggedIn()) {
		$scope.likedTipsArray = [];
		$scope.lovedTipsArray = [];
		$scope.dislikedTipsArray = [];
		$(location).attr('href', '/signUp');

	    }
	    else {
		var tipId = $scope.tipArrayData[$scope.tipCounter]._id;
		var lovedIndex = $scope.lovedTipsArray.indexOf(tipId);
		var likedIndex = $scope.likedTipsArray.indexOf(tipId);
		var dislikedIndex = $scope.dislikedTipsArray.indexOf(tipId);
		//var currentPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints; 
		var updatedPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints;
		//Not found in loved array push it on
		if (lovedIndex == -1) {
		    $scope.lovedTipsArray.push(tipId)
		}
		else {
		    $scope.lovedTipsArray.splice(lovedIndex, 1);
		    updatedPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints - 2;
		}
		if (likedIndex > -1) {
		    $scope.likedTipsArray.splice(likedIndex, 1);
		    $scope.tipArrayData[$scope.tipCounter].tipPoints--;
		}
		if (dislikedIndex > -1) {
		    $scope.dislikedTipsArray.splice(dislikedIndex, 1);
		    $scope.tipArrayData[$scope.tipCounter].tipPoints++;
		}

		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty('tipPoints')) {
		    if (lovedIndex == -1) {
			updatedPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints + 2;
		    }
		}
		else {
		    updatedPoints = 2;
		}
		$scope.updateTipPoints(updatedPoints);
		$scope.updateProfile();
	    }
	}
	$scope.likeButtonClicked = function (tip) {
	     $scope.tipClicked(tip);
	    if (!$scope.isLoggedIn()) {
		$scope.likedTipsArray = [];
		$scope.lovedTipsArray = [];
		$scope.dislikedTipsArray = [];
		$(location).attr('href', '/signUp');

	    }
	    else {
		var tipId = $scope.tipArrayData[$scope.tipCounter]._id;
		var lovedIndex = $scope.lovedTipsArray.indexOf(tipId);
		var likedIndex = $scope.likedTipsArray.indexOf(tipId);
		var dislikedIndex = $scope.dislikedTipsArray.indexOf(tipId);

		var updatedPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints;
		//Not found in loved array push it on
		if (likedIndex == -1) {
		    $scope.likedTipsArray.push(tipId)
		}
		else {
		    $scope.likedTipsArray.splice(likedIndex, 1);
		    updatedPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints - 1;
		}
		if (lovedIndex > -1) {
		    $scope.lovedTipsArray.splice(lovedIndex, 1);
		    $scope.tipArrayData[$scope.tipCounter].tipPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints - 2;
		}
		if (dislikedIndex > -1) {
		    $scope.dislikedTipsArray.splice(dislikedIndex, 1);
		    $scope.tipArrayData[$scope.tipCounter].tipPoints++;
		}

		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty('tipPoints')) {
		    if (likedIndex == -1) {
			updatedPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints + 1;
		    }
		}
		else {
		    updatedPoints = 1;
		}
		$scope.updateTipPoints(updatedPoints);
		$scope.updateProfile();
	    }
	}
	$scope.dislikeButtonClicked = function (tip) {
	     $scope.tipClicked(tip);
	    if (!$scope.isLoggedIn()) {
		$scope.likedTipsArray = [];
		$scope.lovedTipsArray = [];
		$scope.dislikedTipsArray = [];
		$(location).attr('href', '/signUp');

	    }
	    else {
		var tipId = $scope.tipArrayData[$scope.tipCounter]._id;
		var lovedIndex = $scope.lovedTipsArray.indexOf(tipId);
		var likedIndex = $scope.likedTipsArray.indexOf(tipId);
		var dislikedIndex = $scope.dislikedTipsArray.indexOf(tipId);
		var currentPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints;
		var updatedPoints;
		//Not found in loved array push it on
		if (dislikedIndex == -1) {
		    $scope.dislikedTipsArray.push(tipId)
		}
		else {
		    $scope.dislikedTipsArray.splice(dislikedIndex, 1);
		    updatedPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints + 1;
		}
		if (lovedIndex > -1) {
		    $scope.lovedTipsArray.splice(lovedIndex, 1);
		    $scope.tipArrayData[$scope.tipCounter].tipPoints = currentPoints - 2;
		}
		if (likedIndex > -1) {
		    $scope.likedTipsArray.splice(likedIndex, 1);
		    $scope.tipArrayData[$scope.tipCounter].tipPoints--;
		}

		if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty('tipPoints')) {
		    if (dislikedIndex == -1) {
			updatedPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints - 1;
		    }
		}
		else {
		    updatedPoints = 1;
		}
		$scope.updateTipPoints(updatedPoints);
		$scope.updateProfile();
	    }
	}

	$scope.updateTipPoints = function (updatedPoints) {
	    var tipId = $scope.tipArrayData[$scope.tipCounter]._id;
	    var req = {
		method: 'PUT',
		url: '/tipsPageUpdatePoints',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {tipId: tipId,
		    points: updatedPoints
		}
	    }

	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"

		$scope.getTipsFromMongo();//add to current tips array

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });
	}

	$scope.nextButtonClicked = function () {
	    var orginalTipCounter = $scope.tipCounter;
	    $scope.tipCounter++;
	    if ($scope.tipCounter >= $scope.tipArrayData.length) {
		$scope.tipCounter = 0;
	    }

	    while (!$scope.showItem($scope.tipArrayData[$scope.tipCounter]) && orginalTipCounter != $scope.tipCounter) {
		if ($scope.tipCounter == $scope.tipArrayData.length - 1) {
		    $scope.tipCounter = 0;
		}
		else {
		    $scope.tipCounter++;
		}
	    }

	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle;
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
	    $scope.submittedBy = $scope.tipArrayData[$scope.tipCounter].submittedBy;

	    // $scope.updateImageFileName();
	    $scope.updateBodyArray();

	}
	$scope.prevButtonClicked = function () {
	    var orginalTipCounter = $scope.tipCounter;
	    $scope.tipCounter--;
	    if ($scope.tipCounter < 0) {
		$scope.tipCounter = $scope.tipArrayData.length - 1;
	    }
	    while (!$scope.showItem($scope.tipArrayData[$scope.tipCounter]) && orginalTipCounter != $scope.tipCounter) {
		if ($scope.tipCounter == 0) {
		    $scope.tipCounter = $scope.tipArrayData.length - 1;
		}
		else {
		    $scope.tipCounter--;
		}
	    }
	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle;
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
	    $scope.submittedBy = $scope.tipArrayData[$scope.tipCounter].submittedBy;
	    //  $scope.updateImageFileName();
	    $scope.updateBodyArray();
	}
	$scope.backToTipsClicked = function () {   //dd tip to database
	    $scope.addATipToggle = false;
	    $scope.editATipToggle = false;
	}

	tinyMCE.init({
	    selector: '#textAreaTip',
	    plugins: "link image paste lists advlist",
	    menubar: 'file edit insert view format table tools',
	    toolbar: "link | undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
	    target_list: [
		{title: 'None', value: ''},
		{title: 'Same page', value: '_self'},
		{title: 'New page', value: '_blank'},
		{title: 'LIghtbox', value: '_lightbox'}
	    ], paste_as_text: false,
	    forced_root_block: '', force_br_newlines: true,
	    force_p_newlines: false,
	    advlist_bullet_styles: "square"

		    //font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
	});
	tinyMCE.init({
	    selector: '#textAreaEditTip',
	    plugins: "link image  paste lists advlist",
	    menubar: 'file edit insert view format table tools',
	    toolbar: "link | undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
	    target_list: [
		{title: 'None', value: ''},
		{title: 'Same page', value: '_self'},
		{title: 'New page', value: '_blank'},
		{title: 'LIghtbox', value: '_lightbox'}
	    ],
	    paste_as_text: false,
	    forced_root_block: '',
	    force_br_newlines: true,
	    force_p_newlines: false// Needed for 3.x
	});
	$scope.isReadyForSubmit = function () {
	    var content = "";
	    if (tinyMCE.get('textAreaTip')) {
		content = tinyMCE.get('textAreaTip').getContent();
	    }
	    $scope.tipDescAdd = content;


	    var imagesUploaded = true;
	    var passedDescriptionTest = true;//(content != "" && content);
	    for (var i = 0; i < $scope.uploader.queue.length; i++) {
		if (!$scope.uploader.queue[i].isUploaded) {
		    imagesUploaded = false;
		}
	    }
	    if ($scope.tipTitleAdd == "") {
		$scope.readyForSubmitMessage = "Add title before submit";
	    }
	    else if (!passedDescriptionTest) {
		$scope.readyForSubmitMessage = "Add description before submit";
	    }
	    else if (imagesUploaded == false) {
		$scope.readyForSubmitMessage = "Upload images before submit";
	    }
	    else {
		$scope.readyForSubmitMessage = "";
	    }

	    return $scope.tipTitleAdd != "" &&
		    // ($scope.tipDescAdd != "" && $scope.tipDescAdd) &&
		    imagesUploaded;
	}
	//ADD a tip submit
	$scope.submitButtonClicked = function () {
	    //dd tip to database
	    var tipTitle = $("#tipTitleInput").val();

	    var tipDescObject = [{tipDescriptionCounter: $scope.descriptionCounter}]
	    var tipDescription = $("#textAreaTip").val();

	    for (var i = 1; i <= $scope.descriptionCounter; i++) {
		if (i == 1) {
		    var tipDescriptionLocal = tinyMCE.get('textAreaTip').getContent();
		    // var tipDescriptionLocal = $("#textAreaTip").val();
		    tipDescObject[i] = {tipNumber: i, tipDescription: tipDescriptionLocal}
		}
		else {
		    var tipDescriptionLocal = tinyMCE.get('textAreaTip' + i).getContent();
		    //var tipDescriptionLocal = $("#textAreaTip" + i).val();
		    tipDescObject[i] = {tipNumber: i, tipDescription: tipDescriptionLocal}
		}
	    }
	    var tipDescObjectJson = JSON.stringify(tipDescObject);

	    var genreObject = [{}]

	    var genreObjectJson = JSON.stringify(genreObject);


	    var tipTypeObjectJson = JSON.stringify([]);


	    var vstObject = [{}]


	    var vstObjectJson = JSON.stringify(vstObject);

	    var dawObject = [{}]

	    var dawObjectJson = JSON.stringify(dawObject);

	    //if(($scope.tipBodyArray.length != $scope.tipArrayData[$scope.tipCounter].imageDataJson.length) || $scope.removeImageBodyArray){
	    var imageDataObject = [];
	    for (var i = 0; i < $scope.tipImageArray.length; i++) {
		var imageName = "";
		if (!runningProduction) {
		    imageName = $scope.tipImageArray[i].imageFileName.replace("resources/images/", "");
		}
		else {
		    imageName = $scope.tipImageArray[i].imageFileName
		}
		imageDataObject.push({imageName: imageName, imageSize: 0,
		    dateModified: 0, newFileName: imageName});
	    }
	    var imageDataObjectJson = JSON.stringify(imageDataObject);
	    //}
	    /* var imageDataObject = [{}]
	     for (var i = 0; i < $scope.uploader.queue.length; i++) {
	     imageDataObject[i] = {imageName: $scope.uploader.queue[i]._file.name, imageSize: $scope.uploader.queue[i]._file.size,
	     dateModified: $scope.uploader.queue[i]._file.lastModifiedDate, newFileName: $scope.uploadedImages[i]};
	     }
	     */


	    var videoLink = $("#videoLink")[0].value;
	    var videoLinkObject = {videoLink: videoLink};
	    var videoLinkJson = JSON.stringify(videoLinkObject);



	    var filtersData = [];
	    for (var i = 0; i < $scope.filters.length; i++) {
		var imageName = "";

		filtersData.push({name: $scope.filters[i].name, toggle: $scope.filters[i].inputToggle});
	    }
	    var filtersJson = JSON.stringify(filtersData);

	    var req = {
		method: 'POST',
		url: '/tipsPagePost',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {tipTitle: tipTitle,
		    tipDescJson: tipDescObjectJson,
		    genreJson: genreObjectJson,
		    tipTypeJson: tipTypeObjectJson,
		    vstJson: vstObjectJson,
		    dawJson: dawObjectJson,
		    imageDataJson: imageDataObjectJson,
		    videoLinkJson: videoLinkJson,
		    filtersJson: filtersJson,
		    submittedBy: $localStorage.username,
		    points: 0,
		    dateSubmitted: new Date(),
		}

	    }


	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		var responseDataId = response.data._id;
		$scope.submittedTipsArray.push(responseDataId);
		$scope.updateProfile();
		$scope.getTipsFromMongo();//add to current tips array
		$scope.addATipToggle = false;

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });
	    //Send Request to update profile info 





	}
	$scope.emailListSignUpUserEmail = "";
	$scope.emailListSignUpUserPassword = "";
	$scope.emailListSignUpUserPasswordVerify = "";

	$scope.signUpEmailReportSubmit = function () {
	    var req = {
		method: 'POST',
		url: '../users/signUpTips',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {userEmail: $scope.emailListSignUpUserEmail,
		    userPassword: $scope.emailListSignUpUserPassword}

	    }
	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.responseData = response.data;

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });
	}
	$scope.signUpDisabled = function () {
	    return ($scope.emailListSignUpUserEmail == "" || $scope.emailListSignUpUserPassword == "" || $scope.emailListSignUpUserPasswordVerify == "")

	}

	$scope.deleteFilter = function () {
	    if ($scope.filterSelectedDelete) {

		var req = {
		    method: 'DELETE',
		    url: '/deleteFilter/' + $scope.filterSelectedDelete._id,
		    headers: {
			'Content-Type': "application/json"
		    },
		    data: {
		    }

		}
		$http(req).then(function success(response) {
		    $scope.submitMessage = "Success"
		    $scope.responseData = response.data;

		}, function failure(response) {
		    $scope.submitMessage = "Failure"
		    $scope.responseData = response.data;

		});

	    }
	}

	$scope.addFilterToggle = false;

	$scope.addFilter = function () {
	    var name = null;
	    if ($scope.filterParent) {
		name = $scope.filterParent.name;
	    }
	    if ($scope.filterName != "" && $scope.filterSelected != "") {
		var req = {
		    method: 'POST',
		    url: '/addFilter',
		    headers: {
			'Content-Type': "application/json"
		    },
		    data: {name: $scope.filterName,
			type: $scope.filterSelected,
			parent: name}

		}
		$http(req).then(function success(response) {
		    $scope.submitMessage = "Success"
		    $scope.responseData = response.data;

		}, function failure(response) {
		    $scope.submitMessage = "Failure"
		    $scope.responseData = response.data;

		});
	    }
	};
	$scope.filterClicked = function (filter) {
	    filter.toggle = !filter.toggle;
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

	$scope.filterHeaders = ['Type', 'Genre', 'DAW', 'VST'];
	$scope.parentFilters = ['Trance', 'House'];
	$scope.genreArray = [{genreName: "House", toggle: false, subgenres: [{subGenreName: "Progressive House"}]},
	    {genreName: "Trance", toggle: false, subgenres: [{subGenreName: "Acid Trance"}, {subGenreName: "Progressive Trance"}]},
	    {genreName: "Breakbeat", toggle: false},
	    {genreName: "Downtempo", toggle: false},
	    {genreName: "Techno", toggle: false},
	    {genreName: "Hardcore", toggle: false},
	    {genreName: "Drum_and_bass", toggle: false},
	    {genreName: "Dubstep", toggle: false},
	    {genreName: "Minimal", toggle: false},
	    {genreName: "Trap", toggle: false},
	];

	$scope.vstArray = [{vstName: "Massive"},
	    {vstName: "Serum"},
	    {vstName: "Sylenth1"},
	    {vstName: "Kontakt"},
	    {vstName: "Ozone"},
	    {vstName: "Nexus"},
	    {vstName: "Spire"},
	    {vstName: "Other"},
	];

	$scope.dawArray = [{dawName: "Fl_studio"},
	    {dawName: "Ableton_Live"},
	    {dawName: "Logic_Pro"},
	    {dawName: "Pro_Tools"},
	    {dawName: "Bitwig_Studio"},
	    {dawName: "Studio_One"},
	    {dawName: "Other"},
	];

	$scope.checkBoxArray = [{caption: "Checkbox1"}, {caption: "Checkbox2"}, {caption: "Checkbox3"}];


	$scope.currentTipImageArray = {image: "resources/images/b01930a6957f7a1ffc3536132b554bb2", caption: "blah"};



	var uploader = $scope.uploader = new FileUploader({
	    url: '/uploadImage'
	});

	// FILTERS

	uploader.filters.push({
	    name: 'customFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		return this.queue.length < 10;
	    }
	});

	uploader.filters.push({
	    name: 'sizeFilter',
	    fn: function (item /*{File|FileLikeObject}*/, options) {
		console.log(item);
		return item.size <= 1000000;
	    }
	});


	// CALLBACKS
	$scope.uploadedImages = [];
	var numberOfImages = 0;

	uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
	    $scope.fileErrorMessage = "";
	    if (filter.name = 'sizeFilter') {
		$scope.fileErrorMessage = "File too big. Upload file limit 1 MB";
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


	    $scope.uploadedImages[numberOfImages] = response;

	    var imageFileNameLocal = response;
	    if (!runningProduction) {
		imageFileNameLocal = "resources/images/" + response;
	    }
	    $scope.tipImageArray.push({tipImageNumber: numberOfImages, tipDescription: "doesn'tmatter", imageFileName: imageFileNameLocal, hasImage: true, submittedBy: "submittedBy"})
	    numberOfImages++;

	};
	uploader.onCompleteAll = function () {
	    console.info('onCompleteAll');
	};

	$scope.getTipsFromMongo();
	

    }]);





