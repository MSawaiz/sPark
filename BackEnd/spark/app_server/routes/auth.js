var express = require('express');
var router = express.Router();
var user = require('../models/userSchema');


module.exports = function (passport) {
    router.post('/', function (req, res) {
        // var body=req.body;
        // username=body.username;
        // password=body.password;
        console.log('signup route')
        user.findOne({ username: "bilal" }, function (err, result) {
            if (err) {
                // res.status(500).send('Error Occurred')
                console.log('ERROR')
            }
            else {
                if (result) {
                    // res.status(500).send('User Already Exists')
                    console.log('User Exists')
                }
                else {
                    var record = new user()
                    record.username = username;
                    record.password = record.hashPassword(password)
                    record.save(function (err, user) {
                        if (err) {
                            // res.status(500).send('Error in DB')
                            console.log('error')
                        }
                        else {
                            console.log(user)
                        }
                    })
                }
            }
        })
    });
    // router.post('/login', passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' }))
    return router;
};