const fs = require('fs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/User');
const redis = require('../utilities/redis');
const transporter = require('../utilities/MailUtil');

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

        user.status = 2;
        user.token = bcrypt.hashSync(user.email, 8);

        const result = await userModel.createUser(user);

        if (result != null && result.affectedRows === 1) {
            if (user.type === 1)
                redis.del(redis.REDIS_KEY.ALL_TEACHER);

            //send activation mail
            fs.readFile(__dirname + '/MailActiveAccount.html', function (err, data) {
                if (err) {
                    console.log(err);
                    return res.json({
                        returnCode: 0,
                        returnMessage: "Exception. Retry Later."
                    });
                }

                let mailContent = data.toString();
                mailContent = mailContent
                    .replace("{{EMAIL}}", user.email)
                    .replace("{{CURRENT_IP}}", process.env.CURRENT_IP)
                    .replace("{{TOKEN}}", user.token);

                const mail = {
                    from: 'scttshopv2@gmail.com',
                    to: user.email,
                    subject: '[UberForTutor] Kích hoạt tài khoản',
                    html: mailContent
                };

                transporter.sendMail(mail, function (error, info) {
                    if (error) {
                        console.log(err);
                        return res.json({
                            returnCode: 0,
                            returnMessage: "Exception. Retry Later."
                        });
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({
                            returnCode: 1,
                            returnMessage: "Success."
                        });
                    }
                });
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

exports.forgotPass = async function (req, res, next){
    try {
        const user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, req.body.email, userModel.getUser);

        if (!user || user.status === 0) {
            return res.json({
                returnCode: -3,
                returnMessage: `User ${req.body.email} Not Found`
            });
        }

        const result = await userModel.changePassword(req.body.email, 'Aa123456');
        if (result != null && result.affectedRows === 1){
            redis.del(redis.REDIS_KEY.USER + req.body.email);
            redis.del(redis.REDIS_KEY.ALL_TEACHER);
            fs.readFile(__dirname + '/MailResetPass.html', function (err, data) {
                if (err) {
                    console.log(err);
                    return res.json({
                        returnCode: 0,
                        returnMessage: "Exception. Retry Later."
                    });
                }

                const mail = {
                    from: 'scttshopv2@gmail.com',
                    to: req.body.email,
                    subject: '[UberForTutor] Reset mật khẩu',
                    html: data.toString()
                };

                transporter.sendMail(mail, function (error, info) {
                    if (error) {
                        console.log(err);
                        return res.json({
                            returnCode: 0,
                            returnMessage: "Exception. Retry Later."
                        });
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.json({
                            returnCode: 1,
                            returnMessage: "Success."
                        });
                    }
                });


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

exports.activateAccount = async function (req, res, next){
    try {
        const {email, token} = req.query;
        if (!email || !token){
            return res.json('error',{
                returnCode: -6,
                returnMessage: `Param email or token invalid`
            });
        }

        const user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, email, userModel.getUser);

        if (!user || user.status === 0) {
            return res.json('error',{
                returnCode: -3,
                returnMessage: `User ${email} Not Found`
            });
        }

        if (user.status === 1) {
            return res.render('error',{
                returnCode: 2,
                returnMessage: `User ${email} Already Activate`
            });
        }

        const match = bcrypt.compare(user.token, token);
        if (!match){
            return res.render('error',{
                returnCode: -2,
                returnMessage: 'Token Not Match'
            });
        }

        const result = await userModel.updateStatus(email, 1);
        if (result != null && result.affectedRows === 1){
            redis.del(redis.REDIS_KEY.USER + email);
            redis.del(redis.REDIS_KEY.ALL_TEACHER);
            return res.render('close');
        } else {
            return res.render('error',{
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }

    } catch (e) {
        console.error(e);
        return res.render('error',{
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};

