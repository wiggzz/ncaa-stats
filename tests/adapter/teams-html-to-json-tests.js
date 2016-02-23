'use strict';

let expect = require('chai').expect,
  teamsHtmlToJson = require('../../src/adapter/teams-html-to-json'),
  fixtures = require('../fixtures');

describe('teams html to json', () => {
  var data;
  beforeEach(() => {
    data = teamsHtmlToJson(fixtures.teamList);
  });

  it('should extract all the teams', () => {
      expect(data.length).to.equal(69);
  });

  it('should extract each team name', () => {
    expect(data[0].name).to.equal('Air Force');
    expect(data[68].name).to.equal('Yale');
  });

  it('should extract each team slug', () => {
    expect(data[0].id).to.equal(721);
  });
});
