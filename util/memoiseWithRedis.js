'use strict';

let request = require('request'),
  redis = require('redis'),
  promisify = require('es6-promisify'),
  getAsync = promisify(request.get);

var client = redis.createClient();
client.getAsync = promisify(client.get);
client.setAsync = promisify(client.set);

function restore(key) {
  return client.getAsync(key).then(result => {
    return JSON.parse(result);
  });
}

function save(key, object) {
  let stringifiedObject = JSON.stringify(object);
  return client.setAsync(key, stringifiedObject);
}

function memoise(fn) {
  return arg => {
    console.log('Retrieving ' + arg);
    return restore(arg)
      .then(result => {
        if (result !== null) {
          console.log('Retrieved cached version of: ' + arg);
          return result;
        } else {
          throw new Error('Unable to retrieve from cache');
        }
      })
      .catch(error => {
        console.log('Unable to retrieved cached version of: ' + arg);
        function _save(result) {
          console.log('Retrieved fresh version, saving...');
          return save(arg, result).then(() => {
            return result;
          });
        }

        return fn(arg)
          .then(_save);
      });
  };
}

function done() {
  client.quit();
}

module.exports = {
  memoise: memoise,
  done: done
};
