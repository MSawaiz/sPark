var mongoose = require('mongoose');

var cameraSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        floor: {
            type: String
        },
        lane: [
            {
                type: String
            }
        ]
    }
});

var Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;