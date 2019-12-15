const conn = require('../utilities/mysql');
const bcrypt = require('bcryptjs');

module.exports.getAllTeacher = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT U.fullName, U.phoneNumber, U.avatar, T.* FROM User U JOIN Teacher T ON U.email = T.email WHERE U.type=? AND U.status=?', [1, 1])
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
        obj.canTeachingPlaces = JSON.parse(obj.canTeachingPlaces);
        obj.skills = JSON.parse(obj.skills);
        result.push(obj);
    }

    return result;
};

module.exports.getTeacher = async (email) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT U.fullName, U.phoneNumber, U.address, U.avatar, U.status, T.* FROM User U JOIN Teacher T ON U.email = T.email WHERE U.email=?', [email])
        .then(([rows, fields]) => {
            return [rows, fields];
        })
        .catch(err => {
            console.error(err.message);
            return [null, null];
        });

    if (!res[0])
        return null;

    return res[0];
};

module.exports.updateInfo = async (email, user) => {

    let query = `UPDATE Teacher SET pricePerHour = '${user.pricePerHour}',canTeachingPlaces = '${user.canTeachingPlaces}', 
                   selfDescription = '${user.selfDescription}', skills = '${user.skills}' where email = '${email}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

