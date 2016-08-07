var memoizee = require('memoizee');


function memoize(fn) {
  return memoizee(fn, { maxAge: 24*60*60*1000 });
}

module.exports = memoize;
