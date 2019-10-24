const { STRING, INTEGER } = require('sequelize');
const db = require('../db.js');

// TODO: Fill out this model.
const User = db.define('user', {
  id: {
    primaryKey: true,
    type: INTEGER
  },
  username: {
    type: STRING
  },
  password: {
    type: STRING
  }
});

module.exports = User;
