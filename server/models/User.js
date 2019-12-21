const conn = require('../utilities/mysql');
const bcrypt = require('bcryptjs');

module.exports.getUser = async (email) => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM User WHERE email = ?', [email])
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
    if (!user.avatar) {
        user.avatar = 'https://www.speakingtigerbooks.com/wp-content/uploads/2017/05/default-avatar.png';
    }
    if (!user.token) {
        user.token = '';
    }

    const hash = bcrypt.hashSync(user.password, 8);
    const [res, f] = await conn.getConnection()
        .query('INSERT INTO User SET ?', {
            password: hash,
            email: user.email,
            fullName: user.fullName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
            status: user.status,
            type: user.type,
            token: user.token
        }).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.updateInfo = async (email, user, avatar) => {

    let query = `UPDATE User SET fullName = '${user.fullName}', phoneNumber = '${user.phoneNumber}', 
                   address = '${user.address}', avatar = '${avatar}'where email = '${email}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.updateStatus = async (email, status) => {

    let query = `UPDATE User SET status = '${status}' where email = '${email}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};

module.exports.changePassword = async (email, password) => {
    const hash = bcrypt.hashSync(password, 8);

    let query = `UPDATE User SET password = '${hash}' where email = '${email}'`;
    const [res, f] = await conn.getConnection()
        .query(query).then(([rows, fields]) => {
            return [rows, fields];
        }).catch((err) => {
            console.error(err.message);
            return [null, null];
        });

    return res;
};
