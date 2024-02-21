const passport = require('passport');
const local = require('./strategy/local');
const jwt = require('./strategy/jwt');

module.exports = () => {
  // local strategy 사용
  passport.use(local);
  passport.use(jwt);
  // passport.serializeUser((user, callback) => {
  //   callback(null, user);
  // });
  // passport.deserializeUser((obj, callback) => {
  //   callback(null, obj);
  // });
};