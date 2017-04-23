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
