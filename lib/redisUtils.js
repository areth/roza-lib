const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis);

const redisUtils = {
  channelNewRecord: 'new_record',
  channelRemovedRecord: 'rem_record',
  channelRemovedUndoRecord: 'rem_undo_record',
};

redisUtils.recordKey = id => `rec:${id}`;
redisUtils.removedRecordKey = id => `remrec:${id}`;

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
