var connect = require('./connect');
var camera = require('../models/cameraSchema');

module.exports.cameraController = function (req, res) {
    res.render('index', { title: 'Express' })
}

module.exports.addCamera = function (req, res, next) {
    console.log("executed")
    var cameras = new camera({
        name: "192.168.1.104:8080",
        location: {
            floor: 1,
            lane: ["B1", "B2"]
        }

    });
    cameras.save(function (err, data) {
        if (err) throw err
        res.json(data)
    });
};

module.exports.viewCamera = function (req, res, next) {
    camera.find({}, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
};