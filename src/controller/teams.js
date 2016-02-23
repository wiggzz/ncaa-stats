'use strict';

let teamsHtmlToJson = require('../adapter/teams-html-to-json'),
  getTeamsHtmlFromNCAA = require('../service/get-teams-html-from-ncaa'),
  memoize = require('../util/memoize');

function rawGetTeams() {
  return getTeamsHtmlFromNCAA()
    .then(teamsHtmlToJson);
}

var memoizedGetTeams = memoize(rawGetTeams);

module.exports = function teams(req, res) {
  return memoizedGetTeams()
    .then(teams => {
      res.json({teams});
    })
    .catch(error => {
      res.status(500).end();
    });
};
