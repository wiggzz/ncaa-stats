'use strict';

let teamsHtmlToJson = require('../adapter/teams-html-to-json'),
  getTeamsHtmlFromNCAA = require('../service/get-teams-html-from-ncaa');

module.exports = function teams(req, res) {
  return getTeamsHtmlFromNCAA()
    .then(teamsHtmlToJson)
    .then(teams => {
      res.json({teams});
    })
    .catch(error => {
      res.status(500).end();
    });
};
