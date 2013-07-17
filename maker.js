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
    var manifest = $scope.manifest;
    manifest.app.launch.urls = [ manifest.app.launch.web_url ];
    //save the image out to the chosen directory
    //can we use a data URL?
    //
    var json = JSON.stringify(manifest, null, 2);
    
    chrome.fileSystem.chooseEntry({
      type: "saveFile"
    }, function(fileEntry) {
      console.log(fileEntry);
      fileEntry.createWriter(function(writer) {
        var blob = new Blob([json], {type: "text/plain"});
        writer.write(blob);
      });
    });
  }
  
  var imageFileInput = document.querySelector("#imageFileInput");
  imageFileInput.addEventListener("change", function() {
    var file = this.files.pop();
    $scope.manifest.icons["128"] = file.name;
  });
  
}]);

})();