var userModel  = require('../models/user');
var util  = require('../util/util');

var createUser  = function(req,res,next) {
  //Body - { email: 'test1@test.com',pwd: 'test',fname: 'test',lname: 'test' }
  console.log(req.body);
   var hashPwd  =  util.hashValue(req.body.pwd);
   console.log(hashPwd);
   var newUser  = new userModel({
     firstName : req.body.fname,
     lastName : req.body.lname,
     email : req.body.email,
     password : hashPwd
   });
   console.log(newUser);
   saveUser(newUser,res);
}

var signinUser = function(req,res,next) {
  console.log(req.body);
  //Body - { email: 'satishkamavaram@gmail.com', pwd: 'test123' }
    userModel.findOne(
      {email : req.body.email},
      (err,user)=> {
        if(err){
          var title = 'Error Retrieving User';
          errorResponse(title,500,err,res);
        }
         else {
           if(!user){
              var title = 'Login Failed. Retry!';
              errorResponse(title,401,err,res);
            }
            else {
              if(!util.compare(req.body.pwd,user.password)){
                console.log('failed')
                var title = 'Login Failed. Retry!';
                errorResponse(title,401,err,res);
              } else {
                let token = util.getToken(user);
                console.log('token')
                console.log(token);
                return res.status(200).json({
                  msg : 'Successfully Logged In.',
                  userId : user._id,
                  token : token
                });
              }
            }
        }
      }
    )
}





var saveUser  = (newUser,res) => {
  console.log('saving user');
  console.log(newUser);
  newUser.save((err,result)=> {
      console.log('saved user');
    if(err) {
      var title = 'Error Creating User';
      errorResponse(title,500,err,res);
    } else {
      userCreatedResponse(result,res);
   }
  });
}

var errorResponse  = (title ,statuscode,err,res)=> {
  return res.status(statuscode).json({
    title : title,
    err : err
  });
}

var userCreatedResponse  = (result,res)=> {
  return res.status(201).json({
    msg : 'Your account created Successfully.',
    userId : result
  });
}

module.exports  =  {
    createUser : createUser,
    signinUser : signinUser
}
