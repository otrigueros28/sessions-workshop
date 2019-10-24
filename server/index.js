const path = require('path');
const express = require('express');
const chalk = require('chalk');
const { syncAndSeed } = require('./db/index.js');
const expressSession = require('express-session');
const session = expressSession;
const User = require('./db/models/user.js')

const PORT = 3000;

// DONT WORRY ABOUT THIS, ITS TO HELP YA!
// Due to recent bug in nodemon, this will make sure it restarts without errors.
// If you see red text saying the port is already being used...
// lsof -i :3000
// kill ${the pid you see from the last command}
process.on('uncaughtException', (e) => {
  console.log(chalk.red(e.message));
  process.exit(0);
});

const app = express();

const STATIC_DIR = path.join(__dirname, '../static');

app.use(express.json());
app.use(express.static(STATIC_DIR));

// simple logging middleware to view each request in your terminal - this is useful for debugging purposes
app.use((req, res, next) => {
  console.log(`Request to ${req.path} - Body: `, req.body);
  next();
});

app.use(session({
  secret: 'cookierefresher',
  saveUninitialized: true,
  resave: false,
  cookie: {secure: false}
}));

app.post('/api/login', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
    where: {
      username: username,
      password: password
    }
  })
  .then(user => {
    if (!user) {
    res.status(401).send({ message: 'You are unauthorized!' });
    } else {
      req.session.user = user;
      res.status(200).send({ message: `Hello ${user}, You are logged in` });
    }
  })
  .catch(error => next(error))

  // TODO: This obviously isn't all we should do...
  //res.status(200).send({ something: 'probably user related?' });
  // You can toggle this to see how the app behaves if an error goes down...
  // res.status(401).send({ message: 'You are unauthorized!' });
});

app.get('/api/logout', (req, res, next) => {
  // TODO: Build this functionality.
  next();
});

app.get('/api/session', (req, res, next) => {
  // TODO: Build this functionality.
  const user = req.session.user;
  if(user) {
    return req.send(user)
  } else {
    //next(res.status(401).send({ message: 'You are unauthorized!' }))
    res.status(401).send({ message: 'You are unauthorized!' })
  }


});

app.get('*', (req, res) => res.sendFile(path.join(STATIC_DIR, './index.html')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ err });
});

syncAndSeed()
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.greenBright(`App now listening on http://localhost:${PORT}`));
    });
  });
