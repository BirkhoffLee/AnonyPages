var request    = require('supertest');
var assert     = require('assert');

global.AnonyPages = {};
global.AnonyPages.enableWebLogger = false;

var AnonyPages = require('../lib/index.js');

describe('GET /', function () {
  it('Start express web server', function (done) {
    request(global.AnonyPages.app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});