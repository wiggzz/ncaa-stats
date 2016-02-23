'use strict';

let cheerio = require('cheerio'),
  elementMatchers = require('./element-matchers');;

module.exports = function scheduleHtmlToJson(html) {
  var $ = cheerio.load(html);

  return $('.mytable').first().find('tr').has('.smtext').map((index, row) => {
    var cols = $(row).children();
    var date = new Date(cols.first().text());
    var opponent = elementMatchers.extractOpponentFromElement(cols.eq(1))
    return {
      date,
      opponent
    };
  }).get();
}
