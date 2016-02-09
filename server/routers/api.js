var express = require('express');
var url = require('url');
var router = express.Router();

router.get('/transcations/', function(req, res) {

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*"
  });

  res.write(":" + Array(2049).join(" ") + "\n"); // 2kB padding for IE
  res.write("retry: 2000\n");

  var timeoutInstance = 0;
  var index = 0;
  var maxRunTimes = 100;

  var f = function() {
    if (index < maxRunTimes) {
      res.write("id: " + index + "\n");
      res.write("data: {\"t\": \"data and with  "+index+"\"}\n\n");
      timeoutInstance = setTimeout(f, 1000);
      index ++ ;
    } else {
      res.end();
    }
  };

  f();

  res.on("close", function() {
    console.log('server side closed.');
    clearTimeout(timeoutInstance);
  });
});

module.exports = router;
