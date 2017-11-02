# length&ndash;Time lengths for humans [![Build Status](https://secure.travis-ci.org/Submersible/node-length.png?branch=master)](http://travis-ci.org/Submersible/node-length)

## Time Types

Milliseconds | Unit
-------------|-----
31560000 | y, year, years
2629740 | mo, month, months
86400 | d, day, days
3600 | h, hour, hours
60 | m, minute, minutes
1 | s, sec, second, seconds
0.001 | ms, millisecond, milliseconds
0.000001 | us, microsecond, microseconds

## Downloads

Tested to work against Internet Explorer 6+, Safari 3+, Google Chrome 1+, Firefox 3+, and Opera 10+!

[Development Version (0.0.1)](https://github.com/Submersible/node-length/blob/master/dist/length.js) — 1.4 KiB, uncompressed with comments.

[Production Version (0.0.1)](https://github.com/Submersible/node-length/blob/master/dist/length.min.js) — 424 bytes, minified and gzipped.

## var num = length(number, [to])

### Parameter: number

* `number` — This may either be a string, or a number.  If it's a string with no type, it's
assumed to be in the `to` format.
* _Optional_ `to` — The format to interval to return, defaults to 'ms'.

```javascript
length('0.5s') === 500;
length('1h', 's') === 3600;
length(10, 's') === 10;
length('2 days', 'h') === 48;
```

## License

MIT
