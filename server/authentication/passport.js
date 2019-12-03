const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const TeacherModel = require('../models/Teacher');
const StudentModel = require('../models/Student');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// ############################# LOCAL STRATEGY #############################

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function (req, username, password, cb) {

        if (!req.body.type) {
            return cb(null, false, {
                returnCode: -6,
                returnMessage: 'Param Type Invalid'
            });
        }

        let user = null;
        if (req.body.type === 1) {
            user = await TeacherModel.getUser(username);
        } else if (req.body.type === 2) {
            user = await StudentModel.getUser(username);
        }

        if (!user) {
            return cb(null, false, {
                returnCode: -3,
                returnMessage: `User ${username} Not Found`
            });
        }

        if (user.status === 0) {
            return cb(null, false, {
                returnCode: -5,
                returnMessage: 'Account Has Been Blocked'
            });
        }

        bcrypt.compare(password, user.password).then((res) => {
            if (!res) {
                return cb(null, false, {
                    returnCode: -2,
                    returnMessage: 'Wrong Password'
                });
            }

            return cb(null, user, {
                returnCode: 1,
                returnMessage: 'Success'
            });
        });
    }
));

// ############################# JWT STRATEGY #############################

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: '1612145'
    },
    async function (jwtPayload, next) {
        try {
            let user = null;
            if (jwtPayload.type === 1) {
                user = await TeacherModel.getUser(jwtPayload.email);
            } else if (jwtPayload.type === 2) {
                user = await StudentModel.getUser(jwtPayload.email);
            }
            if (user) {
                next(null, user);
            } else {
                next(null, jwtPayload);
            }
        } catch (e) {
            console.error(e);
            next(null, jwtPayload);
        }
    }
));
