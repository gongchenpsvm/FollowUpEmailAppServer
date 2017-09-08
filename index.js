//initiate application here
const express = require('express');
const mongoose = require('mongoose');
//cookieSession manages all data on cookies.Use cookieSession,
//instead of express-session which stores session not in cookies but in outside services
const cookieSession = require('cookie-session');//Have access to cookies
const passport = require('passport');//Tell passport how to use them
const keys = require('./config/keys');
require('./models/User');//Order matters
require('./services/passport');//Use the model


var promise = mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

const app = express();

//The 3 middlewares modify the incoming requests before sent to route handlers 4
//Tell express to use cookie.
//Pull some data out of cookies. Assign it to req.session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,//How long expires in millisecond
    keys: [keys.cookieKey]
  })
);
//Encode userid inside cookies
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
//   res.send({ bye : 'buddy' });
// });
const authRoutes = require('./routes/authRoutes');
authRoutes(app);
//Dynamic port binding
const PORT = process.env.PORT || 5000;//Environment variable or PORT5000
app.listen(PORT);
