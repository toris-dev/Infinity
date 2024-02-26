import { passwordRegex } from './constans/regex.js';

export const login = () => {
  const $LoginBtn = document.querySelector('.btnLogin');
  const $userInputId = document.querySelector('.inputId');
  const $userInputPassword = document.querySelector('.inputPassword');

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    return passwordRegex.test(password);
  }

  $LoginBtn.addEventListener('click', () => {
    const enteredEmail = $userInputId.value;
    const enteredPassword = $userInputPassword.value;

    if (!validateEmail(enteredEmail)) {
      alert('이메일이 형식에 맞지 않습니다.');
      return;
    }

    if (!validatePassword(enteredPassword)) {
      alert('비밀번호는 영문자, 숫자, 특수 기호를 포함해야 합니다');
    } else {
      alert('로그인 성공');
    }
  });
};
