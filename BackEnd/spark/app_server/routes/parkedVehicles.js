var express = require('express');
var router = express.Router();
var Vehicle = require('../controllers/parkedVehiclesController');


router.get('/',function(req,res,next){
    res.render("index");
});

router.post('/addVehicle', Vehicle.addVehicle);

router.get('/getAllLPN', Vehicle.viewAllLPN);

router.get('/viewVehicle/:obj', Vehicle.viewVehicle);

router.put('/updateVehicle', Vehicle.updateVehicle);

module.exports = router;