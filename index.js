const express = require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const keys = require ('./config/keys');
const cookieSession = require ('cookie-session');
const passport = require ('passport');

require ('./models/User');
require ('./services/passport');

const authRoutes = require ('./routes/authRoutes');

mongoose.connect ('mongodb://localhost/auth', {
  useNewUrlParser: true,
  keepAlive: true,
});

const app = express ();

app.use ( cors ());

app.use (express.static (__dirname + '/public'));

app.use (
  cookieSession ({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(express.json())
app.use (passport.initialize ());
app.use (passport.session ());

authRoutes (app);

app.listen (5000, (req, res) => {
  console.log ('app has started');
});
