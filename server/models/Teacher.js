const conn = require('../utilities/mysql');
const bcrypt = require('bcryptjs');

module.exports.getAllUser = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Teacher WHERE status = ?', [1])
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
        delete obj.password;
        delete obj.updDate;
        obj.canTeachingPlaces = JSON.parse(obj.canTeachingPlaces);
        obj.skills = JSON.parse(obj.skills);
        result.push(obj);
    }

    return result;
};

module.exports.getUser = async (email) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Teacher WHERE email = ?', [email])
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

module.exports.createUser = async (user) => {
    const hash = bcrypt.hashSync(user.password, 8);
    const [res, f] = await conn.getConnection()
        .query('INSERT INTO Teacher SET ?', {
            password: hash,
            email: user.email,
            fullName: user.fullName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            avatar: 'https://www.speakingtigerbooks.com/wp-content/uploads/2017/05/default-avatar.png',
            status: 1
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
//
// module.exports.updateUser = async (username, user) => {
//
//     let query = `UPDATE AdminUser SET email = '${user.email}', fullName = '${user.fullName}', phoneNumber = '${user.phoneNumber}', status = '${user.status}' where username = '${username}'`;
//     const [res, f] = await conn.getConnection()
//         .query(query).then(([rows, fields]) => {
//             return [rows, fields];
//         }).catch((err) => {
//             console.error(err.message);
//             return [null, null];
//         });
//
//     return res;
// };
//
// module.exports.changePassword = async (username, password) => {
//     const hash = bcrypt.hashSync(password, 8);
//
//     let query = `UPDATE AdminUser SET password = '${hash}' where username = '${username}'`;
//     const [res, f] = await conn.getConnection()
//         .query(query).then(([rows, fields]) => {
//             return [rows, fields];
//         }).catch((err) => {
//             console.error(err.message);
//             return [null, null];
//         });
//
//     return res;
// };
