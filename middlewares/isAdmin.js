const { AuthError } = require('../middlewares/error-handler')

module.exports = (req, res, next) => {
  const user = req.user;
  console.log(user.roleId);
  if (user.roleId === 'admin') {
    next();
    return
  }
  //403 error
  throw new AuthError();
};
