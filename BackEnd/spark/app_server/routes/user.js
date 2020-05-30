var express = require('express');
var router = express.Router();
var usr = require('../controllers/userController');


router.get('/',function(req,res,next){
    res.render("index");
});

router.get('/addAdmin', usr.addAdmin);

router.post('/viewUser', usr.viewUser);

router.put('/updatePass', usr.updatePass);

router.put('/updateft', usr.updateFT);

module.exports = router;