'use strict';

function extractTeamId(elem) {
  var href = elem.filter('a').attr('href');
  if (typeof href != 'undefined') {
    var idMatcher = new RegExp(/\/team\/(\d+)\/\d+/);
    var matches = href.match(idMatcher);
    return parseInt(matches[1]);
  } else {
    return null;
  }
}

function opponentFromNameHomeAndLocation(name, home, location) {
  var opponent = {
    location: {},
    name
  };
  opponent.location.type = location ? 'neutral' : home ? 'home' : 'away';
  if (location) {
    opponent.location.name = location;
  }
  return opponent;
}

function extractOpponent(elem) {
  let text = elem.text();
  var matcher = new RegExp(/([^\@]*)(@?)([^\@]*)/);
  var matches = text.match(matcher);
  var name = matches[1].trim();
  var home = matches[2] == '';
  var location = matches[3].trim();
  if (name.length == 0) {
    name = location;
    location = undefined;
  }

  return opponentFromNameHomeAndLocation(name, home, location);
}

function extractTeamName(elem) {
  return elem.text().trim();
}

function extractOpponentFromElement(elem) {
  var opponent = extractOpponent(elem);
  opponent.id = extractTeamId(elem);
  return opponent;
}

function extractTeamFromElement(elem) {
  return {
    id: extractTeamId(elem),
    name: extractTeamName(elem)
  };
};

module.exports = {
  extractOpponentFromElement,
  extractTeamFromElement
};
