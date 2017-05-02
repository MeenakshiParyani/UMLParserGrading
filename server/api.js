var express = require('express');
var request = require('request');
var tenants = require('./../public/app/models/Tenant');
var router = express.Router();
var DecompressZip = require('decompress-zip');
var multer  = require('multer');
var path = require('path');
var uploadPath = path.resolve(__dirname + './../uploads/'); 
var libPath = path.resolve(__dirname + '/libs'); 
var sourcePath = path.resolve(__dirname + './../uploads/source/');
var imageAbsPath = path.resolve(__dirname + './../public/app/assets/images');
var imageRelPath = 'assets/images';
var exec = require('child_process').exec;
const util = require('util');

router.get('/', function(req, res) {
    res.status(200).json({status: 'OK'});
});


router.get('/login', function(req, res) {
    var user = req.params.username;
    var pass = req.params.password;
    console.log(user + ' =======' + pass);
    tenants.find({username : user, password : pass}, function(err, user) {
        if (err){
          console.log(err);
          res.send({'status' : 'error'});
        }else{
          if(user)
            res.json({'status' : 'success'}); // return success
          else
            res.send({'status' : 'error'});
        }
    });
});

router.get('/tenant', function(req, res) {
    var user = req.params.username;
    console.log(user + ' =======' + pass);
    tenants.find({username : user}, function(err, tenant) {
        console.log('tenant is ' + tenant);
        if (err){
          console.log(err);
          res.send({'status' : 'error getting user'});
        }else{
          if(tenantName)
            res.json({'tenantName' : tenant.tenantName, 'status' : 'success'}); // return success
          else
            res.send({'status' : 'error getting user'});
        }
    });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath)
    },
     filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

// Save the uploaded file on server and decompress it
router.post('/upload', upload.any(), function (req, res, next) {
  console.log('req is ' + req.files[0].originalname);
  var child = exec('rm -r ' + sourcePath + '/*',
      function (error, stdout, stderr){
        console.log(stdout);
        console.log(error);
        var unzipper = new DecompressZip(uploadPath + '/' + req.files[0].originalname);
        unzipper.on('extract', function (log) {
          console.log('Finished extracting');
        });
        unzipper.on('error', function (err) {
          console.log('Caught an error' + err);
        });
        unzipper.extract({
          path: sourcePath
        });
        res.json(req.files[0].originalname);
  });
    
});

router.get('/parse', function(req, res) {
    var outputFilename = 'output.png';
    var outputFilepath = sourcePath + '/' + outputFilename;
    var child = exec('cp ' + outputFilepath + ' ' + imageAbsPath + '/' + outputFilename,
      function (error, stdout, stderr){
          exec('java -jar ' + libPath + '/umlparser.jar ' + sourcePath + ' ' + outputFilename,
          function (error, stdout, stderr){
            console.log(stdout);
          exec('cp ' + outputFilepath + ' ' + imageAbsPath + '/' + outputFilename,
          function (error, stdout, stderr){
            console.log('Output -> ' + imageRelPath+ '/' + outputFilename);
            if(error !== null){
              console.log("Error -> "+ error);
            }
            res.send(imageRelPath+ '/' + outputFilename);
          });
        });
      });
    
 
module.exports = child;

});

router.put('/order/:orderID', function(req, res) {
  var options = {
    url: process.env.GATEWAY_URL + '/order/' + req.params.orderID,
    method: 'PUT',
    json: req.body
  };

  request(options, function(err, r, body) {
    if (err) { throw err; }
      res.append('Content-Type', 'application/json').status(r.statusCode).send(body);
    });
  });

router.delete('/order/:orderID', function(req, res) {
  request.delete(process.env.GATEWAY_URL + '/order/' + req.params.orderID, function(err, r, body) {
    if (err) { throw err; }
    res.append('Content-Type', 'application/json').status(r.statusCode).send(body);
  });
});

module.exports = router;