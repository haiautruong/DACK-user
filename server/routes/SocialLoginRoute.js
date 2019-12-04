const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/facebook/init/:userType', function (req, res, next) {
        passport.authenticate('facebook', {
            scope: ['email'],
            state: req.params.userType,
        })(req, res, next)
    }
);

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: 'http://localhost:3001/login',
        session: false

    }), (req, res) => {
        let responseHTML = '<script>res = %value%; window.opener.postMessage(res, "*");window.close();</script>';

        const user = req.user;
        if (user == null) {
            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            }));
            res.send(responseHTML);
            return;
        }

        const token = jwt.sign({
            email: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            type: user.type
        }, '1612145');

        const {password, facebookID, googleID, updDate, ...newUser} = req.user;

        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            returnCode: 1,
            returnMessage: "Login Success",
            data: {
                token: token,
                user: newUser
            }
        }));
        res.send(responseHTML);
    });


router.get('/google/init/:userType', function (req, res, next) {
    passport.authenticate('google', {
        scope: ['profile', 'email', 'openid'],
        state: req.params.userType,
    })(req, res, next)
});

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:3001/login',
        session: false
    }), (req, res) => {
        let responseHTML = '<script>res = %value%; window.opener.postMessage(res, "*");window.close();</script>';
        const user = req.user;
        if (user == null) {
            responseHTML = responseHTML.replace('%value%', JSON.stringify({
                returnCode: 0,
                message: "Exception. Retry Later."
            }));
            res.send(responseHTML);
            return;
        }

        const token = jwt.sign({
            email: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            type: user.type
        }, '1612145');

        const {password, facebookID, googleID, updDate, ...newUser} = req.user;

        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            returnCode: 1,
            returnMessage: "Login Success",
            data: {
                token: token,
                user: newUser
            }
        }));
        res.send(responseHTML);
    });

module.exports = router;
