var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');

// Controllers
var api = require('./server/api');

// Init App
var app = express();


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Static Files
app.use(express.static(path.join(__dirname, 'public/app')));

// API route
app.use('/meenakshi/api', api);

// Serve static files on all other routes
/*app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/app/components/login/login.template.html'));
});*/
// Serve static files on all other routes
app.get('/meenakshi/', function(req, res) {
  console.log(req.body);
  res.sendFile(path.join(__dirname, 'public/app/index.html'));
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/app/index.html'));
});



// Start server
var server = http.createServer(app);
var port = process.env.PORT || '3000';
server.listen(port, function() {
  console.log('API running on port ' + port);
});
