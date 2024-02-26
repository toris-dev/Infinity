import { ExecDaumPostcode } from './lib/daumPostCode.js';
import {
  emailValidation,
  idValidation,
  nullCheckValidation,
  passwordValidation,
  phoneNumberValidation,
  radioCheckValidation,
  validation
} from './lib/validation.js';

export const signup = () => {
  const $formEl = document.querySelector('.form');
  const $emailInput = document.querySelector('.input.emailInput');
  const $passwordInput = document.querySelector('.input.password');
  const $passwordCheckInput = document.querySelector('.input.passwordCheck');
  const $postalCode = document.querySelector('.add_button.mt_add_2');
  const $idInput = document.querySelector('.input.IdInput');
  validation($emailInput, emailValidation);
  // signup 전송 함수
  function handleSubmit(e) {
    e.preventDefault();

    const [
      emailInput,
      passwordInput,
      secondPasswordInput,
      // eslint-disable-next-line no-unused-vars
      passwordAnswer,
      question,
      phoneNumber1,
      phoneNumber2,
      phoneNumber3,
      // eslint-disable-next-line no-unused-vars
      addressBtn,
      roadAddress,
      detailsAddress,
      jibunAddress,
      detailAddress,
      extraAddress,
      consent1,
      consent2
    ] = e.target;

    const phoneNumber =
      phoneNumber1.value + phoneNumber2.value + phoneNumber3.value;
    // 패스워드와 패스워드 확인이 다를 경우와 특수기호, 숫자, 영문자 검사
    const isValidPassword = passwordValidation(
      passwordInput.value,
      secondPasswordInput.value
    );
    const isValidId = idValidation($idInput);
    const isValidEmail = emailValidation($emailInput.value);
    const isValidPhoneNumber = phoneNumberValidation(phoneNumber);
    if (!isValidEmail) {
      alert('Email 형식이 맞지 않습니다.');
      return;
    }
    if (!isValidId) {
      alert('ID를 입력해주세요');
      return;
    }
    if (isValidPassword === 'no') {
      alert('입력한 패스워드가 일치하지 않습니다.');
      return; // 폼 제출을 중단합니다.
    }
    if (isValidPassword === 'less') {
      alert(
        '비밀번호는 영문자, 숫자, 특수 기호를 포함하여 8자 이상 24자 이하이어야 합니다.'
      );
      return;
    }
    if (!isValidPhoneNumber) {
      alert('전화번호 형식이 맞지 않습니다.');
      return;
    }

    const nullChecked = nullCheckValidation([
      emailInput.value,
      passwordInput.value,
      secondPasswordInput.value,
      question.value,
      phoneNumber1.value,
      phoneNumber2.value,
      phoneNumber3.value,
      roadAddress.value,
      detailsAddress.value,
      jibunAddress.value,
      detailAddress.value,
      extraAddress.value
    ]);
    if (!nullChecked) {
      alert('빈칸을 작성하세요');
      return;
    }

    if (!radioCheckValidation(consent1) || !radioCheckValidation(consent2)) {
      alert('이용약관에 동의하세요');
    }

    // 데이터 패칭 후
    // fetch(
    //   {
    //     email: emailInput,
    //     password: passwordInput,
    //     question,
    //     phoneNumber,
    //     ... 각종 정보들
    //   },
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );
    // document.cookie = "cookie=res.cookie"
    // window.location.href="/home"
  }

  // form submit
  $formEl.addEventListener('submit', handleSubmit);

  // 패스워드 확인 valueCheck 와 유사
  $passwordInput.addEventListener('input', (e) => {
    const password = $passwordCheckInput.value || '';
    if (passwordValidation(e.target.value, password) === 'ok') {
      $passwordInput.classList.remove('faild');
    } else {
      $passwordInput.classList.add('faild');
    }
  });

  $passwordCheckInput.addEventListener('input', (e) => {
    const password = $passwordInput.value || '';
    if (passwordValidation(e.target.value, password) === 'ok') {
      $passwordCheckInput.classList.remove('faild');
      $passwordInput.classList.remove('faild');
    } else {
      $passwordCheckInput.classList.add('faild');
    }
  });

  // 도로명 주소 검색
  $postalCode.addEventListener('click', ExecDaumPostcode);
};
