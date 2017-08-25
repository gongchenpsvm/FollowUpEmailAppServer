//initiate application here
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');//Have access to cookies
const passport = require('passport');//Tell passport how to use them
const keys = require('./config/keys');
require('./models/User');//Order matters
require('./services/passport');//Use the model


var promise = mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

const authRoutes = require('./routes/authRoutes');
const app = express();
authRoutes(app);

//Tell express to use cookie
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,//How long expires in millisecond
    keys: [keys.cookieKey]
  })
);
//Tell passport to use cookie
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
//   res.send({ bye : 'buddy' });
// });

//Dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
