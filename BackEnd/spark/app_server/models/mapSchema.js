var mongoose = require('mongoose');

var mapSchema = new mongoose.Schema({
    floor: [{
        name: {
            type: Number
        },

        lane: [{
            name: {
                type: String
            },
            size: {
                type: Number
            },
            remSize: {
                type: Number
            }
        }]
    }],
    post: {
        entrancePost: [{
            name: {
                type: String
            }
        }],
        exitPost: [{
            name: {
                type: String
            }
        }]
    }
});

var Map = mongoose.model('Map', mapSchema);

module.exports = Map;