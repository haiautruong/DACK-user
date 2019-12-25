const mysql = require('mysql2/promise');
const nodeCleanup = require('node-cleanup');
const redis = require('./redis');

var conn = null;

nodeCleanup(async function (exitCode, signal) {
    if (conn != null){
        console.log("Cleanup Connection...");
        conn.end();
    }

    await redis.deleteOldCache();
    process.exit();
});

module.exports.initConnection = async () => {
    conn = await mysql.createPool({
        host: process.env.MYSQL_DB_HOST,
        user: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        database: "UberForTutor",
        charset: "utf8_general_ci",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        dateStrings: [
            'DATE',
            'DATETIME'
        ]
    });
};

module.exports.getConnection = () => {return conn};
