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

describe('extract a game from element', () => {
  describe('given an href element for an away game', () => {
    var game;

    beforeEach(() => {
      let $ = cheerio.load('<span><a href="/team/386/12380">@ Marist </a></span>');

      game = elementMatchers.extractGameFromElement($('span'));
    });

    it('should extract team id if it exists in the href', () => {
      expect(game.opponent.id).to.equal(386);
    });

    it('should extract name and strip padding', () => {
      expect(game.opponent.name).to.equal('Marist');
    });

    it('should extract game location', () => {
      expect(game.location.type).to.equal('away');
    });
  });

  describe('given a text element for a home game', () => {
    var game;

    beforeEach(() => {
      let $ = cheerio.load('<span> Marist </span>');

      game = elementMatchers.extractGameFromElement($('span'));
    });

    it('should extract null team id', () => {
      expect(game.opponent.id).to.be.null;
    });

    it('should extract name and strip padding', () => {
      expect(game.opponent.name).to.equal('Marist');
    });

    it('should extract game location', () => {
      expect(game.location.type).to.equal('home');
    });
  });

  describe('given a text element for a neutral site game', () => {
    var game;

    beforeEach(() => {
      let $ = cheerio.load('<span> Marist @ Denver, CO</span>');

      game = elementMatchers.extractGameFromElement($('span'));
    });

    it('should extract null team id', () => {
      expect(game.opponent.id).to.be.null;
    });

    it('should extract name and strip padding', () => {
      expect(game.opponent.name).to.equal('Marist');
    });

    it('should extract game location', () => {
      expect(game.location.type).to.equal('neutral');
      expect(game.location.name).to.equal('Denver, CO');
    });
  });
});

describe('extract a game result from element', () => {
  describe('a game without overtimes', () => {
    var result;

    beforeEach(() => {
      let $ = cheerio.load('<span><a href="/game/index/4011345?org_id=721" class="skipMask" target="TEAM_WIN">L 9 - 10 </a></span>');

      result = elementMatchers.extractResultFromElement($('span'));
    });

    it('should extract the pointsFor', () => {
      expect(result.pointsFor).to.equal(9);
    });

    it('should extract the pointsAgainst', () => {
      expect(result.pointsAgainst).to.equal(10);
    });
  });
});
