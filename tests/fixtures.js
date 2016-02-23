'use strict';

let fs = require('fs'),
  path = require('path');

module.exports = {
  teamList: fs.readFileSync(path.resolve(__dirname, './fixtures/team-list.html'))
};
