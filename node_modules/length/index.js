/*jslint node: true, nomen: true, stupid: true */
/*global length */

var fs = require('fs'),
    path = require('path'),
    vm = require('vm');

vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'length.js')));
module.exports = length;
