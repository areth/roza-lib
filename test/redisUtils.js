const chai = require('chai');
const redisUtils = require('../lib/redisUtils');

const { expect } = chai;

describe.skip('redis utils', () => {
  describe('create client', () => {
    it('it should create redis client', (done) => {
      const client = redisUtils.createClient('6379', '127.0.0.1', 'test');
      expect(client).to.be.an('object');
    });
  });
});
