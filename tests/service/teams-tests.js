'use strict';

let chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  fixtures = require('../fixtures'),
  nock = require('nock'),
  getTeamsHtmlFromNCAA = require('../../src/service/get-teams-html-from-ncaa');

chai.use(chaiAsPromised);
let expect = chai.expect;

describe('teams-service', () => {
  beforeEach(() => {
    nock('http://stats.ncaa.org').get(/\/team\/inst_team_list.*/).reply(200, fixtures.teamList);
  });

  it('should return an html document', () => {
    let htmlPromise = getTeamsHtmlFromNCAA();

    return expect(htmlPromise).to.eventually.be.a('string');
  });
});
