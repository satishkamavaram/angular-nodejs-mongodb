var mongoose = require('mongoose');
var schema  =  mongoose.Schema;
var mongooseUniqueValidator  = require('mongoose-unique-validator');

var shoppingSchema   = new schema({
    shoppingList : { type : Array , "default" : [],required : true },
    userId : {type : schema.Types.ObjectId, ref:'Users'}
});

shoppingSchema.plugin(mongooseUniqueValidator);

module.exports  = mongoose.model("shopping",shoppingSchema);  //Here shopping is a collectionName is MongoDB

/*Allowed schema types
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array*/
