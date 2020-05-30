var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    firstTime: {
        type: Boolean
    }
})

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('users', userSchema, 'users');