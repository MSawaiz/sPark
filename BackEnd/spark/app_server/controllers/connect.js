var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sPARK', function(err){
    if(err) throw err;
    console.log("Db connected");
});
module.exports = mongoose;