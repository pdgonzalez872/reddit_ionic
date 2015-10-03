(function(){

  var app = angular.module('myreddit', ['ionic'])

  app.controller("RedditController", function($http, $scope){
    $scope.stories = [];

    $http.get()
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
}()); // The parenthesis here calls the function immediately
