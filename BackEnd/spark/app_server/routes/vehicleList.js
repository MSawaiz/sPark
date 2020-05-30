var express = require('express');
var router = express.Router();
var veh = require('../controllers/vehicleListController');


router.get('/', function (req, res, next) {
    res.render("index");
});

router.get('/addLis', veh.addLis);

router.get('/viewLis', veh.viewList);

router.get('/getCat/:veh', veh.getCat);

module.exports = router;