var connect = require('./connect');
var map = require('../models/mapSchema');
var user = require('../models/userSchema');
var fee = require('../controllers/feeController');
var vhl = require('../controllers/vehicleListController');

module.exports.feeController = function (req, res) {
    res.render('index', { title: 'Express' })
}


module.exports.addMap = function (req, res, next) {

    var mp = new map({
        post: req.body.post,
        floor: req.body.floor
    })

    mp.save(function (err, data) {
        if (err) throw err;
        console.log(data)
        res.json(data)
    });
}


module.exports.viewMap = function (req, res, next) {
    map.findOne({}, function (err, result) {
        if (err) throw err;
        res.json(result)
    });
};

module.exports.updateMap = function (req, res, next) {
    map.findOneAndUpdate({}, {
        post: req.body.post,
        floor: req.body.floor
    }, function (err, result) {
        if (err) throw err;
        res.send(result)
    }
    )
};