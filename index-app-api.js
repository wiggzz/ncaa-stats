'use strict';

let request = require('request'),
  promisify = require('es6-promisify'),
  getAsync = promisify(request.get);

let memoiser = require('./memoiseWithRedis');

let get = memoiser.memoise(getAsync);

let prefix = 'http://data.ncaa.com/schedules/';
let seasonPostfix = '/lacrosse-men/d1/2015/01/season.json'
let schedulePostfix = "/schedule.json"

function getJsonObject(url) {
  return get(url).then(result => {
    if (result[0].statusCode == '200') {
      return JSON.parse(result[1]);
    } else {
      throw new Error('Invalid server status code: ' + result[0].statusCode);
    }
  });
}

function getSeasonCalendar() {
  return getJsonObject(prefix + seasonPostfix).then(data => {
    return data.calendar;
  });
}

function getGamesForCalendarEntry(entry) {
  return getJsonObject(prefix + entry.url + schedulePostfix).then(entryDetail => {
    console.log(entryDetail);
  });
}


getSeasonCalendar()
  .then(calendar => {
    calendar.forEach(getGamesForCalendarEntry)
  })
  .then(memoiser.done);
