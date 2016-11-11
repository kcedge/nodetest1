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


angular.module("myApp").controller('bodyController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.isLoggedIn = function () {
	    if ($localStorage.email != "") {
		return true;
	    }
	    else {
		return false;
	    }
	}

	$scope.signOutClicked = function () {
	    $localStorage.email = "";
	    $localStorage.userSignedIn = false;
	}
    }]);
angular.module("myApp").controller('signUpController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.signUpEmail = "";
	$scope.signUpPassword = "";
	$scope.signUpPasswordConfirm = "";
	$scope.$storage = $localStorage.$default({
	    email: "",
	    userSignedIn: false
	});




    }]);
angular.module("myApp").controller('signInController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.signUpEmail = "";
	$scope.signUpPassword = "";
	$scope.signUpPasswordConfirm = "";
	$scope.$storage = $localStorage.$default({
	    email: "",
	    userSignedIn: false
	});


    }]);

angular.module("myApp").controller('profileHelperController', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
	$scope.$storage = $localStorage.$default({
	    email: "",
	    userSignedIn: false
	});

	var emailOfUser = $("#emailUser").html();

	$scope.$storage = $localStorage;
	$scope.$storage.userSignedIn = true;
	$scope.$storage.email = emailOfUser;

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
		    colorSetArray[i] = "#f2f2f2";
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


angular.module("myApp").controller('bodyTipHelperController', ['$scope', '$http', 'FileUploader', 'TipData', function ($scope, $http, FileUploader, TipData) {


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

	//FILTER FUNCTIONS
	$scope.theory_toggle = false;
	$scope.theoryToggle = function () {
	    return $scope.theory_toggle = !$scope.theory_toggle;
	};

	$scope.mixing_toggle = false;
	$scope.mixingToggle = function () {
	    return $scope.mixing_toggle = !$scope.mixing_toggle;
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
	$scope.showItem = function (tip) {

	    return testTipType(tip) && testTipMixing(tip);
	}
	$scope.navBarFilterClick = function (filter) {
	    $scope.sortType = filter;


	}

	$scope.sortFiltersArray = ["Tip Title ", "Tip Type ", "Genre ", "Level ", "DAW "];

	


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
	    $scope.addATipToggle = !$scope.addATipToggle;
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

	    var tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
	    var tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle;



	    $("#tipTitleEditInput").val(tipTitle);
	    $("#textAreaEditTip").text(tipDesc);

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


	}
	$scope.editSubmitButtonClicked = function () {
	    //dd tip to database
	    var tipTitle = $("#tipTitleEditInput").val();
	    var tipDescription = $("#textAreaEditTip").val();
	    var tipId = $scope.tipArrayData[$scope.tipCounter]._id;

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
	    var tipTypeObject = {theoryTip: theoryToggle,
		mixingTip: mixingToggle,
		masteringTip: masteringToggle,
		workFlowTip: workFlowToggle};

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

	    var req = {
		method: 'PUT',
		url: '/tipsPagePut',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {tipId: tipId,
		    tipTitle: tipTitle,
		    tipDesc: tipDescription,
		    genreJson: genreObjectJson,
		    tipTypeJson: tipTypeObjectJson,
		    vstJson: vstObjectJson,
		    dawJson: dawObjectJson,
		    imageDataJson: imageDataObjectJson,
		    videoLinkJson: videoLinkJson,
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





	$scope.findInTipArray = function (tip) {
	    for (var i = 0; i < $scope.tipArrayData.length; i++) {
		if ($scope.tipArrayData[i]._id == tip._id) {
		    return i;
		}
	    }
	}
	$scope.tipNavBarClicked = function (tip) {
	    var tipIdClicked = tip._id;
	    $scope.tipCounter = $scope.findInTipArray(tip);
	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
	    $scope.addATipToggle = false;
	    $scope.editATipToggle = false;
	    $scope.updateImageFileName();
	
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

	    var convertTipDataToJson = function () {
		for (var i = 0; i < $scope.tipArrayData.length; i++) {
		    if ($scope.tipArrayData[i].dawJson) {
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
	    $http(req).then(function success(response) {
		$scope.tipArrayData = response.data;
		$scope.tipArrayData.sort(compare);
		convertTipDataToJson();
		$scope.submitMessage = "Success"
		$scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle
		$scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
		$scope.updateImageFileName();

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
	$scope.getTipsFromMongo();
	$scope.updateImageFileName = function () {
	    if ($scope.tipArrayData[$scope.tipCounter].hasOwnProperty("imageDataJson")) {
		var imageObject = JSON.parse($scope.tipArrayData[$scope.tipCounter].imageDataJson);
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
	$scope.nextButtonClicked = function () {
	    var orginalTipCounter = $scope.tipCounter;
	    $scope.tipCounter++;
	    if ($scope.tipCounter >= $scope.tipArrayData.length) {
		$scope.tipCounter = 0;
	    }
	    
	    while(!$scope.showItem($scope.tipArrayData[$scope.tipCounter]) && orginalTipCounter!=$scope.tipCounter){
		if($scope.tipCounter == $scope.tipArrayData.length){
		     $scope.tipCounter = 0;
		}
		else{
		    $scope.tipCounter++;
		}
	    }
	    
	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle;
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
	    
	    $(".tipDescription p").html($(".tipDescription p").value.replace(/\n/g, '<br/>'));
	
	    $scope.updateImageFileName();

	}
	$scope.prevButtonClicked = function () {
	    var orginalTipCounter = $scope.tipCounter;
	    $scope.tipCounter--;
	    if ($scope.tipCounter < 0) {
		$scope.tipCounter = $scope.tipArrayData.length - 1;
	    }
	    while(!$scope.showItem($scope.tipArrayData[$scope.tipCounter]) && orginalTipCounter!=$scope.tipCounter){
		if($scope.tipCounter == 0){
		     $scope.tipCounter = $scope.tipArrayData.length;
		}
		else{
		    $scope.tipCounter--;
		}
	    }
	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle;
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
	    $scope.updateImageFileName();

	}
	$scope.backToTipsClicked = function () {   //dd tip to database
	    $scope.addATipToggle = false;
	}
	$scope.submitButtonClicked = function () {
	    //dd tip to database
	    var tipTitle = $("#tipTitleInput").val();
	    var tipDescription = $("#textAreaTip").val();
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
	    var tipTypeObject = {theoryTip: theoryToggle,
		mixingTip: mixingToggle,
		masteringTip: masteringToggle,
		workFlowTip: workFlowToggle};

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
		    tipDesc: tipDescription,
		    genreJson: genreObjectJson,
		    tipTypeJson: tipTypeObjectJson,
		    vstJson: vstObjectJson,
		    dawJson: dawObjectJson,
		    imageDataJson: imageDataObjectJson,
		    videoLinkJson: videoLinkJson,
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

    }]);




