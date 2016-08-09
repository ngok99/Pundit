angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('myGovernment', {
    url: '/myGovernment',
    templateUrl: 'templates/myGovernment.html',
    controller: 'myGovernmentCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('signUp', {
    url: '/signUp',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('changePassword', {
    url: '/changePassword',
    templateUrl: 'templates/changePassword.html',
    controller: 'changePasswordCtrl'
  })

  .state('billBio', {
    url: '/billBio',
    templateUrl: 'templates/billBio.html',
    controller: 'billBioCtrl'
  })

  .state('allBills', {
    url: '/allBills',
    templateUrl: 'templates/allBills.html',
    controller: 'allBillsCtrl'
  })

  .state('savedBills', {
    url: '/savedBills',
    templateUrl: 'templates/savedBills.html',
    controller: 'savedBillsCtrl'
  })

  .state('trending', {
    url: '/trendingViewAllPoliticians',
    templateUrl: 'templates/trending.html',
    controller: 'trendingCtrl'
  })

  .state('politicianProfile', {
    url: '/politicianProfile',
    templateUrl: 'templates/politicianProfile.html',
    controller: 'politicianProfileCtrl'
  })

$urlRouterProvider.otherwise('/home')

  

});