var mongoose = require('mongoose');

var vehiclesListSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true
    },
    model: [{
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }]
});

var vehiclesList = mongoose.model('vehiclesList', vehiclesListSchema);

module.exports = vehiclesList;