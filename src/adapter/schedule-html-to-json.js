'use strict';

let cheerio = require('cheerio'),
  elementMatchers = require('./element-matchers');;

module.exports = function scheduleHtmlToJson(html) {
  var $ = cheerio.load(html);

  return $('.mytable').first().find('tr').has('.smtext').map((index, row) => {
    var cols = $(row).children();
    var game = elementMatchers.extractGameFromElement(cols.eq(1));
    game.date = new Date(cols.eq(0).text());
    game.result = elementMatchers.extractResultFromElement(cols.eq(2));
    return game;
  }).get();
}
