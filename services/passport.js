const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);//not google profile id, but mangoose id
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })//Async
          .then((existingUser) => {
            if (existingUser){
              done( null, existingUser);
            }
            else {
              //Create a mongoose mongo instance
              new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user));
            }
          }
        );
    }
  )
);