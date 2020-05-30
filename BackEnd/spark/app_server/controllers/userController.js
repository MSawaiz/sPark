var connect = require('./connect');
var user = require('../models/userSchema');

module.exports.addAdmin = function (req, res, next) {
    usr = new user()

    usr.username = 'admin'
    usr.password = usr.hashPassword('admin123');
    usr.type = "Admin";
    usr.firstTime = true

    usr.save(function (err, result) {
        if (err) throw err
        res.send(result)
    })
}

module.exports.viewUser = function (req, res, next) {
    usr = new user()

    if (req.body.password == "admin0") {
        user.find({ username: req.body.username }, function (err, result) {
            if (err) throw err;
            if (result) {
                if (usr.comparePassword(req.body.password, result[1].password))
                    res.json(result[1])
                else
                    res.json(null)
            }
            else
                res.json(result)
        })
    }
    else {
        user.findOne({ username: req.body.username }, function (err, result) {
            if (err) throw err;
            if (result) {
                if (usr.comparePassword(req.body.password, result.password))
                    res.json(result)
                else
                    res.json(null)
            }
            else
                res.json(result)
        })
    }
};

module.exports.updatePass = function (req, res, next) {

    usr = new user()

    user.findById(req.body.id, function (err, result) {
        if (err) throw err;
        if (result) {
            if (usr.comparePassword(req.body.oldPass, result.password))
                user.findByIdAndUpdate(req.body.id, { password: usr.hashPassword(req.body.newPass) }, function (err, data) {
                    if (err) throw err;
                    res.json("updated")
                });
            else
                res.json("Incorrect Old Password")
        }
        else
            res.json(result)
    })
}

module.exports.updateFT = function (req, res, next) {

    user.findByIdAndUpdate(req.body.id, { firstTime: false }, function (err, data) {
        if (err) throw err;
        res.json("updated")
    });
}