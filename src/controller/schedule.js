'use strict';

let scheduleHtmlToJson = require('../adapter/schedule-html-to-json'),
  getScheduleHtmlFromNCAA = require('../service/get-schedule-html-from-ncaa'),
  memoize = require('../util/memoize');

function rawGetSchedule(teamId) {
  return getScheduleHtmlFromNCAA(teamId)
    .then(scheduleHtmlToJson);
}

var memoizedGetSchedule = memoize(rawGetSchedule);

module.exports = function schedule(req, res) {
  var teamId = req.params.id;

  return memoizedGetSchedule(teamId)
    .then(schedule => {
      res.json({schedule});
    })
    .catch(error => {
      res.status(500).end();
    });
};
