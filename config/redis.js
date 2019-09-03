const Redis = require('ioredis');

const redisConf = {
    host: '127.0.0.1',
    port: 6379,
    prefix: 'SE:',      // 存储前缀
    ttl: 60 * 60 * 23, // 过期时间
    family: 4,
    db: 0
}

const RedisClient = new Redis(redisConf);

module.exports = RedisClient;