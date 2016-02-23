'use strict';

let fixtures = require('../fixtures.js'),
  cheerio = require('cheerio'),
  elementMatchers = require('../../src/adapter/element-matchers');

let expect = fixtures.expect;

describe('extract team from element', () => {
  describe('given an href element', () => {
    var team;

    beforeEach(() => {
      let $ = cheerio.load('<a href="/team/81/12380">Bryant</a>');

      team = elementMatchers.extractTeamFromElement($('a'));
    });

    it('should extract team id if it exists in the href', () => {
      expect(team.id).to.equal(81);
    });

    it('should extract team name and strip padding', () => {
      expect(team.name).to.equal('Bryant');
    });
  });
});

describe('extract an opponent from element', () => {
  describe('given an href element for an away game', () => {
    var opponent;

    beforeEach(() => {
      let $ = cheerio.load('<a href="/team/386/12380">@ Marist </a>');

      opponent = elementMatchers.extractOpponentFromElement($('a'));
    });

    it('should extract team id if it exists in the href', () => {
      expect(opponent.id).to.equal(386);
    });

    it('should extract name and strip padding', () => {
      expect(opponent.name).to.equal('Marist');
    });

    it('should extract game location', () => {
      expect(opponent.location.type).to.equal('away');
    });
  });

  describe('given a text element for a home game', () => {
    var opponent;

    beforeEach(() => {
      let $ = cheerio.load('<span> Marist </span>');

      opponent = elementMatchers.extractOpponentFromElement($('span'));
    });

    it('should extract null team id', () => {
      expect(opponent.id).to.be.null;
    });

    it('should extract name and strip padding', () => {
      expect(opponent.name).to.equal('Marist');
    });

    it('should extract game location', () => {
      expect(opponent.location.type).to.equal('home');
    });
  });

  describe('given a text element for a neutral site game', () => {
    var opponent;

    beforeEach(() => {
      let $ = cheerio.load('<span> Marist @ Denver, CO</span>');

      opponent = elementMatchers.extractOpponentFromElement($('span'));
    });

    it('should extract null team id', () => {
      expect(opponent.id).to.be.null;
    });

    it('should extract name and strip padding', () => {
      expect(opponent.name).to.equal('Marist');
    });

    it('should extract game location', () => {
      expect(opponent.location.type).to.equal('neutral');
      expect(opponent.location.name).to.equal('Denver, CO');
    });
  })
});
