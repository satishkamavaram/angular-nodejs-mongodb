var mongoose = require('mongoose');



module.exports = function dbconnection(){
mongoose.connect('mongodb://localhost:27018/angular', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
}

//Listening on these events , allows to re-establish connection once mongodb is up.

mongoose.connection.on('connecting', function(){
    console.log("trying to establish a connection to mongo");
    console.log(mongoose.connection.readyState);
});

mongoose.connection.on('connected', function() {
    console.log("connection established successfully");
    console.log(mongoose.connection.readyState);
});

mongoose.connection.on('error', function(err) {
    console.log('connection to mongo failed ' + err);
    console.log(mongoose.connection.readyState);
});

mongoose.connection.on('disconnected', function() {
    console.log('mongo db connection closed');
    console.log(mongoose.connection.readyState);
});
