var mongoose = require('mongoose')

var parkedVehiclesSchema = new mongoose.Schema({
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
    fine: {
        type: Number
    }

});

var parkedVehicles = mongoose.model('parkedVehicles', parkedVehiclesSchema);

module.exports = parkedVehicles;