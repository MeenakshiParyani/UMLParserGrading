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
var dbConfig = require('./../config/db');
var mysql = require('mysql');
var connection = mysql.createConnection(dbConfig.connectionParams);


router.get('/', function(req, res) {
    res.status(200).json({status: 'OK'});
});


router.post('/login', function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user + ' =======' + pass);
    console.log(req);
    var query = 'SELECT * from Tenants where username = "'+ user + '" AND password = "'+ pass + '"';
    connection.query(query , 
      function(err, rows, fields) {
      if (!err){
        if(1 > rows.length){
          tenant = rows[0];
          res.send({'status' : 'error'});
        }else{
          console.log('The solution is: ', rows);
          res.json({'status' : 'success', 'tenant' : rows[0]});
        } 
      }
      else{
        console.log('Error while performing Query.' + err);
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

router.post('/grade', function(req, res) {
    var tableName = req.body.tableName;
    var tenantId = req.body.tenantId;
    var result = req.body.result;
    console.log(tableName + ' =======' + tenantId + '=========' + result);

    var query = 'INSERT INTO ' + tableName + ' ("tenant_id", "result") VALUES ("'+ tenantId +'","'+ result+'")';
    console.log(query);
    connection.query(query , 
      function(err, rows, fields) {
      if (!err){
        if(1 > rows.length){
          res.send({'status' : 'error'});
        }else{
          console.log('The solution is: ', rows);
          res.json({'status' : 'success', 'tenant' : rows[0]});
        } 
      }
      else{
        console.log('Error while performing Query.' + err);
        res.send({'status' : 'error'});
      }
    });
});

module.exports = router;