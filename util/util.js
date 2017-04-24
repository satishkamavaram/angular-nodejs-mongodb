var bcrypt =  require('bcryptjs');
var jwt =  require('jsonwebtoken');

var hash  = (value) => {
  var salt = bcrypt.genSaltSync(10);
  var hashedValue =  bcrypt.hashSync(value,salt);
  return hashedValue;
};

var compareHash  = (inputPlainPwd,hashedDBPwd)=> {
  var cstatus = bcrypt.compareSync(inputPlainPwd, hashedDBPwd);
  return cstatus;
};

const secret =  'mysecret';

var getToken  =  (user)=> {
  return jwt.sign({user:user},secret,{expiresIn:7200}); //expiry time in seconds
};

var getDecodedToken  =  (requestToken)=> {
   jwt.verify(requestToken,secret,(err,decoded) => {
     console.log('verify token');
     console.log(err);
     console.log(decoded);
     console.log('verified token');
        if(err)
           return '';
        return decoded;
   });
};

var getSecret = () => {
    return secret;
};
var getTokenFromQuery  =  (requestToken)=> {
   return jwt.decode(requestToken);
};



module.exports  =  {
    hashValue : hash,
    compare:compareHash,
    getToken : getToken,
    getDecodedToken : getDecodedToken,
    getTokenFromQuery : getTokenFromQuery,
    getSecret : getSecret
}
