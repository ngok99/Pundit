angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope, User, $state) {
$scope.user = {};

	if(User.isAuthenticated()){
		$state.go("profile");
	}
	$scope.login = function(){
		User.login($scope.user)
		.$promise
		.then(function success(response){
			console.log(response);
			$state.go("profile");
		}, function error(response){
			alert("Invalid Username or Password");
			console.log(response);
		});
	};
})
   
.controller('myGovernmentCtrl', function($scope, $http) {



})
   
.controller('profileCtrl', function($scope) {

})
   
.controller('signUpCtrl', function($scope, User, $state) {
	$scope.user = {};

	$scope.signup = function(){
		User.create($scope.user)
		.$promise
		.then(function success(response){
			$state.go("profile");
		}, function error(response){
			alert("Invalid Username or Password");
		});
	};
})
   
.controller('changePasswordCtrl', function($scope) {

})
   
.controller('billBioCtrl', function($scope, $http, politicianTransfer, $cordovaInAppBrowser, Bill) {



	function getTwitter(handle) {
        var scheme;
 
        // Don't forget to add the org.apache.cordova.device plugin!
        if(device.platform === 'iOS') {
            scheme = 'twitter://';
        }
        else if(device.platform === 'Android') {
            scheme = 'com.twitter.android';
        }
        scheme = 'twitter://';
         
        appAvailability.check(
            scheme, // URI Scheme
            function() {  // Success callback
                window.open('twitter://user?screen_name=' + handle, '_system', 'location=no');
                console.log('Twitter is available');
            },
            function() {  // Error callback
                window.open('https://twitter.com/' + handle, '_system', 'location=no');
                console.log('Twitter is not available');
            }
        );      
    }
		$scope.aliveBills = [];

		$scope.Bill = Bill.find({

		});
console.log($scope.aliveBills);

  $scope.openProfile = function(event){
  	politicianTransfer.setProperty(event.target.id);
  	console.log(event.target.id);
  };

  function shuffle(arr){
  	var temp;
  	var rand;

  	for(i=0; i<arr.length; i++){
  		rand = Math.floor(Math.random() * arr.length);
  		temp = arr[i];
  		arr[i] = arr[rand];
  		arr[rand] = temp;
  	}
  	return arr;
  }

  $http({
  method: 'GET',
  url: 'https://www.govtrack.us/api/v2/bill?sort=-current_status_date'
}).then(function successCallback(response) {
	console.log(response);

	for(i = 0; i<response.data.objects.length; i++){
		if(response.data.objects[i].is_alive == true){
			$scope.aliveBills.push(response.data.objects[i]);
		}
	}

	$scope.aliveBills = shuffle($scope.aliveBills);
	console.log($scope.aliveBills);

	var index = 0;


	$scope.Title = $scope.aliveBills[index].display_number;
	$scope.Description = $scope.aliveBills[index].title_without_number;
	$scope.Sponsor = $scope.aliveBills[index].sponsor;
	$scope.pImage = "https://www.govtrack.us/data/photos/" + $scope.aliveBills[index].sponsor.id + ".jpeg"
	$scope.Link = $scope.aliveBills[index].link;
	$scope.Date = $scope.aliveBills[index].major_actions[$scope.aliveBills[index].major_actions.length - 1][0];
	$scope.Action = $scope.aliveBills[index].major_actions[$scope.aliveBills[index].major_actions.length - 1][2];

    console.log($scope.aliveBills);
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

})
   
.controller('allBillsCtrl', function($scope) {

})
   
.controller('savedBillsCtrl', function($scope) {

})

.service('politicianTransfer', function () {
        var property;

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
})

.controller('trendingCtrl', function($scope, $http, politicianTransfer) {
  var states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
  
  $scope.$on('$ionicView.beforeEnter',function(){

  $scope.pImages = [];
  $scope.pIDs = [];
  $scope.pStates = [];


  $scope.openProfile = function(event){
  	politicianTransfer.setProperty(event.target.id);
  	console.log(event.target.id);
  };

  for(i=0; i<6; i++){
  	var rand = Math.floor(Math.random() * 50);
  		$scope.pStates.push(states[rand]);
  	var roleUrl = "https://www.govtrack.us/api/v2/role?sort=-startdate&current=true&state=" + states[rand];

  	$http({
  method: 'GET',
  url: roleUrl
}).then(function successCallback(response) {
	
	//change 0 to a variable
	console.log(response);
	var randP = Math.floor(Math.random() * response.data.objects.length);
	console.log(response.data.objects[randP].person.id);

	$scope.pIDs.push(response.data.objects[randP].person.id);
	$scope.pImages.push("https://www.govtrack.us/data/photos/" + response.data.objects[randP].person.id + ".jpeg");

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  }

});

})
   
.controller('politicianProfileCtrl', function($scope, $http, politicianTransfer, $cordovaInAppBrowser) {
	$scope.$on('$ionicView.beforeEnter',function(){
		getPersonInfo(politicianTransfer.getProperty());
		console.log(politicianTransfer.getProperty());
	});
  
	$scope.twitterEnabled = true;

	$scope.getTwitter = function(event) {
        var scheme;
 
        // Don't forget to add the org.apache.cordova.device plugin!
        if(device.platform === 'iOS') {
            scheme = 'twitter://';
        }
        else if(device.platform === 'Android') {
            scheme = 'com.twitter.android';
        }
        scheme = 'twitter://';
         
        appAvailability.check(
            scheme, // URI Scheme
            function() {  // Success callback
                window.open('twitter://user?screen_name=' + event.target.id, '_system', 'location=no');
                console.log('Twitter is available');
            },
            function() {  // Error callback
                window.open('https://twitter.com/' + event.target.id, '_system', 'location=no');
                console.log('Twitter is not available');
            }
        );  
    };
  
  //getPersonInfo(412318);

//button will send person id info
function getPersonInfo(pID){

	function abbrState(input){
    
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }    
    }



  var personUrl = "https://www.govtrack.us/api/v2/person/" + pID;
  $http({
  method: 'GET',
  url: personUrl
}).then(function successCallback(response) {
	
	console.log(response);

	$scope.pName = response.data.firstname + " " + response.data.lastname;
	var role = response.data.roles[response.data.roles.length - 1];
	$scope.pParty = role.party;
	$scope.pRole = role.role_type_label;
	$scope.pEnd = role.enddate;
	$scope.pState = abbrState(role.state);
	$scope.pPhone = role.phone;
	$scope.pTwitter = response.data.twitterid;
	if($scope.pTwitter != null){
		$scope.twitterEnabled = false;
	}
	console.log($scope.pTwitter);
	$scope.pImage = "https://www.govtrack.us/data/photos/" + pID + ".jpeg";

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });




  var pBills = [];
  var billsUrl = "https://www.govtrack.us/api/v2/bill?sponsor=" + pID;
  $http({
  method: 'GET',
  url: billsUrl
}).then(function successCallback(response) {
	console.log(response);
	for(i = 0; i<3; i++){
		pBills.push(response.data.objects[i]);
	}
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

	console.log(pBills);
}
})
 