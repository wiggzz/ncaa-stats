'use strict';

let request = require('request'),
  promisify = require('es6-promisify');

let get = promisify(request.get);

let baseUrl = "http://stats.ncaa.org/team";
let scheduleCode = 12380;

module.exports = function getScheduleHTMLFromNcaa(teamId) {
  let url = `${baseUrl}/${teamId}/${scheduleCode}`;
  return get(url).then((result) => {
    var res = result[0], body = result[1];
    if (res.statusCode != 200) {
      throw new Error('Unable to get schedule HTML from NCAA.');
    }

    return body;
  });
}
