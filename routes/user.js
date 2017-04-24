var express = require('express');
var userHanlder = require('../handler/userHandler');
var router = express.Router();
var mongoose = require('mongoose');

router.use(function(req,res,next){
    if(mongoose.connection.readyState) {
    console.log("connection established successfully");
    console.log(mongoose.connection.readyState);
    next();
  } else{
    console.log("connection not available");
    console.log(mongoose.connection.readyState);
    return res.status(500).json({
      title : 'Server Error',
      err : 'Server Error'
    });
  }
});

router.post('/', userHanlder.createUser);

router.post('/signin', userHanlder.signinUser);

module.exports = router;
