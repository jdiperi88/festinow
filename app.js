const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
require('./api/models/User')
require('./services/passport')

// mongoose mlab setup
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB 🚀');
});
mongoose.connection.on('error', err => {
  console.log('Database error', err);
});

// middleware setup
const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,  // this cookie will be saved for 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


// auth routes
require('./api/routes/authRoutes')(app);


//production environment variable or use 3000 for dev 
const PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Horrible people listen to my port ${PORT} 🚧 `);
});