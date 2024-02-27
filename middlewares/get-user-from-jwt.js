const passport = require('passport');

module.exports = (req, res, next) => {
  if (!req.cookies.token) {
    throw new Error('로그인이 필요한 기능입니다.')
  }

  return passport.authenticate('jwt', { session: false })(req, res, next);
}