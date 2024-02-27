module.exports = (req, res, next) => {
  const user = req.user;
  if (user.roleId === 'admin') {
    next();
  }
  //403 error
  throw new Error('권한이 없습니다.');
};
