var connect = require('./connect');
var vehArch = require('../models/vehiclesArchiveSchema');
var parVeh = require('../models/parkedVehiclesSchema');

module.exports.vehicleArchController = function (req, res) {
    res.render('index', { title: 'Express' })
}

module.exports.addarchive = function (req, res, next) {
    parVeh.findOne({ 'vehicle.licensePlateNumber': req.body.LPN }, function (err, doc) {
        if (err) {
            res.status(500).send('Error Occurred')
            console.log('error')
        }
        else {
            if (doc) {
                var arcveh = new vehArch({
                    vehicle: {
                        licensePlateNumber: doc.vehicle.licensePlateNumber,
                        category: doc.vehicle.category
                    },
                    location: {
                        floor: doc.location.floor,
                        lane: doc.location.lane
                    },
                    checkinTime: doc.checkinTime,
                    checkoutTime: req.body.checkout,
                    fine: doc.fine,
                    fee: req.body.fee
                });
                arcveh.save(function (err, result) {
                    if (err) {
                        console.log('DB ERROR')
                    }
                    else {
                        doc.remove()
                        res.json("Vehicle successfully checked out")
                    }
                })
            }
            else
                console.log("vehicle not found")
        }
    })
}

module.exports.viewarchive = function (req, res, next) {
    console.log("done")
    var obj = JSON.parse(req.params.obj)
    console.log(obj.LPN)
    vh = {}
    if (obj.LPN != null)
        vh = { ...vh, 'vehicle.licensePlateNumber': { $regex: '.*' + obj.LPN + '.*' } }
    if (obj.fine == true)
        vh = { ...vh, fine: { $ne: 0 } }
    if (obj.size != null) {
        vh = { ...vh, 'vehicle.category': obj.size }
    }
    if (obj.floor != null) {
        vh = { ...vh, 'location.floor': parseInt(obj.floor) + 1 }
    }
    if (obj.lane != null) {
        vh = { ...vh, 'location.lane': obj.lane }
    }
    if (obj.feef != null) {
        vh = { ...vh, fee: { $gte: obj.feef } }
        if (obj.feet != null) {
            vh = { ...vh, fee: { $lte: obj.feet } }
        }
    }
    console.log(vh)
    vehArch.find(vh, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
};