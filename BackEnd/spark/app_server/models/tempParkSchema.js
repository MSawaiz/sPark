var mongoose = require('mongoose')

var tempParkSchema = new mongoose.Schema({
    vehicle: {
        licensePlateNumber: {
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
});

var tempPark = mongoose.model('tempPark', tempParkSchema);

module.exports = tempPark;