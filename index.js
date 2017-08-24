const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');//Order matters
require('./services/passport');//Use the model


var promise = mongoose.connect(keys.mongoURI, {
  useMongoClient: true
});

const authRoutes = require('./routes/authRoutes');
const app = express();
authRoutes(app);
// app.get('/', (req, res) => {
//   res.send({ bye : 'buddy' });
// });

//Dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
