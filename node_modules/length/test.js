/*jslint node: true */

'use strict';

var length = require('./'),
    test = require('tap').test;

test('lengths', function (t) {
    t.equal(length('5s'), 5000);
    t.equal(length('5h', 's'), 18000);
    t.equal(length('0.5'), 0.5);
    t.equal(length('.5'), 0.5);
    t.equal(length(' .5   '), 0.5);
    t.equal(length(0.5), 0.5);
    t.equal(length(' .5   m s '), 0.5);
    t.end();
});
