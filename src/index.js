'use strict';

let express = require('express'),
  teams = require('./controller/teams');

var app = express();

app.get('/teams', teams);

console.log('Listening on localhost:3000 ...');
app.listen(3000);
