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
    
    var manifest = {};
    //make a copy so we can delete things if necessary
    for (var key in $scope.manifest) {
      manifest[key] = $scope.manifest[key];
    }
    manifest.app.launch.urls = [ manifest.app.launch.web_url ];
    //if there's no icon, remove it.
    if (!manifest.icons["128"]) {
      delete manifest.icons;
    }
    
    var json = JSON.stringify(manifest, null, 2);
    
    chrome.fileSystem.chooseEntry({
      type: "saveFile",
      suggestedName: "manifest.json"
    }, function(fileEntry) {
      fileEntry.createWriter(function(writer) {
        var blob = new Blob([json], {type: "text/plain"});
        writer.onwriteend = function() {
          writer.onwriteend = null;
          writer.write(blob);
        }
        writer.truncate(blob.size);
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