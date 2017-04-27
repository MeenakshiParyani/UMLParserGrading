var express = require('express');
var request = require('request');
var tenants = require('./../public/app/models/Tenant');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(200).json({status: 'OK'});
});


router.get('/login', function(req, res) {
    var user = req.params.username;
    var pass = req.params.password;
    console.log(username + ' ' + password);
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

router.get('/order/:orderID', function(req, res) {
  request(process.env.GATEWAY_URL + '/order/' + req.params.orderID, function(err, r, body) {
    if (err) { throw err; }
    res.append('Content-Type', 'application/json').status(r.statusCode).send(body);
  });
});

router.post('/order', function(req, res) {
  var options = {
    url: process.env.GATEWAY_URL + '/order',
    method: 'POST',
    json: req.body
  };

  request(options, function(err, r, body) {
    if (err) { throw err; }
    res.append('Content-Type', 'application/json').status(r.statusCode).send(body);
  });
});

router.post('/order/:orderID/pay', function(req, res) {
  var options = {
    url: process.env.GATEWAY_URL + '/order/' + req.params.orderID + '/pay',
    method: 'POST',
    json: req.body
  };

  request(options, function(err, r, body) {
    if (err) { throw err; }
    res.append('Content-Type', 'application/json').status(r.statusCode).send(body);
  });
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