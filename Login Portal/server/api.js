var express = require('express');
var request = require('request');
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
var request = require('request');

router.get('/', function(req, res) {
    res.status(200).json({status: 'OK'});
});


router.post('/login', function(req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user + ' =======' + pass);
    console.log(req);
    var query = 'SELECT * from Tenants where username = "'+ user + '" AND password = "'+ pass + '"';
    var tenant;
    connection.query(query , 
      function(err, rows, fields) {
      if (!err){
        if(1 > rows.length){
          tenant = rows[0];
          res.send({'status' : 'error'});
        }else{
          console.log('The solution is: ', rows);
           tenant = rows[0];
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