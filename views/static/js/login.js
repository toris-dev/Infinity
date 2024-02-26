import { navigateTo } from '../../router/index.js';
import { BASE_URI } from './constant/url.js';
import { getCookie } from './lib/getCookie.js';

export const login = () => {
  // 리다이렉트를 login 을 화면에 뿌리고 나서 home 으로 이동하여서 좀 버벅임이 있다.
  const cookie = getCookie('token');
  if (cookie !== undefined) {
    navigateTo(BASE_URI);
  }
  const $LoginBtn = document.querySelector('.btnLogin');
  const $userInputId = document.querySelector('.inputId');
  const $userInputPassword = document.querySelector('.inputPassword');

  // function validateEmail(email) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }

  // function validatePassword(password) {
  //   return passwordRegex.test(password);
  // }

  $LoginBtn.addEventListener('click', () => {
    const enteredEmail = $userInputId.value;
    const enteredPassword = $userInputPassword.value;

    // if (!validateEmail(enteredEmail)) {
    //   alert('이메일이 형식에 맞지 않습니다.');
    //   return;
    // }

    // if (!validatePassword(enteredPassword)) {
    //   alert('비밀번호는 영문자, 숫자, 특수 기호를 포함해야 합니다');
    //   return;
    // }
    // 암호화를 하기 위해서는 secretKey가 필요한데 접근 불가
    fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: enteredEmail,
        pwd: enteredPassword
      })
    }).then((res) => {
      if (!res.ok) {
        alert('없는 사용자 입니다.');
        throw new Error('네트워크 응답이 정상이 아닙니다.');
      }
      res.headers.get('Set-Cookie');
      navigateTo(BASE_URI);
    });
  });
};
