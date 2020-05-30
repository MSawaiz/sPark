var connect = require('./connect');
var fee = require('../models/feeSchema');

module.exports.feeController = function (req, res) {
    res.render('index', { title: 'Express' })
}


module.exports.addFee = function (req, res, next) {
    console.log("executed")
    var fees = new fee({
        day: [{
            name: 'Sunday',
            peakStartTime: '10:00',
            peakEndTime: '11:00'
        },
        {
            name: 'Monday',
            peakStartTime: '00:00',
            peakEndTime: '00:00'
        },
        {
            name: 'Tuesday',
            peakStartTime: '01:00',
            peakEndTime: '01:00'
        }, {
            name: 'Wednesday',
            peakStartTime: '02:00',
            peakEndTime: '03:00'
        }, {
            name: 'Thursday',
            peakStartTime: '04:00',
            peakEndTime: '05:00'
        }, {
            name: 'Friday',
            peakStartTime: '06:00',
            peakEndTime: '07:00'
        }, {
            name: 'Saturday',
            peakStartTime: '08:00',
            peakEndTime: '09:00'
        }],
        Rate: {
            peakPrice: 0,
            normalPrice: 0,
            perPeakTime: 1,
            perNormalTime: 1
        },
        fine: 0
    });
    fees.save(function (err, data) {
        if (err) throw err
        res.json("succuess!!")
    });
};


module.exports.viewFee = function (req, res, next) {
    fee.findOne({}, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
};

module.exports.updateFee = function (req, res, next) {
    fee.findOneAndUpdate({}, {
        Rate: req.body.Rate,
        fine: req.body.fine,
        day: req.body.day

    }, function (err, result) {
        if (err) throw err;
        res.send(result)
    }
    )
};