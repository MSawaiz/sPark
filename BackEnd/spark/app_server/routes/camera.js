var express = require('express');
var router = express.Router();
var fee = require('../controllers/cameraController');


router.get('/',function(req,res,next){
    res.render("index");
});

router.get('/addCamera', fee.addCamera);

router.get('/viewCamera', fee.viewCamera);

module.exports = router;