'use strict';

let request = require('request'),
  promisify = require('es6-promisify');

let get = promisify(request.get);

let baseUrl = "http://stats.ncaa.org/team/inst_team_list?academic_year=2016&conf_id=-1&division=1&sport_code=MLA"

module.exports = function getTeamsHtmlFromNCAA() {
  return get(baseUrl).then((result) => {
    var res = result[0], body = result[1];
    if (res.statusCode != 200) {
      throw new Error('Unable to get team HTML from NCAA.');
    }

    return body;
  });
}
