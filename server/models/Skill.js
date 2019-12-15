const conn = require('../utilities/mysql');

module.exports.getAllSkill = async () => {
    const [res, f] = await conn.getConnection()
        .query('SELECT * FROM Skill')
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
        const obj = {};
        obj.skillID = row.skillID;
        obj.skillName = row.skillName;

        result.push(obj);
    }

    return result;
};
