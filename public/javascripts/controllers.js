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
var runningProduction = false;

angular.module("myApp").controller('bodyController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.isLoggedIn = function () {
	    if ($localStorage.username != "") {
		return true;
	    }
	    else {
		return false;
	    }
	}

	$scope.signOutClicked = function () {
	    $localStorage.username = "";
	    $localStorage.userSignedIn = false;

	}
    }]);
angular.module("myApp").controller('signUpController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.signUpEmail = "";
	$scope.signUpPassword = "";
	$scope.signUpPasswordConfirm = "";
	$scope.$storage = $localStorage.$default({
	    username: "",
	    userSignedIn: false
	});




    }]);
angular.module("myApp").controller('signInController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.signUpEmail = "";
	$scope.signUpPassword = "";
	$scope.signUpPasswordConfirm = "";
	$scope.$storage = $localStorage.$default({
	    username: "",
	    userSignedIn: false
	});


    }]);

angular.module("myApp").controller('profileHelperController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.$storage = $localStorage.$default({
	    username: "",
	    userSignedIn: false
	});

	var username = $("#userName").html();
	$scope.username = username;
	$scope.$storage = $localStorage;
	$scope.$storage.userSignedIn = true;
	$scope.$storage.username = username;

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
			backgroundColor: "#f5f8fa",
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


angular.module("myApp").controller('bodyTipHelperController', ['$scope', '$http', '$localStorage', 'FileUploader', 'TipData', function ($scope, $http, $localStorage, FileUploader, TipData) {


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


	//Display Functions
	$scope.showButton = function (buttonName) {
	    if (buttonName == "Add") {
		if ($localStorage.username != "") {
		    return true;
		}
		else {
		    return false;
		}
	    }
	    else if (buttonName == "Edit") {
		if ($localStorage.username == "kcedge") {
		    return true;
		}
		else {
		    return false;
		}
	    }
	    else if (buttonName == "Delete") {
		if ($localStorage.username == "kcedge") {
		    return true;
		}
		else {
		    return false;
		}
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
	    return $scope.theory_toggle = !$scope.theory_toggle;
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

	$scope.filterGenreClicked = function (genreName) {
	    if (genreName == "House") {
		return $scope.house_toggle = !$scope.house_toggle;
	    }
	    if (genreName == "Trance") {
		return $scope.trance_toggle = !$scope.trance_toggle;
	    }
	    if (genreName == "Breakbeat") {
		return $scope.breakbeat_toggle = !$scope.breakbeat_toggle;
	    }
	    if (genreName == "Downtempo") {
		return $scope.downtempo_toggle = !$scope.downtempo_toggle;
	    }
	    if (genreName == "Techno") {
		return $scope.techno_toggle = !$scope.techno_toggle;
	    }
	    if (genreName == "Hardcore") {
		return $scope.hardcore_toggle = !$scope.hardcore_toggle;
	    }
	    if (genreName == "Drum_and_bass") {
		return $scope.drumandbass_toggle = !$scope.drumandbass_toggle;
	    }
	    if (genreName == "Dubstep") {
		return $scope.dubstep_toggle = !$scope.dubstep_toggle;
	    }
	    if (genreName == "Minimal") {
		return $scope.minimal_toggle = !$scope.minimal_toggle;
	    }
	    if (genreName == "Trap") {
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

	$scope.filterDawClicked = function (dawName) {
	    if (dawName == "Fl_studio") {
		return $scope.fl_studio_toggle = !$scope.fl_studio_toggle;
	    }
	    if (dawName == "Ableton_Live") {
		return $scope.ableton_live_toggle = !$scope.ableton_live_toggle;
	    }
	    if (dawName == "Logic_Pro") {
		return $scope.logic_pro_toggle = !$scope.logic_pro_toggle;
	    }
	    if (dawName == "Pro_Tools") {
		return $scope.pro_tools_toggle = !$scope.pro_tools_toggle;
	    }
	    if (dawName == "Bitwig_Studio") {
		return $scope.bitwig_studio_toggle = !$scope.bitwig_studio_toggle;
	    }
	    if (dawName == "Studio_One") {
		return $scope.studio_one_toggle = !$scope.studio_one_toggle;
	    }
	    if (dawName == "Other") {
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

	$scope.filterVstClicked = function (vstName) {
	    if (vstName == "Massive") {
		return $scope.massive_toggle = !$scope.massive_toggle;
	    }
	    if (vstName == "Serum") {
		return $scope.serum_toggle = !$scope.serum_toggle;
	    }
	    if (vstName == "Sylenth1") {
		return $scope.sylenth1_toggle = !$scope.sylenth1_toggle;
	    }
	    if (vstName == "Kontakt") {
		return $scope.kontakt_toggle = !$scope.kontakt_toggle;
	    }
	    if (vstName == "Ozone") {
		return $scope.ozone_toggle = !$scope.ozone_toggle;
	    }
	    if (vstName == "Nexus") {
		return $scope.nexus_toggle = !$scope.nexus_toggle;
	    }
	    if (vstName == "Spire") {
		return $scope.spire_toggle = !$scope.spire_toggle;
	    }
	    if (vstName == "Other") {
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
	function testTipMixing(tip) {
	    if (tip.hasOwnProperty("tipTypeJson")) {
		return (tip.tipTypeJson["mixingTip"] || !$scope.mixing_toggle)
	    }
	    else {
		return !$scope.mixing_toggle;
	    }
	}
	function testTipMastering(tip) {
	    if (tip.hasOwnProperty("tipTypeJson")) {
		return (tip.tipTypeJson["masteringTip"] || !$scope.mastering_toggle)
	    }
	    else {
		return !$scope.mastering_toggle;
	    }
	}
	function testTipWorkflow(tip) {
	    if (tip.hasOwnProperty("tipTypeJson")) {
		return (tip.tipTypeJson["workFlowTip"] || !$scope.workflow_toggle)
	    }
	    else {
		return !$scope.workflow_toggle;
	    }
	}
	function testTipSoundDesign(tip) {
	    if (tip.hasOwnProperty("tipTypeJson")) {
		return (tip.tipTypeJson["soundDesignTip"] || !$scope.sound_design_toggle)
	    }
	    else {
		return !$scope.sound_design_toggle;
	    }
	}

	function testTipGenre(tip) {
	    var passedHouse = true;
	    var passedTrance = true;
	    var passedBreakbeat = true;
	    var passedDowntempo = true;
	    var passedTechno = true;
	    var passedHardcore = true;
	    var passedDrumAndBass = true;
	    var passedDubstep = true;
	    var passedMinimal = true;
	    var passedTrap = true;
	    if (tip.hasOwnProperty("genreJson")) {
		for (var i = 0; i < tip.genreJson.length; i++) {
		    if (tip.genreJson[i].genreName == "House") {
			passedHouse = (tip.genreJson[i].genreToggle || !$scope.house_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Trance") {
			passedTrance = (tip.genreJson[i].genreToggle || !$scope.trance_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Breakbeat") {
			passedBreakbeat = (tip.genreJson[i].genreToggle || !$scope.breakbeat_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Downtempo") {
			passedDowntempo = (tip.genreJson[i].genreToggle || !$scope.downtempo_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Techno") {
			passedTechno = (tip.genreJson[i].genreToggle || !$scope.techno_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Hardcore") {
			passedHardcore = (tip.genreJson[i].genreToggle || !$scope.hardcore_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Drum_and_bass") {
			passedDrumAndBass = (tip.genreJson[i].genreToggle || !$scope.drumandbass_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Dubstep") {
			passedDubstep = (tip.genreJson[i].genreToggle || !$scope.dubstep_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Minimal") {
			passedMinimal = (tip.genreJson[i].genreToggle || !$scope.minimal_toggle)
		    }
		    if (tip.genreJson[i].genreName == "Trap") {
			passedTrap = (tip.genreJson[i].genreToggle || !$scope.trap_toggle)
		    }
		}
		return passedHouse && passedTrance && passedBreakbeat && passedDowntempo && passedTechno && passedHardcore && passedDrumAndBass && passedDubstep && passedMinimal && passedTrap;
	    }
	    else
		return !$scope.house_toggle && !$scope.trance_toggle && !$scope.breakbeat_toggle && !$scope.downtempo_toggle && !$scope.techno_toggle && !$scope.hardcore_toggle && !$scope.drumandbass_toggle && !$scope.dubstep_toggle && !$scope.minimal_toggle && !$scope.trap_toggle;

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
	    return testTipType(tip) && testTipMixing(tip) && testTipMastering(tip) && testTipWorkflow(tip) && testTipSoundDesign(tip) && testTipGenre(tip) && testTipDaw(tip) && testTipVst(tip);
	};





	//END FILTER FUNCTIONS
	$scope.navBarFilterClick = function (filter) {
	    $scope.sortType = filter;


	}
	

	$scope.sortFiltersArray = ["Tip Title ","Latest","Rating"/*, "Tip Type ", "Genre ", "Level ", "DAW "*/];
	$scope.getOrderByNavBar = function () {
	    if( $scope.sortType == "Tip Title"){
		return "tipTitle";
	    }
	    if( $scope.sortType == "Rating"){
		$scope.sortReverse = true;
		//$scope.tipArrayData.sort(compareRating);
		return "tipPoints";
		
	    }
	    if( $scope.sortType == "Latest"){
		$scope.sortReverse = true;
		//$scope.tipArrayData.sort(compareRating);
		return "dateSubmitted";
		
	    }
	    else {
		return "tipTitle";
	    }
	}



	//Sort Functions for Nav Bar
	$scope.sortType = $scope.sortFiltersArray[0]; // set the default sort type
	$scope.sortReverse = false;  // set the default sort order
	$scope.searchTerm = '';     // set the default search/filter term

	$scope.getSortType = function () {
	    return $scope.sortType;
	};
	$scope.sortReverseClicked = function () {
	    $scope.sortReverse = !$scope.sortReverse;
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


	//EDIT A TIP
	$scope.editATipToggle = false;
	$scope.editATip = function () {
	    return $scope.editATipToggle;
	}

	$scope.editATipClicked = function () {
	    $scope.editATipToggle = !$scope.editATipToggle;
	    $scope.addATipToggle = false;
	    $scope.responseData = "";

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
			$("#textAreaEditTip").val(tipDesc);
		    }
		    else {
			$scope.editAddDescription();//put text area elements into the DOM 
			$("#textAreaEditTip" + i).val($scope.tipArrayData[$scope.tipCounter].tipDescJson[i].tipDescription);
		    }
		}
	    }
	    else {
		var tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
		$("#textAreaEditTip").val(tipDesc);
	    }


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
	}
	$scope.subtractDescription = function () {
	    if ($scope.descriptionCounter > 1) {
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
	}
	$scope.editSubtractDescription = function () {
	    if ($scope.descriptionCounter > 1) {
		$("#textAreaEditTip" + $scope.descriptionCounter).last().remove();
		$scope.descriptionCounter--;
	    }
	}
	$scope.removeAllButOneTipDescriptions = function (editOrAdd) {
	    if (editOrAdd == "Add") {
		for (i = $scope.descriptionCounter; i > 1; i--) {
		    $("#textAreaTip" + $scope.descriptionCounter).last().remove();
		    $scope.descriptionCounter--;
		}
	    }
	    else if (editOrAdd == "Edit") {
		for (i = $scope.descriptionCounter; i > 1; i--) {
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
		    var tipDescriptionLocal = $("#textAreaEditTip").val();
		    tipDescObject[i] = {tipNumber: i, tipDescription: tipDescriptionLocal}
		}
		else {
		    var tipDescriptionLocal = $("#textAreaEditTip" + i).val();
		    tipDescObject[i] = {tipNumber: i, tipDescription: tipDescriptionLocal}
		}
	    }
	    var tipDescObjectJson = JSON.stringify(tipDescObject);


	    var genreObject = [{}]
	    for (var i = 0; i < $scope.genreArray.length; i++) {

		var genreToggle = $("#editInputGenreId" + $scope.genreArray[i].genreName)[0].checked;
		genreObject[i] = {genreName: $scope.genreArray[i].genreName, genreToggle: genreToggle};

	    }
	    var genreObjectJson = JSON.stringify(genreObject);


	    var theoryToggle = $("#editTheoryYes")[0].checked;
	    var mixingToggle = $("#editMixingYes")[0].checked;
	    var masteringToggle = $("#editMasteringYes")[0].checked;
	    var workFlowToggle = $("#editWorkFlowYes")[0].checked;
	    var soundDesignToggle = $("#editSoundDesignYes")[0].checked;
	    var tipTypeObject = {theoryTip: theoryToggle,
		mixingTip: mixingToggle,
		masteringTip: masteringToggle,
		workFlowTip: workFlowToggle,
		soundDesignTip: soundDesignToggle};

	    var tipTypeObjectJson = JSON.stringify(tipTypeObject);


	    var vstObject = [{}]
	    for (var i = 0; i < $scope.vstArray.length; i++) {

		var vstToggle = $("#editInputVstId" + $scope.vstArray[i].vstName)[0].checked;
		vstObject[i] = {vstName: $scope.vstArray[i].vstName, vstToggle: vstToggle};
	    }

	    var vstObjectJson = JSON.stringify(vstObject);

	    var dawObject = [{}]
	    for (var i = 0; i < $scope.dawArray.length; i++) {

		var dawToggle = $("#editInputDawId" + $scope.dawArray[i].dawName)[0].checked;
		dawObject[i] = {dawName: $scope.dawArray[i].dawName, dawToggle: dawToggle};
	    }
	    var dawObjectJson = JSON.stringify(dawObject);


	    var imageDataObject = [{}]
	    for (var i = 0; i < $scope.uploader.queue.length; i++) {
		imageDataObject[i] = {imageName: $scope.uploader.queue[i]._file.name, imageSize: $scope.uploader.queue[i]._file.size,
		    dateModified: $scope.uploader.queue[i]._file.lastModifiedDate, newFileName: $scope.uploadedImages[i]};
	    }

	    var imageDataObjectJson = JSON.stringify(imageDataObject);

	    var videoLink = $("#editVideoLink")[0].value;
	    var videoLinkObject = {videoLink: videoLink};
	    var videoLinkJson = JSON.stringify(videoLinkObject);

	    var tipPoints;
	    if ($scope.tipArrayData[$scope.tipCounter].tipPoints) {
		tipPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints;
	    }
	    else {
		tipPoints = 1;
	    }


	    var req = {
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
		    submittedBy: $localStorage.username,
		    points: tipPoints
		}

	    }


	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.responseData = response.data;
		$scope.getTipsFromMongo();//add to current tips array

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });

	}





	$scope.findInTipArray = function (id) {
	    for (var i = 0; i < $scope.tipArrayData.length; i++) {
		if ($scope.tipArrayData[i]._id == id) {
		    return i;
		}
	    }
	}
	$scope.tipNavBarClicked = function (tip) {
	    var tipIdClicked = tip._id;

	    $scope.tipCounter = $scope.findInTipArray(tip._id);
	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
	    $scope.submittedBy = $scope.tipArrayData[$scope.tipCounter].submittedBy;

	    $scope.addATipToggle = false;
	    $scope.editATipToggle = false;
	    $scope.updateImageFileName();
	    $scope.updateBodyArray();
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
		$scope.submitMessage = "Success"
		$scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle
		$scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
		$scope.submittedBy = $scope.tipArrayData[$scope.tipCounter].submittedBy;
		$scope.updateImageFileName();
		$scope.updateBodyArray();
		$scope.navBarArray = "[";
		for (var i = 0; i < $scope.tipArrayData.length; i++) {
		    var object = '{text:"' + $scope.tipArrayData[i].tipTitle + '",href:"#"},';
		    $scope.navBarArray += object;

		}
		$scope.navBarArray += "]"

	    }, function failure(response) {

		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });


	}
	

	$scope.profileDataFromMongo = function () {
	    var username = $localStorage.username;
	    var req = {
		method: 'POST',
		url: '/profileInfoPostGet',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {userName: username}
	    }
	    $http(req).then(function success(response) {
		if (response.data.length > 0) {
		    var responseData = response.data[0];
		    if (responseData.hasOwnProperty('lovedTipsJson'))
			$scope.lovedTipsArray = JSON.parse(responseData.lovedTipsJson);
		    if (responseData.hasOwnProperty('likedTipsJson'))
			$scope.likedTipsArray = JSON.parse(responseData.likedTipsJson);
		    if (responseData.hasOwnProperty('dislikedTipsJson'))
			$scope.dislikedTipsArray = JSON.parse(responseData.dislikedTipsJson);
		}
	    }, function failure(response) {

		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });
	    //$scope.updateBodyArray();

	}

	
	//Update Tip arrays when the tip is changed
	$scope.updateBodyArray = function () {
	    $scope.tipBodyArray = [];
	    $scope.currentTipId = $scope.tipArrayData[$scope.tipCounter]._id
	    $scope.currentTipPoints = $scope.tipArrayData[$scope.tipCounter].tipPoints;

	    if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("tipDescJson")) {
		for (var i = 1; i < $scope.tipArrayData[$scope.tipCounter].tipDescJson.length; i++) {
		    var tipDescriptionLocal = $scope.tipArrayData[$scope.tipCounter].tipDescJson[i].tipDescription;
		    var submittedByLocal = $scope.tipArrayData[$scope.tipCounter].submittedBy;
		    var imageFileNameLocal = "";
		    if ($scope.tipArrayData[$scope.tipCounter].imageDataJson[i - 1]) {
			imageFileNameLocal = $scope.tipArrayData[$scope.tipCounter].imageDataJson[i - 1].newFileName;
		    }
		    
		    if(!runningProduction){
			imageFileNameLocal = "resources/images/" + imageFileNameLocal;
		    }
		    var hasImage = (imageFileNameLocal != "");
		    $scope.tipBodyArray.push({tipDescriptionNumber: i, tipDescription: tipDescriptionLocal, imageFileName: imageFileNameLocal, hasImage: imageFileNameLocal, submittedBy: submittedByLocal})
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


	    if ($scope.lovedTipsArray.indexOf($scope.currentTipId) != -1) {
		//Mark Loved Button
		$('#loveButton').addClass("active");
	    }
	    else {
		$('#loveButton').removeClass("active");
	    }
	    if ($scope.likedTipsArray.indexOf($scope.currentTipId) != -1) {
		//Mark Liked Button
		$('#likeButton').addClass("active");
	    }
	    else {
		$('#likeButton').removeClass("active");
	    }
	    if ($scope.dislikedTipsArray.indexOf($scope.currentTipId) != -1) {
		//Mark Disliked Button
		$('#dislikeButton').addClass("active");
	    }
	    else {
		$('#dislikeButton').removeClass("active");
	    }
	}
	$scope.updateImageFileName = function () {
	    if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("imageDataJson")) {
		var imageObject = ($scope.tipArrayData[$scope.tipCounter].imageDataJson);
		if (imageObject[0].hasOwnProperty('newFileName')) {
		    $scope.hasImage = true;
		    $scope.imageFileName = imageObject[0].newFileName;

		} else {
		    $scope.hasImage = false;
		    $scope.imageFileName = "";
		}

	    } else {
		$scope.hasImage = false;
		$scope.imageFileName = "";
	    }
	}
	$scope.updateProfileLikes = function () {
	    var tipId = $scope.tipArrayData[$scope.tipCounter]._id;
	    var userName = $localStorage.username;
	    var likedTipsJson = JSON.stringify($scope.likedTipsArray);
	    var lovedTipsJson = JSON.stringify($scope.lovedTipsArray);
	    var dislikedTipsJson = JSON.stringify($scope.dislikedTipsArray);

	    var req = {
		method: 'PUT',
		url: '/tipsPageUpdateProfileLikes',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {username: userName,
		    lovedTips: lovedTipsJson,
		    likedTips: likedTipsJson,
		    dislikedTips: dislikedTipsJson
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

	$scope.loveButtonClicked = function () {
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
		$scope.updateProfileLikes();
	    }
	}
	$scope.likeButtonClicked = function () {
	    if(!$scope.isLoggedIn()){
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
		$scope.updateProfileLikes();
	    }
	}
	$scope.dislikeButtonClicked = function () {
	    if(!$scope.isLoggedIn()){
		$scope.likedTipsArray = [];
		$scope.lovedTipsArray = [];
		$scope.dislikedTipsArray = [];
		$(location).attr('href', '/signUp');
		
	    }
	    else{
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
		$scope.updateProfileLikes();
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

	    $scope.updateImageFileName();
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
	    $scope.updateImageFileName();
	    $scope.updateBodyArray();
	}
	$scope.backToTipsClicked = function () {   //dd tip to database
	    $scope.addATipToggle = false;
	}
	
	$scope.isReadyForSubmit = function(){
	    var imagesUploaded = true;
	    var passedDescriptionTest = ($scope.tipDescAdd != "" && $scope.tipDescAdd);
	    for(var i = 0; i <$scope.uploader.queue.length;i++){
		if(!$scope.uploader.queue[i].isUploaded){
		    imagesUploaded = false;
		}
	    }
	    if($scope.tipTitleAdd == ""){
		$scope.readyForSubmitMessage = "Add title before submit"
	    }
	    else if(!passedDescriptionTest){
		$scope.readyForSubmitMessage = "Add description before submit"
	    }
	    else if(imagesUploaded == false){
		$scope.readyForSubmitMessage = "Upload images before submit"
	    }
	    else{
		$scope.readyForSubmitMessage = ""
	    }
	    	    
	    return $scope.tipTitleAdd!= "" &&
		   ($scope.tipDescAdd != "" && $scope.tipDescAdd) &&
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
		    var tipDescriptionLocal = $("#textAreaTip").val();
		    tipDescObject[i] = {tipNumber: i, tipDescription: tipDescriptionLocal}
		}
		else {
		    var tipDescriptionLocal = $("#textAreaTip" + i).val();
		    tipDescObject[i] = {tipNumber: i, tipDescription: tipDescriptionLocal}
		}
	    }
	    var tipDescObjectJson = JSON.stringify(tipDescObject);

	    var genreObject = [{}]
	    for (var i = 0; i < $scope.genreArray.length; i++) {

		var genreToggle = $("#inputGenreId" + $scope.genreArray[i].genreName)[0].checked;
		genreObject[i] = {genreName: $scope.genreArray[i].genreName, genreToggle: genreToggle};

	    }
	    var genreObjectJson = JSON.stringify(genreObject);


	    var theoryToggle = $("#theoryYes")[0].checked;
	    var mixingToggle = $("#mixingYes")[0].checked;
	    var masteringToggle = $("#masteringYes")[0].checked;
	    var workFlowToggle = $("#workFlowYes")[0].checked;
	    var soundDesignToggle = $("#soundDesignYes")[0].checked;

	    var tipTypeObject = {theoryTip: theoryToggle,
		mixingTip: mixingToggle,
		masteringTip: masteringToggle,
		workFlowTip: workFlowToggle,
		soundDesignTip: soundDesignToggle
	    };

	    var tipTypeObjectJson = JSON.stringify(tipTypeObject);


	    var vstObject = [{}]
	    for (var i = 0; i < $scope.vstArray.length; i++) {

		var vstToggle = $("#inputVstId" + $scope.vstArray[i].vstName)[0].checked;
		vstObject[i] = {vstName: $scope.vstArray[i].vstName, vstToggle: vstToggle};
	    }

	    var vstObjectJson = JSON.stringify(vstObject);

	    var dawObject = [{}]
	    for (var i = 0; i < $scope.dawArray.length; i++) {

		var dawToggle = $("#inputDawId" + $scope.dawArray[i].dawName)[0].checked;
		dawObject[i] = {dawName: $scope.dawArray[i].dawName, dawToggle: dawToggle};
	    }
	    var dawObjectJson = JSON.stringify(dawObject);


	    var imageDataObject = [{}]
	    for (var i = 0; i < $scope.uploader.queue.length; i++) {
		imageDataObject[i] = {imageName: $scope.uploader.queue[i]._file.name, imageSize: $scope.uploader.queue[i]._file.size,
		    dateModified: $scope.uploader.queue[i]._file.lastModifiedDate, newFileName: $scope.uploadedImages[i]};
	    }

	    var imageDataObjectJson = JSON.stringify(imageDataObject);

	    var videoLink = $("#videoLink")[0].value;
	    var videoLinkObject = {videoLink: videoLink};
	    var videoLinkJson = JSON.stringify(videoLinkObject);

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
		    submittedBy: $localStorage.username,
		    points: 1,
		    dateSubmitted:new Date(),
		}

	    }


	    $http(req).then(function success(response) {
		$scope.submitMessage = "Success"
		$scope.responseData = response.data;
		$scope.getTipsFromMongo();//add to current tips array

	    }, function failure(response) {
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;

	    });

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

	$scope.genreArray = [{genreName: "House", subgenres: [{subGenreName: "Progressive House"}]},
	    {genreName: "Trance", subgenres: [{subGenreName: "Acid Trance"}, {subGenreName: "Progressive Trance"}]},
	    {genreName: "Breakbeat"},
	    {genreName: "Downtempo"},
	    {genreName: "Techno"},
	    {genreName: "Hardcore"},
	    {genreName: "Drum_and_bass"},
	    {genreName: "Dubstep"},
	    {genreName: "Minimal"},
	    {genreName: "Trap"},
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

	// CALLBACKS
	$scope.uploadedImages = [];
	var numberOfImages = 0;

	uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
	    console.info('onWhenAddingFileFailed', item, filter, options);
	};
	uploader.onAfterAddingFile = function (fileItem) {
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
	    numberOfImages++;
	};
	uploader.onCompleteAll = function () {
	    console.info('onCompleteAll');
	};
	
	$scope.getTipsFromMongo();
	$scope.profileDataFromMongo();
    }]);




