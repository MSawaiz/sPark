var express = require('express');
var router = express.Router();
var fee = require('../controllers/feeController');


router.get('/',function(req,res,next){
    res.render("index");
});

router.get('/addFee', fee.addFee);

router.get('/viewFee', fee.viewFee);

router.put('/updateFee', fee.updateFee);



module.exports = router;