const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis);

const redisUtils = {
  channelNewRecord: 'new_record',
  channelDeletedRecord: 'del_record',
  channelUndoDeletedRecord: 'undo_del_record',
};

redisUtils.recordKey = id => `rec:${id}`;
redisUtils.deletedRecordKey = id => `delrec:${id}`;

redisUtils.createClient = (port, host, name) => {
  const client = redis.createClient(port, host);
  client.on('error', (err) => {
    console.log(`Redis ${name} error ${err}`);
  });
  client.on('end', () => {
    console.log(`Redis ${name} is ended`);
  });
  return client;
};

module.exports = redisUtils;
