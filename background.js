chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("index.html", {
    bounds: {
      width: 515,
      height: 400
    }
  });
});