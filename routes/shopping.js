var express = require('express');
var util  = require('../util/util');
var router = express.Router();
var mongoose = require('mongoose');
var shoppingHanlder = require('../handler/shoppingHandler');
var jwt =  require('jsonwebtoken');

router.use(function(req,res,next){
    if(mongoose.connection.readyState) {
      next();
    } else{
    return res.status(500).json({
      title : 'Server Error',
      err : 'Server Error'
    });
  }
});

router.use('/',function(req,res,next){
   jwt.verify(req.query.token,util.getSecret(),(err,decoded) => {
    console.log('verify token');
    console.log(err);
    console.log(decoded);
    console.log('verified token');
       if(err) {
         return res.status(401).json({
           title : 'UnAuthorized User',
           err : 'UnAuthorized User'
         });
       }
       next();
  });
});

router.post('/item', shoppingHanlder.addItemToShopping);
router.get('/', shoppingHanlder.getShoppingList);

module.exports = router;
