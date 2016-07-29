$("#soundCloudLink").attr("target", '_blank');
$("#soundCloudLink").attr("href", 'https://soundcloud.com/crazylegsmusic');
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp').controller('bodyMelodyHelperController', ['$scope','$http', function($scope,$http) {
        
        $scope.hello = "HELLLOOO";
        $scope.hi= "HIIIIII"
	$scope.alertInformation = "Select your root note "
	$scope.selectedKey = ""
	
	$scope.sharpSelected = false;
	$scope.flatSelected = false;
	$scope.majorSelected = false;
	$scope.minorSelected = false;
	$scope.majorOrMinorString = ""
	$scope.BPM = "122"
	$scope.BARS = "16"

	$scope.majorFormula = [false,true,false,true,true,false,true,false,true,false,true,true];
	$scope.minorFormula = [false,true,true,false,true,false,true,true,false,true,false,true];
	$scope.majorChordIFormula = [false,false,false,true,false,false,true,false,false,false,false,true];
	$scope.minorChordIFormula = [false,false,true,false,false,false,true,false,false,false,false,true];
	$scope.majorChordIIFormula = [false,true,false,false,true,false,false,false,true,false,false,false];
	$scope.minorChordIIFormula = [false,true,false,false,true,false,false,true,false,false,false,false];
	$scope.majorChordIIIFormula = [false,false,false,true,false,false,true,false,false,false,true,false];
	$scope.minorChordIIIFormula = [false,false,true,false,false,false,true,false,false,true,false,false];
	$scope.majorChordIVFormula = [false,false,false,false,true,false,false,false,true,false,false,true];
	$scope.minorChordIVFormula = [false,false,false,false,true,false,false,true,false,false,false,true];
	$scope.majorChordVFormula = [false,true,false,false,false,false,true,false,false,false,true,false];
	$scope.minorChordVFormula =  [false,true,false,false,false,false,true,false,false,true,false,false];
	$scope.majorChordVIFormula = [false,false,false,true,false,false,false,false,true,false,false,true];
	$scope.minorChordVIFormula = [false,false,true,false,false,false,false,true,false,false,false,true];
	$scope.majorChordVIIFormula = [false,true,false,false,true,false,false,false,false,false,true,false];
	$scope.minorChordVIIFormula = [false,true,false,false,true,false,false,false,false,true,false,false];
	
	$scope.noteOrderForChart = ["E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B","C","C#/Db","D","D#/Eb"];
	$scope.sharpOrFlat = "";
	$scope.hasKeyBeenSelected = function(){
	    return ($scope.selectedKey != "" && ($scope.majorSelected || $scope.minorSelected));
	};
	$scope.rootNoteNotSelected = function(){
	    return ($scope.selectedKey == "");
	};
	$scope.keyButtonClicked = function(){
	    $scope.alertInformation = " selected. Major or Minor?";  
	    $scope.keyHasBeenSelected = true;
	    $scope.ScaleOrChord = "Scale";
  
	    if($scope.majorOrMinorString == "Major"){
		 $scope.setColorSet($scope.majorFormula);
	     }
	     else if($scope.majorOrMinorString == "Minor"){
		 $scope.setColorSet($scope.minorFormula);
	     }
	} ;
	$scope.keyButtonAClicked = function(){
	      $scope.selectedKey = "A";
	      	      $scope.keyButtonClicked();
    
	} ;
	 $scope.keyButtonBClicked = function(){
	    $scope.selectedKey = "B";
	    	    $scope.keyButtonClicked();

	}  ;
	 $scope.keyButtonCClicked = function(){
	     	    $scope.selectedKey = "C";

	    $scope.keyButtonClicked();
	}  ;
	 $scope.keyButtonDClicked = function(){
	     	    $scope.selectedKey = "D";

	    $scope.keyButtonClicked();
	}  ;
	 $scope.keyButtonEClicked = function(){
	     	    $scope.selectedKey = "E";

	    $scope.keyButtonClicked();
	}  ;
	 $scope.keyButtonFClicked = function(){
	     	    $scope.selectedKey = "F";

	    $scope.keyButtonClicked();
	;}  
	 $scope.keyButtonGClicked = function(){
	     	    $scope.selectedKey = "G";

	    $scope.keyButtonClicked();
	}  ;
	
	
	$scope.sharpButtonClicked = function(){
	    if($scope.selectedKey.includes("#")){
		$scope.sharpOrFlat= "";
		$scope.selectedKey = $scope.selectedKey.replace('#','');
	    }
	    else if(!$scope.selectedKey.includes("E") && !$scope.selectedKey.includes("B")){
		 $scope.selectedKey+="#";
		 $scope.selectedKey = $scope.selectedKey.replace('b','');
		 
		 $scope.sharpOrFlat = "Sharp";
	    }
	     $scope.ScaleOrChord = "Scale";
	     if($scope.majorOrMinorString == "Major"){
		 $scope.setColorSet($scope.majorFormula);
	     }
	     else if($scope.majorOrMinorString == "Minor"){
		 $scope.setColorSet($scope.minorFormula);
	     }
	}
	$scope.flatButtonClicked = function(){
	      if($scope.selectedKey.includes("b")){
		$scope.sharpOrFlat= "";
		$scope.flatSelected = false;
		$scope.selectedKey = $scope.selectedKey.replace('b','');
	    }
	    else if(!$scope.selectedKey.includes("C") && !$scope.selectedKey.includes("F")){
		 $scope.selectedKey+="b";
		 $scope.selectedKey = $scope.selectedKey.replace('#','');
	    }
	        $scope.ScaleOrChord = "Scale";
	     if($scope.majorOrMinorString == "Major"){
		 $scope.setColorSet($scope.majorFormula);
	     }
	     else if($scope.majorOrMinorString == "Minor"){
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

	$scope.updateChordButtons=function(majorOrMinor){
	    if(majorOrMinor == "Major"){
		$scope.chordButton1 = "I";
		$scope.chordButton2 = "ii";
		$scope.chordButton3 = "iii";
		$scope.chordButton4 = "IV";
		$scope.chordButton5 = "V";
		$scope.chordButton6 = "vi";
		$scope.chordButton7 = "vii dm";
	    }
	     if(majorOrMinor == "Minor"){
		$scope.chordButton1 = "i";
		$scope.chordButton2 = "ii dm";
		$scope.chordButton3 = "III";
		$scope.chordButton4 = "iv";
		$scope.chordButton5 = "v";
		$scope.chordButton6 = "VI";
		$scope.chordButton7 = "VII";
	    }
	    
	}
	$scope.majorButtonClicked = function(){
	    $scope.majorSelected = true;
	    $scope.minorSelected = false;
	    $scope.majorOrMinorString = "Major";
	    $scope.ScaleOrChord = "Scale";
	    $scope.updateChordButtons("Major");	    
	    $scope.setColorSet($scope.majorFormula);
	};
	$scope.minorButtonClicked = function(){
	    $scope.majorSelected = false;
	    $scope.minorSelected = true;
	    $scope.majorOrMinorString = "Minor";
	    $scope.ScaleOrChord = "Scale";
	    $scope.updateChordButtons("Minor");
	    $scope.setColorSet($scope.minorFormula);
	};
	$scope.ChordIButtonClicked = function(){	  
	    $scope.ScaleOrChord = "Chord " +$scope.chordButton1;	
	    if($scope.majorOrMinorString == "Major"){
		$scope.setColorSet($scope.majorChordIFormula);
	    }
	    if($scope.majorOrMinorString == "Minor"){
		$scope.setColorSet($scope.minorChordIFormula);
	    }
	};
	$scope.ChordIIButtonClicked = function(){
	     $scope.ScaleOrChord = "Chord " + $scope.chordButton2;
	    if($scope.majorOrMinorString == "Major"){
		$scope.setColorSet($scope.majorChordIIFormula);
	    }
	    if($scope.majorOrMinorString == "Minor"){
		$scope.setColorSet($scope.minorChordIIFormula);
	    }
	    
	};
	$scope.ChordIIIButtonClicked = function(){
	     $scope.ScaleOrChord = "Chord "+ $scope.chordButton3;
	  
	     if($scope.majorOrMinorString == "Major"){
		$scope.setColorSet($scope.majorChordIIIFormula);
	    }
	    if($scope.majorOrMinorString == "Minor"){
		$scope.setColorSet($scope.minorChordIIIFormula);
	    }
	};
	$scope.ChordIVButtonClicked = function(){
	     $scope.ScaleOrChord = "Chord "+ $scope.chordButton4;
	  
	     if($scope.majorOrMinorString == "Major"){
		$scope.setColorSet($scope.majorChordIVFormula);
	    }
	    if($scope.majorOrMinorString == "Minor"){
		$scope.setColorSet($scope.minorChordIVFormula);
	    }
	};
	$scope.ChordVButtonClicked = function(){
	     $scope.ScaleOrChord = "Chord "+ $scope.chordButton5;
	  
	     if($scope.majorOrMinorString == "Major"){
		$scope.setColorSet($scope.majorChordVFormula);
	    }
	    if($scope.majorOrMinorString == "Minor"){
		$scope.setColorSet($scope.minorChordVFormula);
	    }
	};
	$scope.ChordVIButtonClicked = function(){
	     $scope.ScaleOrChord = "Chord "+ $scope.chordButton6;
	  
	     if($scope.majorOrMinorString == "Major"){
		$scope.setColorSet($scope.majorChordVIFormula);
	    }
	    if($scope.majorOrMinorString == "Minor"){
		$scope.setColorSet($scope.minorChordVIFormula);
	    }
	};
	$scope.ChordVIIButtonClicked = function(){
	     $scope.ScaleOrChord = "Chord "+ $scope.chordButton7;
	  
	     if($scope.majorOrMinorString == "Major"){
		$scope.setColorSet($scope.majorChordVIIFormula);
	    }
	    if($scope.majorOrMinorString == "Minor"){
		$scope.setColorSet($scope.minorChordVIIFormula);
	    }
	};
	
	$scope.radioKeyClicked = function() {
	    var test = $('#keyButtonWrapper').find([checked = 'checked']);
	    
	    
	};
	$('.keyButtonWrapper').change(function() {
		$scope.thisIs = (this).prop('checked');
	});
	   
	$scope.canvasClick = function(){
	    var charttest =$scope.chart;
	    
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
	
	
	$scope.setColorSet = function (formulaArray) {
	    var colorSetArray = [];
	    var noteIndex = 0;
	  //  if ($scope.majorOrMinorString == "Major" && scaleOrChord == "Scale") {
		for (var i = 0; i < $scope.noteOrderForChart.length; i++) {
		    if ($scope.noteOrderForChart[i].includes($scope.selectedKey) && ($scope.selectedKey.includes("#")||$scope.selectedKey.includes("b"))) {
			noteIndex = i;
			break;
		    }
		    else if($scope.noteOrderForChart[i] == $scope.selectedKey){
			noteIndex = i;
			break;
		    }
		}
		var indexForFormula = 0;
		for(var i = noteIndex+1; indexForFormula < formulaArray.length;i++,indexForFormula++)
		{
		    if(i == $scope.noteOrderForChart.length){
			i = 0;
		    }
		    if(formulaArray[indexForFormula]){
			
			colorSetArray[i] = "#00cc66";	
				
		    }
		    else{
			colorSetArray[i] = "#f2f2f2";	
		      }
		      
		    
		
		}
		
		CanvasJS.addColorSet("colorSet",
                colorSetArray);
		$scope.UpdateChromaticWheel();
		var indexForFormula = 0;
		for(var i = noteIndex+1; indexForFormula < formulaArray.length;i++,indexForFormula++)
		{
		    if(i == $scope.noteOrderForChart.length){
			i = 0;
		    }
		    if(formulaArray[indexForFormula]){		
			 $scope.chart.options.data[0].dataPoints[i].exploded = true;
			
		    }
		    else{	
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
			toolTip:{
			    enabled:false,
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
				    {y: 1, indexLabel: "E", exploded:false},
				    {y: 1, indexLabel: "F", exploded:false},
				    {y: 1, indexLabel: "F#/Gb", exploded:false},
				    {y: 1, indexLabel: "G", exploded:false},
				    {y: 1, indexLabel: "G#/Ab", exploded:false},
				    {y: 1, indexLabel: "A", exploded:false},
				    {y: 1, indexLabel: "A#/Bb", exploded:false},
				    {y: 1, indexLabel: "B", exploded:false},
				    {y: 1, indexLabel: "C", exploded:false},
				    {y: 1, indexLabel: "C#/Db", exploded:false},
				    {y: 1, indexLabel: "D", exploded:false},
				    {y: 1, indexLabel: "D#/Eb", exploded:false},
				]
			    }
			]
		    });
	    $scope.chart.render();
	}
	$scope.UpdateChromaticWheel();
}]);


angular.module('myApp').factory('TipData', function(){
    return [];
});


angular.module('myApp').controller('bodyTipHelperController', ['$scope','$http', function($scope,$http,TipData) {
        
	
        $scope.title = "HELLLOOO";
        $scope.hi= "HIIIIII"
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
	
	
	$scope.addATipToggle = false;
	
	$scope.addATip = function(){
	    return $scope.addATipToggle;
	}
	$scope.addATipClicked = function(){
	   $scope.addATipToggle = true;
	}
	
	$scope.deleteATipClicked = function(){
	   var idOfTip = $scope.tipArrayData[$scope.tipCounter]._id
	    var req = {
		method: 'DELETE',
		url: '/tipsPageDelete',
		headers: {
		    'Content-Type': "application/json"
		},
		data: {id: idOfTip}		  
	    }
	     $http(req).then(function success(response){
		$scope.deleteResponse = response.data;
		
		
	    }, function failure(response){
		
		$scope.deleteResponse = response.data;
		
	    });
	}
	$scope.findInTipArray = function(tip){
	    for(var i = 0; i < $scope.tipArrayData.length;i++){
		if($scope.tipArrayData[i]._id == tip._id ){
		    return i;
		}
	    }
	}
	$scope.tipNavBarClicked = function(tip){
	    var tipIdClicked = tip._id;
	    $scope.tipCounter = $scope.findInTipArray(tip);
	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;

	    $scope.addATipToggle = false;
	}
	
	$scope.getTipsFromMongo = function(){
	    //dd tip to database
	   
	    var req = {
		method: 'GET',
		url: '/tipsPageGet',
		headers: {
		    'Content-Type': "application/json"
		},
		data: { }		  
	    }
	    
	    $http(req).then(function success(response){
		$scope.tipArrayData = response.data;
		$scope.submitMessage = "Success"
		$scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle
		$scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;
		 $scope.navBarArray = "[";
		for(var i = 0;i < $scope.tipArrayData.length;i++){
		    var object = '{text:"' +  $scope.tipArrayData[i].tipTitle + '",href:"#"},';
		    $scope.navBarArray+=object;
		  
		}
		 $scope.navBarArray+="]"
		
	    }, function failure(response){
		
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;
		
	    });
	    
	    
	}  
	$scope.getTipsFromMongo();
	
	$scope.nextButtonClicked = function(){
	    $scope.tipCounter++;
	    if($scope.tipCounter>=$scope.tipArrayData.length){
		$scope.tipCounter=0;
	    }
	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle;
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;    
	}
	$scope.prevButtonClicked = function(){	
	    $scope.tipCounter--;
	    if($scope.tipCounter<0){
		$scope.tipCounter=$scope.tipArrayData.length-1;
	    }
	    $scope.tipTitle = $scope.tipArrayData[$scope.tipCounter].tipTitle;
	    $scope.tipDesc = $scope.tipArrayData[$scope.tipCounter].tipDesc;    
	}  
	$scope.backToTipsClicked = function(){   //dd tip to database
		 $scope.addATipToggle = false;	  
	    } 
	$scope.submitButtonClicked = function(){
	    //dd tip to database
	    var tipTitle = $("#tipTitleInput").val();
	    var tipDescription = $("#textAreaTip").val();
	    var req = {
		method: 'POST',
		url: '/tipsPagePost',
		headers: {
		    'Content-Type': "application/json"
		},
		data: { tipTitle: tipTitle ,
			tipDesc: tipDescription}
		  
	    } 
	
	
	    $http(req).then(function success(response){
		$scope.submitMessage = "Success"
		$scope.responseData = response.data;
		$scope.getTipsFromMongo();//add to current tips array
		
	    }, function failure(response){
		$scope.submitMessage = "Failure"
		$scope.responseData = response.data;
		
	    });
	    
	}
}]);


    

