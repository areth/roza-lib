const chai = require('chai');
const delay = require('../lib/delay');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// const { expect } = chai;
chai.should();
chai.use(sinonChai);

const delayDuration = 3000;
const promValue = 'promValue';
const stub = sinon.stub();

describe('promise delay', () => {
  it('it should delay promise resolving', () => {
    const promResolved = new Promise((resolve, reject) => {
      resolve(promValue);
    });
    return promResolved
      .then(delay(delayDuration))
      .then((val) => { stub(val); })
      .then(() => {
        stub.should.have.been.calledWith(promValue);
      });
  });

  it('it should cause immediate promise rejection', (done) => {
    stub.reset();
    const promRejected = new Promise((resolve, reject) => {
      reject(promValue);
    });
    promRejected
      .then(delay(delayDuration))
      .then((val) => { stub(val); })
      .then(() => {
        // this is wrong, throw it
        done('Promise have to be rejected, but no');
      })
      .catch((err) => {
        stub.should.have.not.been.called;
        done();
      });
  });
});
