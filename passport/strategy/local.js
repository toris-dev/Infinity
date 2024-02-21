const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');
const hashPassword = require('../../utils/hash-password');

const config = {
  usernameField: 'id',// 'id' 필드 사용하도록 설정
  passwordField: 'pwd'// 'password' 필드 사용하도록 설정
};

/**
 * 작성자 : 이정은
 * 작성일: 2024.02.20
 * passport.js를 이용해 구현할 로그인 API입니다.
 */
const local = new LocalStrategy(config, async (id, pwd, done) => {
    try {
      const user = await User.findOne({ id });
      if (!user) {
        throw new Error('회원을 찾을 수 없습니다.');
      }
      // 검색 한 유저의 비밀번호와 요청된 비밀번호의 해쉬값이 일치하는지 확인
      if (user.pwd !== hashPassword(pwd)) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      done (null, {
        id: user.id,
      });
    } catch (err) {
      done(err, null);
    }
  });
  
  module.exports = local;