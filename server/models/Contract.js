const conn = require('../utilities/mysql');

module.exports.getContract = async (contractID) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT C.*, CP.content AS complaintContent, CP.status AS complaintStatus FROM Contract C LEFT JOIN Complaint CP ON C.contractID = CP.contractID WHERE C.contractID = ?', [contractID])
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res || !res[0])
        return null;

    return res[0];
};

module.exports.getContractByTeacher = async (teacherEmail) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT C.*, CP.content AS complaintContent, CP.status AS complaintStatus FROM Contract C LEFT JOIN Complaint CP ON C.contractID = CP.contractID WHERE C.teacherEmail = ?', [teacherEmail])
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

module.exports.getContractByStudent = async (studentEmail) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT C.*, CP.content AS complaintContent, CP.status AS complaintStatus FROM Contract C LEFT JOIN Complaint CP ON C.contractID = CP.contractID WHERE C.studentEmail = ?', [studentEmail])
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

module.exports.updateStatus = async (contractID, status) => {
    let date = '';
    if (status === 0 || status === 1) {
        const today = new Date();
        const endDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        date = `, endDate = '${endDate}'`;
    }

    let query = `UPDATE Contract SET status = '${status}' ${date} where contractID = '${contractID}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.updateReview = async (contractID, contract) => {

    let query = `UPDATE Contract SET review = '${contract.review}', rating = '${contract.rating}' where contractID = '${contractID}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.createContract = async (contract) => {
    const today = new Date();
    const creationDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const [res, f] = await conn.getConnection()
        .query('INSERT INTO Contract SET ?', {
            teacherEmail: contract.teacherEmail,
            studentEmail: contract.studentEmail,
            subject: contract.subject,
            creationDate: creationDate,
            startDate: contract.startDate,
            endDate: contract.endDate,
            signedPrice: contract.signedPrice,
            totalHour: contract.totalHour,
            totalPrice: contract.totalPrice,
            status: 2,
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};


module.exports.createComplaint = async (complaint) => {

    const [res, f] = await conn.getConnection()
        .query('INSERT INTO Complaint SET ?', {
            contractID: complaint.contractID,
            content: complaint.content,
            status: 2
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.getIncome = async (teacherEmail) => {
    const [res, f] = await conn.getConnection()
        .query(`SELECT endDate as date, sum(totalPrice) as value FROM Contract  WHERE status = 1 AND teacherEmail = '${teacherEmail}' GROUP BY endDate ORDER BY endDate ASC`)
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
