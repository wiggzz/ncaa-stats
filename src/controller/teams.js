'use strict';

let teamsHtmlToJson = require('../adapter/teams-html-to-json'),
  getTeamsHtmlFromNCAA = require('../service/get-teams-html-from-ncaa'),
  memoize = require('../util/memoize'),
  config = require('config');

let defaultYear = '2016';
let defaultDivision = '1';

function rawGetTeams(year, div) {
  return getTeamsHtmlFromNCAA(year, div)
    .then(teamsHtmlToJson);
}

var memoizedGetTeams = memoize(rawGetTeams);

module.exports = function teams(req, res) {
  var year = req.params.year;
  var div = req.params.div;
  return memoizedGetTeams(year, div)
    .then(teams => {
      res.json({teams});
    })
    .catch(error => {
      res.status(500).end();
    });
};
