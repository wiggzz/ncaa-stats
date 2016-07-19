var memoizee = require('memoizee'),
  promisify = require('es6-promisify');


function memoize(fn) {
  return memoizee(fn, { maxAge: 24*60*60*1000 });
}

module.exports = memoize;
