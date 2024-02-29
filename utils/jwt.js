const jwt = require('jsonwebtoken');

const secret = `${process.env.SECRET}`;

exports.secret = secret;

exports.setUserToken = (res, user) => {
  // 유저 jwt 토큰생성
  const token = jwt.sign(user, secret, { expiresIn: '2h' });
  // 토큰을 쿠키로 전달
  res.cookie('token', token);
};
