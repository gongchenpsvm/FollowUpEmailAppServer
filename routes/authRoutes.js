const passport = require('passport');
//Export a fucntion from this file. app refers to a express app
module.exports = (app) => {
//GoogleStrategy has string 'google' inside
app.get('/auth/google',
  passport.authenticate('google', {
  scope: ['profile', 'email']
  }));

  //After customers grant permission and return to our site.
  //GoogleStrategy can see the profile code inside url
  //and send follow up request to Google.
  //At same time, the second function of GoogleStrategy gets called.
  app.get('/auth/google/callback', passport.authenticate('google'));
  app.get('/api/logout', (req, res) => {
    req.logout();//take cookie containing the user id and kills it
    res.send(req.user);
  });
  app.get('/api/current_user', (req, res) => {//(incoming request, response)
    res.send(req.user);//passport attach user info to this req object
  });
};
