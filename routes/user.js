var express = require('express');
var userHanlder = require('../handler/userHandler');
var router = express.Router();


router.post('/', userHanlder.createUser);

router.post('/signin', userHanlder.signinUser);

module.exports = router;
