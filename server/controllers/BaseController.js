const passport = require('passport');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const redis = require('../utilities/redis');

exports.login = function (req, res, next) {
    passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        if (err || !user) {
            return res.json(info);
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                console.error(err);
                return res.json({
                    returnCode: 0,
                    returnMessage: "Exception. Retry Later."
                });
            }

            const token = jwt.sign({
                email: user.email,
                type: req.body.type
            }, '1612145');

            const {password, updDate, ...newUser} = req.user;
            newUser.type = req.body.type;

            return res.json({
                returnCode: 1,
                returnMessage: "Login Success",
                data: {
                    token: token,
                    user: newUser
                }
            });
        });
    })(req, res);
};

exports.signUp = async function (req, res, next) {
    try {
        const user = req.body;
        const type = user.type;

        if (!type) {
            return res.json({
                returnCode: -6,
                returnMessage: 'Param Type Invalid'
            });
        }

        const find = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, user.email, userModel.getUser);

        if (find != null) {
            return res.json({
                returnCode: -4,
                returnMessage: "Email Is Already Existed. Please Choose Another Email."
            });
        }

        const result = await userModel.createUser(user);

        if (result != null && result.affectedRows === 1) {
            redis.del(redis.REDIS_KEY.ALL_TEACHER);
            const token = jwt.sign({
                email: user.email,
                type: type
            }, '1612145');

            const {password, ...newUser} = user;
            newUser.avatar = 'https://www.speakingtigerbooks.com/wp-content/uploads/2017/05/default-avatar.png';
            newUser.status = 1;

            return res.json({
                returnCode: 1,
                returnMessage: "Login Success",
                data: {
                    token: token,
                    user: newUser
                }
            });
        } else {
            return res.json({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }
    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};
