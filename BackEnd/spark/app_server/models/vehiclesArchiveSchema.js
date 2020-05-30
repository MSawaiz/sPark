var mongoose = require('mongoose')

var vehiclesArchiveSchema = new mongoose.Schema({
    vehicle: {
        licensePlateNumber: {
            type: String
        },
        category: {
            type: String
        }
    },

    location: {
        floor: {
            type: String
        },
        lane: {
            type: String
        }
    },

    checkinTime: {
        type: String
    },
    checkoutTime: {
        type: String
    },
    fine: {
        type: Number
    },
    fee: {
        type: Number
    }

});

var vehiclesArchive = mongoose.model('vehiclesArchive', vehiclesArchiveSchema);

module.exports = vehiclesArchive;