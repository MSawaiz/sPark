var mongoose = require('mongoose');

var operatorSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    },
    duty: {
        dutyPost: {
            type: String
        },
        dutyStartTime: {
            type: String
        },
        dutyEndTime: {
            type: String
        }
    },
    loggingActivity:[{
        signinTime: {
            type: String
        },
        signoutTime: {
            type: String
        },
        dutyPost: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Operator', operatorSchema);