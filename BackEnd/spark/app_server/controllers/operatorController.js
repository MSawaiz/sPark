var connect = require('./connect');
var operator = require('../models/operatorSchema');
var user = require('../models/userSchema');
var formidable = require('formidable')
var fs = require('fs')

module.exports.operatorController = function (req, res) {
    res.render('index', { title: 'Express' })
}

module.exports.addOperator = function (req, res, next) {

    user.findOne({ username: req.body.uname }, function (err, doc) {
        if (err) {
            res.status(500).send('Error Occurred')
            console.log('error')
        }
        else {
            if (doc) {
                res.json('user')
            }
            else {
                var usr = new user();
                usr.username = req.body.uname;
                usr.password = usr.hashPassword(req.body.pass);
                usr.type = "Operator";

                usr.save(function (err, user) {
                    if (err) throw err
                })

                let base64Image = req.body.img.split(';base64,').pop();
                let imgName = new Date().valueOf();
                fs.writeFile('public/images/' + imgName + '.png', base64Image, { encoding: 'base64' }, function (err) {
                    if (err) throw err
                });

                var optr = new operator({
                    _id: usr._id,
                    firstName: req.body.fname,
                    lastName: req.body.lname,
                    image: imgName + '.png',
                    duty: {
                        dutyPost: req.body.dp,
                        dutyStartTime: req.body.dst,
                        dutyEndTime: req.body.det
                    }
                });
                optr.save(function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(data)
                    }
                });
            }
        }
    })
}

module.exports.viewOperators = function (req, res, next) {
    operator.find({}, function (err, oper) {
        var opr = []
        for (op of oper) {

            op = { imgName: op.image, ...op._doc }

            var readableStream = fs.readFileSync('public/images/' + op.image);

            op.image = "data:image/png;base64," + readableStream.toString('base64')

            opr.push(op)
        }
        user.find({}, function (err, usr) {
            var info = {
                opr, usr
            }
            res.send(info);
        })
    });
    // operator.find({}).sort({'duty.dutyPost':-1}).exec(function (err, opr) {
    //     user.find({}, function (err, usr) {
    //         var info = {
    //             opr, usr
    //         }
    //         res.send(info);
    //     })
    // });
};

module.exports.viewOpr = function (req, res, next) {
    operator.findById(req.params.id, function (err, opr) {
        if (err) throw err;
        res.json(opr)
    });
};

module.exports.updateOperator = function (req, res, next) {
    var id = req.body.id
    var pass = usr.hashPassword(req.body.pass)

    let base64Image = req.body.img.split(';base64,').pop();
    fs.writeFile('public/images/' + req.body.imgName, base64Image, { encoding: 'base64' }, function (err) {
        if (err) throw err
    });
    
    if (pass != null) {
        user.findByIdAndUpdate(id, { password: pass },
            function (err) {
                if (err) throw err
            });
    }
    operator.findByIdAndUpdate(id, {
        firstName: req.body.fname,
        lastName: req.body.lname,
        image: req.body.imgName,
        duty: {
            dutyPost: req.body.dp,
            dutyStartTime: req.body.dst,
            dutyEndTime: req.body.det
        }
    },
        function (err, result) {
            if (err) throw err
            res.send(result)
        });
}

module.exports.deleteOperator = function (req, res, next) {
    id = req.params.id
    user.findByIdAndDelete(id, function (err) {
        if (err) return err;
    });
    operator.findByIdAndDelete(id, function (err, result) {
        if (err) return err;
        res.send(result)
    });
}

module.exports.updateOprAct = function (req, res, next) {
    operator.findByIdAndUpdate(req.body.id, { loggingActivity: req.body.loggingActivity }, function (err, data) {
        if (err) throw err;
        res.json(data)
    });
}