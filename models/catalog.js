var mongoose = require('mongoose');
var schema  =  mongoose.Schema;
var mongooseUniqueValidator  = require('mongoose-unique-validator');

var catalogSchema   = new schema({
    name : {type : String, required : true},
    desc : {type : String, required : true},
    imagePath :{type : String, required : true},
    shoppingItems : { type : Array , "default" : [] },
    createdDate : { type: Date, default: Date.now },
    updatedDate : { type: Date, default: Date.now },
    createdBy : {type : schema.Types.ObjectId, ref:'Users'},
    updatedBy : {type : schema.Types.ObjectId, ref:'Users'}
});

catalogSchema.plugin(mongooseUniqueValidator);

module.exports  = mongoose.model("catalogs",catalogSchema);
