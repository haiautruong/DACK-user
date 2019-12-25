const teacherModel = require('../models/Teacher');
const contractModel = require('../models/Contract');
const skillModel = require('../models/Skill');
const redis = require('../utilities/redis');

exports.getAllTeacher = async function (req, res, next) {
    try {
        let teachers = await redis.getAsyncWithCallback(redis.REDIS_KEY.ALL_TEACHER, '', teacherModel.getAllTeacher);
        if (!teachers)
            teachers = [];

        teachers = teachers.filter(t => t.status === 1);

        res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: {
                tutors: teachers
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

        const teacher = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, email, teacherModel.getTeacher);
        if (!teacher || teacher.status === 0) {
            return res.json({
                returnCode: -3,
                returnMessage: `Teacher ${email} Not Found`
            });
        }

        let contracts = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT_BY_TEACHER, email, contractModel.getContractByTeacher);
        if (!contracts) {
            contracts = [];
        } else {
            contracts = contracts.filter(c => (c.status === 1 || c.status === 3));
        }

        try {
            teacher.canTeachingPlaces = JSON.parse(teacher.canTeachingPlaces);
        } catch (e) {
            teacher.canTeachingPlaces = [];
        }
        try {
            teacher.skills = JSON.parse(teacher.skills);
        } catch (e) {
            teacher.skills = [];
        }
        teacher.contracts = contracts;

        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: teacher
        });

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
        let skills = await redis.getAsyncWithCallback(redis.REDIS_KEY.ALL_SKILL, '', skillModel.getAllSkill);
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
