(function(){

  var app = angular.module('myreddit', ['ionic', 'angularMoment'])

  app.controller("RedditController", function($http, $scope){
    $scope.stories = [];



    $scope.loadOlderStories = function(){
      var params = {};
      // tests if this is the first time we send the get request to the api
      if ($scope.stories.length > 0){
        // if so, get the last item of stories and add it to the params obj
        params['after'] = $scope.stories[$scope.stories.length - 1].name;
      }
      $http.get("http://www.reddit.com/r/MMA/.json", {params: params})
        .success(function(response){
          angular.forEach(response.data.children, function(child){
            $scope.stories.push(child.data);
          });
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
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
