var request = require('supertest');
var assert = require('assert');

var AnonyPages = require('../lib/index.js');

describe('GET /', function () {
    it('Start AnonyPages web server', function (done) {
        request(global.AnonyPages.app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});