'use strict';

let express = require('express'),
  teams = require('./controller/teams'),
  schedule = require('./controller/schedule'),
  divisions = require('./controller/divisions'),
  config = require('config');

var app = express();

app.get('/teams', teams);
app.get('/divs', divisions);
app.get('/divs/:div/teams', teams);
app.get('/years/:year/divs/:div/teams', teams);
app.get('/teams/:id/schedule', schedule);

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Listening on localhost:${port} ...`);
});
