var bcrypt =  require('bcryptjs');
var jwt =  require('jsonwebtoken');

var hash  = (value) => {
  var salt = bcrypt.genSaltSync(10);
  var hashedValue =  bcrypt.hashSync(value,salt);
  return hashedValue;
};

var compareHash  = (inputPlainPwd,hashedDBPwd)=> {
  console.log(inputPlainPwd);
  console.log(hashedDBPwd);
  var cstatus = bcrypt.compareSync(inputPlainPwd, hashedDBPwd);
  return cstatus;
};

const secret =  'mysecret';

var getToken  =  (user)=> {
  return jwt.sign({user:user},secret,{expiresIn:7200});
};

var getDecodedToken  =  (requestToken)=> {
   jwt.verify(requestToken,secret,(err,decoded) => {
        if(err)
           return err;
        return decoded;
   });
};


module.exports  =  {
    hashValue : hash,
    compare:compareHash,
    getToken : getToken,
    getDecodedToken : getDecodedToken
}
