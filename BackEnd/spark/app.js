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
var fee = require('./app_server/models/feeSchema');
const sleep = require('sleep-promise')
const onvif = require('node-onvif');
const fs = require('fs');
const { compare } = require('bcrypt-nodejs');

var device
var fine

camera.find({}, async function (err, result) {
  if (err) throw err;

  fee.findOne({}, function (err, result) {
    if (err) throw err;
    fine = result.fine
  });

  while (true) {
    for (cam of result) {
      let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: path.join(__dirname, 'public', 'pythonscripts'),//Path to your python script
        args: [cam.location.floor, cam.location.lane[0], cam.location.lane[1]]//If you want to add some variable that can be accessed in Python script by system.value1 etc
      };

      device = new onvif.OnvifDevice({
        xaddr: "http://" + cam.name + "/onvif/device_service",
        user: 'admin',
        pass: '123456'
      });
      device.init().then(() => {
        return device.fetchSnapshot();
      }).then((res) => {
        fs.writeFileSync('public/pythonscripts/saved_img.jpg', res.body, { encoding: 'binary' });
      }).catch((error) => {
        console.error(error);
      });
      await sleep(5000)
      ps.PythonShell.run('checkVehicle.py', options, function (err, result) {//running your script file actually
        if (err) throw err;
        console.log(result)
        if (result[0] != "Processing failed") {
          tmpPark.findOne({ 'vehicle.licensePlateNumber': result[0] }, function (err, data) {
            if (err) throw err;
            if (data != null) {
              if (data.location.floor == result[1] && data.location.lane == result[2]) {
                console.log("OK")
                data.remove()
              }
              else {
                vhcl.findOneAndUpdate({ 'vehicle.licensePlateNumber': result[0] }, {
                  location: {
                    floor: result[1],
                    lane: result[2]
                  },
                  fine: fine
                },
                  function (err, result1) {
                    if (err) throw err
                    console.log(result1)
                    data.remove()
                  });
              }
            }
          });
        }
      });
    }
    await sleep(5000)
  }
})

module.exports = app;