const teacherModel = require('../models/Teacher');
const skillModel = require('../models/Skill');
const Firebase = require('../utilities/FirebaseUpload');
const bcrypt = require('bcryptjs');
const redis = require('../utilities/redis');

exports.updateTeacherInfo = async function (req, res, next) {
    try {
        let avatar = req.body.avatar;
        const email = req.params.email;
        const newAvatarFile = req.files[0];

        if (newAvatarFile) {
            try {
                avatar = await Firebase.UploadImageToStorage(newAvatarFile);
            } catch (e) {
                console.error(e);
                avatar = req.body.avatar;
            }
        }

        const result = await teacherModel.updateInfo(email, req.body, avatar);
        if (result != null && result.affectedRows === 1) {
            redis.del(redis.REDIS_KEY.ALL_TEACHER);
            redis.del(redis.REDIS_KEY.TEACHER + email);

            res.json({
                returnCode: 1,
                message: "Success."
            });
        } else {
            res.json({
                returnCode: 0,
                message: "Exception. Retry Later."
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

        const user = await redis.getAsyncWithCallback(redis.REDIS_KEY.TEACHER, email, teacherModel.getUser);

        bcrypt.compare(oldPassword, user.password).then(async (compareRes) => {
            if (!compareRes) {
                return res.json({
                    returnCode: -2,
                    returnMessage: "Old Password Not Match"
                });
            }

            const result = await teacherModel.changePassword(email, newPassword);
            if (result != null && result.affectedRows === 1) {
                redis.del(redis.REDIS_KEY.ALL_TEACHER);
                redis.del(redis.REDIS_KEY.TEACHER + email);

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
