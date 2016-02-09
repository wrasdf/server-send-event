var express = require('express');
var app = express();
var routes = require('./routers/api');

app.use('/api', routes);

app.use(express.static('public'));
app.use(express.static('node_modules'));


var server = app.listen(5001, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
