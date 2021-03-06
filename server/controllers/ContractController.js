const contractModel = require('../models/Contract');
const teacherModel = require('../models/Teacher');
const redis = require('../utilities/redis');

exports.createContract = async function (req, res, next) {
    try {
        const result = await contractModel.createContract(req.body);

        if (result != null && result.affectedRows === 1) {
            redis.del(redis.REDIS_KEY.CONTRACT + result.insertId);
            redis.del(redis.REDIS_KEY.CONTRACT_BY_STUDENT + req.body.studentEmail);
            redis.del(redis.REDIS_KEY.CONTRACT_BY_TEACHER + req.body.teacherEmail);

            const newContract = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT, result.insertId, contractModel.getContract);

            return res.json({
                returnCode: 1,
                returnMessage: "Success.",
                data: newContract
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

exports.createComplaint = async function (req, res, next) {
    try {
        const result = await contractModel.createComplaint(req.body);

        if (result != null && result.affectedRows === 1) {
            const contract = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT, req.body.contractID, contractModel.getContract);
            redis.del(redis.REDIS_KEY.CONTRACT + req.body.contractID);
            redis.del(redis.REDIS_KEY.CONTRACT_BY_STUDENT + contract.studentEmail);
            redis.del(redis.REDIS_KEY.CONTRACT_BY_TEACHER + contract.teacherEmail);

            const newContract = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT, req.body.contractID, contractModel.getContract);

            return res.json({
                returnCode: 1,
                returnMessage: "Success.",
                data: newContract
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

exports.getContract = async function (req, res, next) {
    try {
        const contract = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT, req.params.contractID, contractModel.getContract);
        if (contract) {
            return res.json({
                returnCode: 1,
                returnMessage: "Success",
                data: contract
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

exports.getContractByTeacher = async function (req, res, next) {
    try {
        let contracts = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT_BY_TEACHER, req.params.teacherEmail, contractModel.getContractByTeacher);
        if (!contracts) {
            contracts = [];
        }

        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: contracts
        });
    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};

exports.getContractByStudent = async function (req, res, next) {
    try {
        let contracts = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT_BY_STUDENT, req.params.studentEmail, contractModel.getContractByStudent);
        if (!contracts) {
            contracts = [];
        }

        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: contracts
        });
    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};

exports.updateStatus = async function (req, res, next) {
    try {
        const contractID = req.params.contractID;
        const result = await contractModel.updateStatus(contractID, req.body.status);

        if (result != null && result.affectedRows === 1) {
            redis.del(redis.REDIS_KEY.CONTRACT + contractID);
            const newContract = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT, contractID, contractModel.getContract);

            redis.del(redis.REDIS_KEY.CONTRACT_BY_STUDENT + newContract.studentEmail);
            redis.del(redis.REDIS_KEY.CONTRACT_BY_TEACHER + newContract.teacherEmail);
            redis.del(redis.REDIS_KEY.INCOME + newContract.teacherEmail);

            return res.json({
                returnCode: 1,
                returnMessage: "Success.",
                data: newContract
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

exports.updateReview = async function (req, res, next) {
    try {
        const contractID = req.params.contractID;
        const result = await contractModel.updateReview(contractID, req.body);

        if (result != null && result.affectedRows === 1) {
            redis.del(redis.REDIS_KEY.CONTRACT + contractID);
            const newContract = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONTRACT, contractID, contractModel.getContract);

            redis.del(redis.REDIS_KEY.CONTRACT_BY_STUDENT + newContract.studentEmail);
            redis.del(redis.REDIS_KEY.CONTRACT_BY_TEACHER + newContract.teacherEmail);
            redis.del(redis.REDIS_KEY.INCOME + newContract.teacherEmail);

            const result2 = await teacherModel.updateRating(newContract.teacherEmail);
            if (result2 != null && result2.affectedRows === 1) {
                redis.del(redis.REDIS_KEY.ALL_TEACHER);
                redis.del(redis.REDIS_KEY.USER + newContract.teacherEmail);
            }

            return res.json({
                returnCode: 1,
                returnMessage: "Success.",
                data: newContract
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

exports.getIncome = async function (req, res, next) {
    try {
        const result = {date: [], value: []};
        let income = await redis.getAsyncWithCallback(redis.REDIS_KEY.INCOME, req.params.teacherEmail, contractModel.getIncome);
        if (income) {
            for (let i of income){
                result.date.push(i.date);
                result.value.push(i.value);
            }
        }

        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: result
        });
    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};
