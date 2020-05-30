var mongoose = require('mongoose');

var feeSchema = new mongoose.Schema({
    day: [{
        name: {
            type: String,
        },
        peakStartTime: {
            type: String
        },
        peakEndTime: {
            type: String
        }
    }],
    Rate: {
        peakPrice: {
            type: Number
        },
        normalPrice: {
            type: Number
        },
        perPeakTime: {
            type: Number
        },
        perNormalTime: {
            type: Number
        }
    },
    fine: {
        type: Number
    }

});

var fee = mongoose.model('fee', feeSchema);

module.exports = fee;