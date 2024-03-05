const { AuthError } = require('./error-handler');

module.exports = (req, res, next) => {
  const { user } = req;
  if (user.roleId === 'admin') {
    next();
    return;
  }
  //403 error
  throw new AuthError();
};
