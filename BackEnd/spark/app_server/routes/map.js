var express = require('express');
var router = express.Router();
var map = require('../controllers/mapController');

router.get('/',function(req,res,next){
    res.render("index");
});

router.post('/addmap', map.addMap);

router.get('/viewmap', map.viewMap);

router.put('/updatemap', map.updateMap);


module.exports = router;