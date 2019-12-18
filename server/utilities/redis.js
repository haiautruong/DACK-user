const redis = require('redis');
const useRedis = (process.env.USE_REDIS === 'true');

const client = useRedis ? redis.createClient() : null;

let oldCacheKey = [];

if (client) {
    client.on('connect', async function () {
        console.log("### Redis Connected ###");

        oldCacheKey = await getAsync(REDIS_KEY.OLD_CACHE_KEY);
        if (oldCacheKey) {
            oldCacheKey = JSON.parse(oldCacheKey);
            for (let key of oldCacheKey)
                client.del(key);
            client.del(oldCacheKey);
        }
        oldCacheKey = [];

    });

    client.on('error', function (err) {
        console.error('### Redis Connected Failed : ' + err);
        process.exit();
    });
}

const getAsync = (key) => {
    return new Promise((resolve, reject) => {
        try {
            if (!useRedis)
                return resolve(null);

            client.get(key, (err, obj) => {
                if (err || !obj) {
                    console.error(`Redis getAsync key [${key}] | err: ${err}`);
                    resolve(null);
                } else {
                    resolve(obj);
                }

            })
        } catch (e) {
            console.error(`Redis getAsync key [${key}] | err: ${e}`);
            reject(null);
        }
    })
};

const getAsyncWithCallback = (prefix, key, callback) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!useRedis) {
                const value = await callback(key);
                return resolve(value);
            }

            client.get(prefix + key, async (err, obj) => {
                if (err) {
                    console.error(`Redis getAsyncWithCallback key [${key}] | err: ${err}`);
                    return resolve(null);
                }

                if (!obj) {
                    const value = await callback(key);
                    if (value) {
                        client.set(prefix + key, JSON.stringify(value));
                        oldCacheKey.push(prefix + key);
                        client.set(REDIS_KEY.OLD_CACHE_KEY, JSON.stringify(oldCacheKey));
                    }

                    resolve(value);
                } else {
                    resolve(JSON.parse(obj));
                }
            })
        } catch (e) {
            console.error(`Redis getAsyncWithCallback key [${key}] | err: ${e}`);
            resolve(null);
        }
    })
};

const del = (key) => {
    if (useRedis)
        client.del(key);
};

const REDIS_KEY = {
    OLD_CACHE_KEY: 'OLD_CACHE_KEY',

    ALL_TEACHER: 'ALL_TEACHER',
    ALL_SKILL: 'ALL_SKILL',

    CONTRACT_BY_TEACHER: 'CONTRACT_BY_TEACHER_',
    CONTRACT_BY_STUDENT: 'CONTRACT_BY_STUDENT_',
    CONTRACT: 'CONTRACT_',

    USER: 'USER_',
};

module.exports = {
    client,
    getAsync,
    getAsyncWithCallback,
    del,
    REDIS_KEY
};
