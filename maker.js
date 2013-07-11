(function() {

var Maker = angular.module("Maker", []);

Maker.controller("ManifestController", ["$scope", function($scope) {

  $scope.manifest = {
    name: "",
    version: "1",
    manifest_version: 2,
    
    description: "",
    icons: {
      "128": ""
    },
    
    app: {
      launch: {
        urls: [],
        web_url: "",
        container: "panel"
      }
    }
    
  };
  
  $scope.image = false;
  
  $scope.generate = function() {
    var json = JSON.stringify($scope.manifest);
    console.log(json);
  }
  
}]);

})();