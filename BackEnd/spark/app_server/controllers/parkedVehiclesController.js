var connect = require('./connect');
var vhcl = require('../models/parkedVehiclesSchema');
var tmpPark = require('../models/tempParkSchema');

module.exports.parkedVehiclesController = function (req, res) {
    res.render('index', { title: 'Express' })
}

module.exports.addVehicle = function (req, res, next) {

    vhcl.findOne({ 'vehicle.licensePlateNumber': req.body.tokenId }, function (err, doc) {
        if (err) {
            res.status(500).send('Error Occurred')
            console.log('error')
        }
        else {
            if (doc) {
                res.json('Vehicle Exists')
            }
            else {
                var veh = new vhcl({
                    vehicle: {
                        licensePlateNumber: req.body.tokenId,
                        category: req.body.category
                    },
                    location: {
                        floor: req.body.floor,
                        lane: req.body.lane
                    },
                    checkinTime: req.body.checkin,
                    fine: 0
                });
                veh.save(function (err, doc) {
                    if (err) {
                        console.log('DB ERROR')
                    }
                    else {
                        var tmpPrk = new tmpPark({
                            vehicle: {
                                licensePlateNumber: req.body.tokenId,
                            },
                            location: {
                                floor: req.body.floor,
                                lane: req.body.lane
                            }
                        });
                        tmpPrk.save(function (err, doc) {
                            if (err) {
                                console.log('DB ERROR')
                            }
                            else {
                                res.json("OK")
                            }
                        })
                    }
                })
            }
        }
    })
}

module.exports.viewVehicle = function (req, res, next) {
    var obj = JSON.parse(req.params.obj)
    vh = {}
    if (obj.LPN != null)
        vh = { ...vh, 'vehicle.licensePlateNumber': { $regex: '.*' + obj.LPN + '.*' } }
    if (obj.fine == true)
        vh = { ...vh, fine: { $ne: 0 } }
    if (obj.size != null) {
        vh = { ...vh, 'vehicle.category': obj.size }
    }
    if (obj.floor != null) {
        vh = { ...vh, 'location.floor': obj.floor }
    }
    if (obj.lane != null) {
        vh = { ...vh, 'location.lane': obj.lane }
    }
    if (obj.cidatef != null) {
        vh = { checkinTime: { $gte: "19-1-2020 00:00:00" } }
    }
    vhcl.find(vh, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
};

module.exports.updateVehicle = function (req, res, next) {
    vhcl.findOne({ licensePlateNumber: 'qw123' }).then(doc => {
        doc.details.floor = 7
        doc.details.lane = 9
        // doc.details.checkinTime = "12:22"
        doc.details.fine = 200

        doc.save();
    }).catch(err => {
        console.log(err)
    })
    res.send("success");
}

module.exports.viewAllLPN = function (req, res, next) {
    vhcl.find({}, function (err, results) {
        LPNs=[]
        for (result of results) {
            LPNs.push({"LPN":result.vehicle.licensePlateNumber})
        }
        res.send(LPNs);
    })
};