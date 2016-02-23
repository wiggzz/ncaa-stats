'use strict';

let express = require('express'),
  teams = require('./controller/teams'),
  schedule = require('./controller/schedule'),
  config = require('config');

var app = express();

app.get('/teams', teams);
app.get('/teams/:id/schedule', schedule);

let port = config.get('port');
console.log(`Listening on localhost:${port} ...`);
app.listen(port);
