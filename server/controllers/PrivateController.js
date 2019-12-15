const teacherModel = require('../models/Teacher');
const userModel = require('../models/User');
const skillModel = require('../models/Skill');
const Firebase = require('../utilities/FirebaseUpload');
const bcrypt = require('bcryptjs');
const redis = require('../utilities/redis');

exports.updateTeacherInfo = async function (req, res, next) {
    try {
        let avatar = req.body.avatar;
        const email = req.params.email;
        if (req.file) {
            try {
                avatar = await Firebase.UploadImageToStorage(req.file);
            } catch (e) {
                console.error(e);
                avatar = req.body.avatar;
            }
        }

        const result = await userModel.updateInfo(email, req.body, avatar);
        const result2 = await teacherModel.updateInfo(email, req.body);
        if (result != null && result.affectedRows === 1 && result2 != null && result2.affectedRows === 1) {
            redis.del(redis.REDIS_KEY.ALL_TEACHER);
            redis.del(redis.REDIS_KEY.USER + email);
            //
            // const user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, email, teacherModel.getTeacher);
            // user.type = req.body.type;
            // user.canTeachingPlaces = JSON.parse(user.canTeachingPlaces);
            // user.skills = JSON.parse(user.skills);

            return res.json({
                returnCode: 1,
                returnMessage: "Success."
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

exports.updateStudentInfo = async function (req, res, next) {
    try {
        let avatar = req.body.avatar;
        const email = req.params.email;
        if (req.file) {
            try {
                avatar = await Firebase.UploadImageToStorage(req.file);
            } catch (e) {
                console.error(e);
                avatar = req.body.avatar;
            }
        }

        const result = await userModel.updateInfo(email, req.body, avatar);
        if (result != null && result.affectedRows === 1) {
            redis.del(redis.REDIS_KEY.ALL_TEACHER);
            redis.del(redis.REDIS_KEY.USER + email);
            //
            // const user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, email, teacherModel.getTeacher);
            // user.type = req.body.type;
            // user.canTeachingPlaces = JSON.parse(user.canTeachingPlaces);
            // user.skills = JSON.parse(user.skills);

            return res.json({
                returnCode: 1,
                returnMessage: "Success."
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

exports.changePassword = async function (req, res, next) {
    try {
        const {oldPassword, newPassword} = req.body;
        const email = req.params.email;

        const user = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, email, userModel.getUser);

        bcrypt.compare(oldPassword, user.password).then(async (compareRes) => {
            if (!compareRes) {
                return res.json({
                    returnCode: -2,
                    returnMessage: "Old Password Not Match"
                });
            }

            const result = await userModel.changePassword(email, newPassword);
            if (result != null && result.affectedRows === 1) {
                redis.del(redis.REDIS_KEY.USER + email);

                res.json({
                    returnCode: 1,
                    returnMessage: "Success"
                });
            } else {
                res.json({
                    returnCode: 0,
                    returnMessage: "Exception. Retry Later."
                });
            }
        });

    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};
