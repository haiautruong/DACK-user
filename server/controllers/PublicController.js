const teacherModel = require('../models/Teacher');
const skillModel = require('../models/Skill');
const redis = require('../utilities/redis');

exports.getAllTeacher = async function (req, res, next) {
    try {
        let tutors = await redis.getAsyncWithCallback(redis.REDIS_KEY.ALL_TEACHER, '' , teacherModel.getAllUser);
        if (!tutors)
            tutors = [];

        res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: {
                tutors
            }
        })

    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};

exports.getTeacher = async function (req, res, next) {
    try {
        const email = req.params.email;

        const teacher = await redis.getAsyncWithCallback(redis.REDIS_KEY.TEACHER , email, teacherModel.getUser);
        if (!teacher || teacher.status === 0){
            return res.json({
                returnCode: -3,
                returnMessage: `Teacher ${email} Not Found`
            });
        }

        delete teacher.password;
        delete teacher.updDate;
        teacher.canTeachingPlaces = JSON.parse(teacher.canTeachingPlaces);
        teacher.skills = JSON.parse(teacher.skills);

        res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: teacher
        })

    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};

exports.getAllSkill = async function (req, res, next) {
    try {
        let skills = await redis.getAsyncWithCallback(redis.REDIS_KEY.ALL_SKILL,'', skillModel.getAllSkill);
        if (!skills)
            skills = [];

        res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: {
                skills
            }
        })

    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};
