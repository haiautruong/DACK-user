const conn = require('../utilities/mysql');

module.exports.getConversationByTeacher = async (teacherEmail) => {
    const [res, f] = await conn.getConnection()
        .query(`SELECT C.conversationID,U.email, U.fullName, U.avatar, (SELECT M.message FROM Message M WHERE C.conversationID = M.conversationID ORDER BY M.messageID DESC LIMIT 1) AS message FROM Conversation C JOIN User U ON C.studentEmail = U.email WHERE C.teacherEmail = '${teacherEmail}' ORDER BY C.conversationID DESC`)
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    const result = [];

    for (let row of res) {
        const obj = {...row};
        result.push(obj);
    }

    return result;
};

module.exports.getConversationByStudent = async (studentEmail) => {
    const [res, f] = await conn.getConnection()
        .query(`SELECT C.conversationID,U.email, U.fullName, U.avatar, (SELECT M.message FROM Message M WHERE C.conversationID = M.conversationID ORDER BY M.messageID DESC LIMIT 1) AS message FROM Conversation C JOIN User U ON C.teacherEmail = U.email WHERE C.studentEmail = '${studentEmail}' ORDER BY C.conversationID DESC`)
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    const result = [];

    for (let row of res) {
        const obj = {...row};
        result.push(obj);
    }

    return result;
};

module.exports.getConversationID = async (key) => {
    const obj = JSON.parse(key);

    const [res, f] = await conn.getConnection()
        .query(`SELECT conversationID FROM Conversation WHERE studentEmail = '${obj.studentEmail}' AND teacherEmail = '${obj.teacherEmail}' ORDER BY conversationID DESC LIMIT 1`)
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    return res[0].conversationID;
};

module.exports.getConversation = async (conversationID) => {
    const [res, f] = await conn.getConnection()
        .query(`SELECT * FROM Conversation WHERE conversationID = ${conversationID}`)
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    const obj = {};
    obj.conversationID = res[0].conversationID;
    obj.teacherEmail = res[0].teacherEmail;
    obj.studentEmail = res[0].studentEmail;
    return obj;
};

module.exports.getMessages = async (conversationID) => {
    const [res, f] = await conn.getConnection()
        .query(`SELECT * FROM Message WHERE conversationID = ${conversationID}`)
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    const result = [];

    for (let row of res) {
        const obj = {...row};
        result.push(obj);
    }

    return result;
};

module.exports.createMessage = async (message) => {

    const [res, f] = await conn.getConnection()
        .query('INSERT INTO Message SET ?', {
            conversationID: message.conversationID,
            sender: message.sender,
            message: message.message
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.createConversation = async (teacherEmail, studentEmail) => {

    const [res, f] = await conn.getConnection()
        .query('INSERT INTO Conversation SET ?', {
            teacherEmail: teacherEmail,
            studentEmail: studentEmail
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
