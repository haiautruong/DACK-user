require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const passport = require('passport');
const axios = require('axios');
const authenRoute = require('./routes/AuthenRoute');
const publicRoute = require('./routes/PublicRoute');
const privateRoute = require('./routes/PrivateRoute');
const socialLoginRoute = require('./routes/SocialLoginRoute');
const jwtUtil = require('./authentication/jwt');

require('./authentication/passport');

logger.token('body', function (req, res) {
    return JSON.stringify(req.body)
});

const app = express();

// ############ init MySQL Connection ############
const mysql = require('./utilities/mysql');
(async () => {
    try {
        await mysql.initConnection();
        console.log('### MySQL Connected ###');
    } catch (e) {
        console.error('### MySQL Connection Failed :' + e);
        process.exit();
    }
})();

// ########### init Redis Connection ############
const redis = require('./utilities/redis');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger(':method :url :status :response-time ms - :body - '));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', authenRoute);
app.use('/auth', socialLoginRoute);
app.use('/public', publicRoute);
app.use('/private', jwtUtil.validateToken, privateRoute);

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
    res.json({
        returnCode: 0,
        returnMessage: "Exception. Retry Later."
    })
});

module.exports = app;
