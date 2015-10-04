(function(){

  var app = angular.module('myreddit', ['ionic', 'angularMoment'])

  app.controller("RedditController", function($http, $scope){
    $scope.stories = [];

    $http.get("http://www.reddit.com/r/mountaingoats/.json")
      .success(function(response){
        angular.forEach(response.data.children, function(child){
          $scope.stories.push(child.data);
        });
      });
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
