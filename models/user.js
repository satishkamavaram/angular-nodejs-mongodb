var mongoose = require('mongoose');
var schema  =  mongoose.Schema;
var mongooseUniqueValidator  = require('mongoose-unique-validator');

var userSchema   = new schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : {type : String, required : true,unique:true},
    password : {type : String, required : true}
});

userSchema.plugin(mongooseUniqueValidator);

module.exports  = mongoose.model("Users",userSchema);  //Here Users is a collectionName is MongoDB

/*Allowed schema types
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array*/
