# ncaa-stats

This little guy will scrape stats from stats.ncaa.org and makes them available through a REST JSON API. Right now it's set up for NCAA Div. 1 lacrosse, but the API could be expanded.

# installation

```
git clone https://github.com/wiggzz/ncaa-stats
cd ncaa-stats
npm install
```

# running

To kick off the server on the default port, run

```
npm start
```

Then hit http://localhost:3000/teams in your browser to see the team list.

# development

To run the tests, run

```
npm test
```
