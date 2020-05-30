var localStrategy = require('passport-local').Strategy;
var User = require('./app_server/models/userSchema');
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done) {
        done(null, user)

    })
    passport.use(new localStrategy(function (username, password, done) {
        User.findOne({ username: username }, function (err, result) {
            if (err) { done(err) }
            else {
                if (result) {
                    var valid = result.comparePassword(password, result.password)
                    if (valid) {
                        done(null, {
                            username: result.username,
                            password: result.password
                        })
                    }
                    else {
                        console.log('wrong password')
                        done(null, false)
                    }
                }
                else {
                    console.log('wrong username')
                    done(null, false)
                }
            }
        })
    }))
}