const User = require('./models/User.js');
const db = require('./db.js');

const syncAndSeed = () => db
  .sync({ force: true })
  .then(() => {
    // TODO: Seed...
    const users = [
      {id: 1, username: "sam01", password: 'password1'},
      {id: 2, username: 'rob02', password: 'pw02'},
      {id: 3, username:  'lucy03', password: 'pw03'}
    ]
   return Promise.all(users.map(user => User.create(user)));
  })
  .catch(e => {
    console.error(e);
  });

module.exports = {
  models: {
    User,
  },
  db,
  syncAndSeed,
};
