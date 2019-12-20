const conversationModel = require('../models/Conversation');
const userModel = require('../models/User');
const redis = require('../utilities/redis');

exports.getMessages = async function (req, res, next) {
    try {
        const {teacherEmail, studentEmail} = req.query;
        if (!teacherEmail || !studentEmail){
            console.error('teacherEmail | studentEmail is null');
            return res.json({
                returnCode: 0,
                returnMessage: "Exception. Retry Later."
            });
        }

        const teacher = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, teacherEmail, userModel.getUser);
        const student = await redis.getAsyncWithCallback(redis.REDIS_KEY.USER, studentEmail, userModel.getUser);

        if (!teacher || !student){
            console.error('Teacher | Student not found');
            return res.json({
                returnCode: -3,
                returnMessage: "Teacher or Student not found."
            });
        }

        let conversationID = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONVERSATION_BY_TEACHER_AND_STUDENT, JSON.stringify({
            teacherEmail,
            studentEmail
        }), conversationModel.getConversationID);

        if (!conversationID) {
            const result = await conversationModel.createConversation(teacherEmail, studentEmail);
            if (result != null && result.affectedRows === 1) {
                conversationID = result.insertId;
            } else {
                console.error('conversationID is null');
                return res.json({
                    returnCode: 0,
                    returnMessage: "Exception. Retry Later."
                });
            }
        }

        let messages = await redis.getAsyncWithCallback(redis.REDIS_KEY.MESSAGE, conversationID, conversationModel.getMessages);
        if (!messages) {
            messages = [];
        }

        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: {
                conversationID: conversationID,
                messages: messages
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

exports.getConversationByTeacher = async function (req, res, next) {
    try {
        let conversation = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONVERSATION_BY_TEACHER, req.params.teacherEmail, conversationModel.getConversationByTeacher);
        if (!conversation) {
            conversation = [];
        }

        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: conversation
        });
    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};

exports.getConversationByStudent = async function (req, res, next) {
    try {
        let conversation = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONVERSATION_BY_STUDENT, req.params.studentEmail, conversationModel.getConversationByStudent);
        if (!conversation) {
            conversation = [];
        }

        return res.json({
            returnCode: 1,
            returnMessage: "Success",
            data: conversation
        });
    } catch (e) {
        console.error(e);
        return res.json({
            returnCode: 0,
            returnMessage: "Exception. Retry Later."
        });
    }
};


exports.createMessage = async function (req, res, next) {
    try {
        const result = await conversationModel.createMessage(req.body);

        if (result != null && result.affectedRows === 1) {
            const conversation = await redis.getAsyncWithCallback(redis.REDIS_KEY.CONVERSATION, req.body.conversationID, conversationModel.getConversation);
            redis.del(redis.REDIS_KEY.CONVERSATION_BY_TEACHER + conversation.teacherEmail);
            redis.del(redis.REDIS_KEY.CONVERSATION_BY_STUDENT + conversation.studentEmail);
            redis.del(redis.REDIS_KEY.MESSAGE + req.body.conversationID);

            let newMessages = await redis.getAsyncWithCallback(redis.REDIS_KEY.MESSAGE, req.body.conversationID, conversationModel.getMessages);
            if (!newMessages){
                newMessages = [];
            }

            return res.json({
                returnCode: 1,
                returnMessage: "Success.",
                data: newMessages
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
