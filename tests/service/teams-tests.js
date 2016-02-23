'use strict';

let nock = require('nock'),
  fixtures = require('../fixtures'),
  getTeamsHtmlFromNCAA = require('../../src/service/get-teams-html-from-ncaa'),
  getScheduleHTMLFromNcaa = require('../../src/service/get-schedule-html-from-ncaa');

let expect = fixtures.expect;

describe('teams-service', () => {
  describe('getTeamsHtmlFromNCAA', () => {
    beforeEach(() => {
      nock('http://stats.ncaa.org').get(/\/team\/inst_team_list.*/).reply(200, fixtures.teamList);
    });

    it('should return an html document', () => {
      let htmlPromise = getTeamsHtmlFromNCAA();

      return expect(htmlPromise).to.eventually.be.a('string');
    });
  });

  describe('getScheduleHTMLFromNcaa', () => {
    beforeEach(() => {
      nock('http://stats.ncaa.org').get(/\/team\/\d+\/\d+/).reply(200, fixtures.schedule);
    });

    it('should return an html document', () => {
      let htmlPromise = getScheduleHTMLFromNcaa(721);

      return expect(htmlPromise).to.eventually.be.a('string');
    });
  });
});
