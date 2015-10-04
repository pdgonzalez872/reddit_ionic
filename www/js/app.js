(function(){

  var app = angular.module('myreddit', ['ionic', 'angularMoment'])

  app.controller("RedditController", function($http, $scope){
    $scope.stories = [];

    // refactoring so there is no code repetition
    function loadStories(params, callback){
      $http.get("http://www.reddit.com/r/MMA/.json", {params: params})
        .success(function(response){
          var stories = [];
          angular.forEach(response.data.children, function(child){

            // deals with no images
            var story = child.data;
            if (!story.thumbnail || story.thumbnail === 'self' || story.thumbnail === 'default'){
              story.thumbnail = 'https://www.redditstatic.com/icon.png';
            }
            stories.push(child.data);
          });
        callback(stories);
      });
    };

    $scope.loadOlderStories = function(){
      var params = {};
      // tests if this is the first time we send the get request to the api
      if ($scope.stories.length > 0){
        // if so, get the last item of stories and add it to the params obj
        params['after'] = $scope.stories[$scope.stories.length - 1].name;
      }
      loadStories(params, function(olderStories){
        $scope.stories = $scope.stories.concat(olderStories);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.loadNewerStories = function(){
      var params = {'before': $scope.stories[0].name};
      loadStories(params, function(newerStories){
        $scope.stories = newerStories.concat($scope.stories);
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.openLink = function(url){
      window.open(url, "_blank")
    }

  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      // need to override the window.open function that is set as default.
      if (window.cordova && window.cordova.InAppBrowser){
        window.open = window.cordova.InAppBrowser.open;
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
}()); // The parenthesis here calls the function immediately
