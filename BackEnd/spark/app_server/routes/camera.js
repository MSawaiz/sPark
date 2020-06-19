var express = require('express');
var router = express.Router();
var cam = require('../controllers/cameraController');


router.get('/',function(req,res,next){
    res.render("index");
});

router.get('/addCamera', cam.addCamera);

router.get('/viewCamera', cam.viewCamera);

module.exports = router;