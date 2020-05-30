var express = require('express');
var router = express.Router();
var optr = require('../controllers/operatorController');


router.get('/', function (req, res, next) {
    res.render("index");
});

router.post('/addoperator', optr.addOperator);

router.get('/viewoperators', optr.viewOperators);

router.get('/viewopr/:id', optr.viewOpr);

router.delete('/deleteoperator/:id', optr.deleteOperator);

router.put('/updateoperator', optr.updateOperator);

router.put('/updateopract', optr.updateOprAct);

module.exports = router;