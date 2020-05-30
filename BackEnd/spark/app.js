var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
require('./passport')(passport);
var session = require('express-session');
var cors = require('cors');
var ps = require('python-shell');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mapRouter = require('./app_server/routes/map');
var operatorsRouter = require('./app_server/routes/operator');
var userRouter = require('./app_server/routes/user');
var feeRouter = require('./app_server/routes/fee');
var vehicleArchRouter = require('./app_server/routes/vehicleArchive');
var parkedVehRouter = require('./app_server/routes/parkedVehicles');
var vehListRouter = require('./app_server/routes/vehicleList');
var cameraRouter = require('./app_server/routes/camera');
var authRouter = require('./app_server/routes/auth')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'ourscret',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/signup', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/map', mapRouter);
app.use('/operator', operatorsRouter);
app.use('/signup', authRouter);
app.use('/fee', feeRouter);
app.use('/vehicleArch', vehicleArchRouter);
app.use('/parVeh', parkedVehRouter);
app.use('/vehLis', vehListRouter);
app.use('/user', userRouter);
app.use('/camera', cameraRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var tmpPark = require('./app_server/models/tempParkSchema');
var camera = require('./app_server/models/cameraSchema');
var vhcl = require('./app_server/models/parkedVehiclesSchema');

// setInterval((req, res, next) => {
//   let options = {
//     mode: 'text',
//     //pythonPath: '/usr/bin/python',//only enable it if you have python installed different from default location
//     pythonOptions: ['-u'], // get print results in real-time
//     scriptPath: path.join(__dirname, 'public', 'pythonscripts'),//Path to your python script
//     args: ['value1', 'value2']//If you want to add some variable that can be accessed in Python script by system.value1 etc
//   };

//   ps.PythonShell.run('myp.py', options, function (err, results) {//running your script file actually
//     if (err) throw err;
//     console.log(results);
//   });
// }, 2000)


// const sleep = require('sleep-promise')
// camera.find({}, async function (err, result) {
//   if (err) throw err;

//   for (cam of result) {

//     let options = {
//       mode: 'text',
//       pythonOptions: ['-u'], // get print results in real-time
//       scriptPath: path.join(__dirname, 'public', 'pythonscripts'),//Path to your python script
//       args: [cam.location.floor, cam.location.lane[0], cam.location.lane[1]]//If you want to add some variable that can be accessed in Python script by system.value1 etc
//     };
//     await sleep(5000)
//     ps.PythonShell.run('checkVehicle.py', options, function (err, result) {//running your script file actually
//       if (err) throw err;
//       console.log(result);
//       console.log(result[0])
//       tmpPark.findOne({ 'vehicle.licensePlateNumber': result[0] }, function (err, data) {
//         if (err) throw err;
//         console.log(data)
//         if (data.location.floor == result[1] && data.location.lane == result[2]) {
//           res.send("OK")
//           console.log("OK")
//         }
//         else {
//           vhcl.findOneAndUpdate({ 'vehicle.licensePlateNumber': result[0] }, {
//             location: {
//               floor: result[1],
//               lane: result[2]
//             }
//           },
//             function (err, result1) {
//               if (err) throw err
//               console.log(result1)
//               res.send(result1)
//             });
//           data.remove()
//         }
//       });
//     });
//     break //to be removed when more camera's are connected
//   }
// });
module.exports = app;