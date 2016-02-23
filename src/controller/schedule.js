'use strict';

let scheduleHtmlToJson = require('../adapter/schedule-html-to-json'),
  getScheduleHtmlFromNCAA = require('../service/get-schedule-html-from-ncaa');

module.exports = function teams(req, res) {
  var teamId = req.params.id;
  return getScheduleHtmlFromNCAA(teamId)
    .then(scheduleHtmlToJson)
    .then(schedule => {
      res.json({schedule});
    })
    .catch(error => {
      res.status(500).end();
    });
};
