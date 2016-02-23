'use strict';

let express = require('express'),
  teams = require('./controller/teams'),
  schedule = require('./controller/schedule');

var app = express();

app.get('/teams', teams);
app.get('/teams/:id/schedule', schedule);

console.log('Listening on localhost:3000 ...');
app.listen(3000);
