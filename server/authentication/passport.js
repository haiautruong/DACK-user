const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const redis = require('../utilities/redis');

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

        let user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, username, UserModel.getUser);

        if (!user || user.type !== req.body.type) {
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

        if (user.status === 2) {
            return cb(null, false, {
                returnCode: -7,
                returnMessage: 'Account Has Not Been Activated. Login To Your Email To Activate'
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
            let user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, jwtPayload.email, UserModel.getUser);

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

// ############################# FACEBOOK STRATEGY #############################

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
        proxy: true,
        passReqToCallback: true,
        profileFields: ['id', 'displayName', 'emails', 'picture.type(large)']
    },
    async function (req, accessToken, refreshToken, profile, cb) {
        try {
            if (profile.id) {
                console.log(profile);
                const type = parseInt(req.query.state);

                let user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, profile.emails[0].value, UserModel.getUser);

                if (!user) {
                    const newUser = {};
                    newUser.email = profile.emails[0].value;
                    newUser.password = 'Aa123456';
                    newUser.address = '';
                    newUser.phoneNumber = '';
                    newUser.fullName = profile.displayName;
                    newUser.avatar = profile.photos[0].value;
                    newUser.type = type;
                    newUser.status = 1;

                    await UserModel.createUser(newUser);
                    redis.del(redis.REDIS_KEY.ALL_TEACHER);
                    user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, profile.emails[0].value, UserModel.getUser);
                }

                return cb(null, user);
            }
        } catch (e) {
            console.error(e);
            return cb(null, false);
        }
    }));

// ############################# GOOGLE STRATEGY #############################

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true,
        passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, cb) {
        try {
            if (profile.id) {
                console.log(profile);
                const type = parseInt(req.query.state);

                let user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, profile.emails[0].value, UserModel.getUser);

                if (!user) {
                    const newUser = {};
                    newUser.email = profile.emails[0].value;
                    newUser.password = 'Aa123456';
                    newUser.address = '';
                    newUser.phoneNumber = '';
                    newUser.fullName = profile.displayName;
                    newUser.avatar = profile.photos[0].value;
                    newUser.type = type;
                    newUser.status = 1;

                    await UserModel.createUser(newUser);
                    redis.del(redis.REDIS_KEY.ALL_TEACHER);
                    user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, profile.emails[0].value, UserModel.getUser);
                }

                return cb(null, user);
            } else {
                return cb(null, false);
            }
        } catch (e) {
            console.error(e);
            return cb(e);
        }
    }));
