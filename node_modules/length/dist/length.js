/*jslint node: true, vars: true */

var length = (function () {
    'use strict';

    var MATCH_NUM = /^\s*([0-9]*\.?[0-9]+)\s*([A-Za-z ]*)\s*$/,
        ERROR_TYPE = 'No time length type: ',
        lengths = {};

    // Save some bytes by macroing the hash
    var length_list = [
        [3156e7, ['y', 'year']],
        [262974e4, ['mo', 'month']],
        [864e5, ['d', 'day']],
        [36e5, ['h', 'hour']],
        [6e4, ['m', 'minute']],
        [1e3, ['s', 'sec', 'second']],
        [1, ['ms', 'millisecond']],
        [1e-3, ['us', 'microsecond']]
    ];
    for (var key in length_list) {
        var strs = length_list[key][1];
        strs.push(strs[strs.length - 1] + 's');
        strs.forEach(function (str) {
            lengths[str] = length_list[key][0];
        });
    }

    return function (str, to, match, from) {
        to = to || 'ms';
        if (typeof str === 'number') {
            str = String(str) + to;
        }
        match = MATCH_NUM.exec(str);
        if (!match) {
            throw new Error('Could not parse time length: ' + str);
        }
        from = match[2].replace(/ +/g, '') || 'ms';
        if (!lengths[from]) {
            throw new Error(ERROR_TYPE + from);
        }
        if (!lengths[to]) {
            throw new Error(ERROR_TYPE + to);
        }
        return Number(match[1]) * (lengths[from] / lengths[to]);
    };
}());
