var express = require('express');
var util  = require('../util/util');
var router = express.Router();

router.use('/',function(req,res,next){
  var token  =  util.getDecodedToken(req.query.token);
  if(token){
    return res.status(401).json({
      title : 'UnAuthorized User',
      err : err
    });
  }
  next();
});
