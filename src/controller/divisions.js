'use strict';

module.exports = function divisions(req, res) {
  res.json({
    divisions: [
      {
        name: 'Division 1',
        id: '1'
      },
      {
        name: 'Division 2',
        id: '2'
      },
      {
        name: 'Division 3',
        id: '3'
      }
    ]
  });
};
