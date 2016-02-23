'use strict';

let cheerio = require('cheerio');

module.exports = function teamsHtmlToJson(html) {
  var $ = cheerio.load(html);

  return $('td a').map((index, elem) => {
    var href = $(elem).attr('href');
    var idMatcher = new RegExp(/\/team\/([0-9]+)\/[0-9]+/);
    var matches = href.match(idMatcher);
    return {
      id: parseInt(matches[1]),
      name: $(elem).text()
    };
  }).get();
}
