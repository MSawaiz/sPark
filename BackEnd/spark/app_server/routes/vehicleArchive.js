var express = require('express');
var router = express.Router();
var veh = require('../controllers/vehicleArchiveController');


router.get('/', function (req, res, next) {
    res.render("index");
});

router.post('/addvehicle', veh.addarchive);

router.get('/viewvehicle/:obj', veh.viewarchive);



module.exports = router;