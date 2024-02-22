const LoginBtn = document.querySelector('.btnLogin');
const userInputId = document.querySelector('.inputId');
const userInputPassword = document.querySelector('.inputPassword');

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.[a-zA-Z])(?=.[0-9])(?=.[!@#$%^&()-_=+\|[]{};:'",.<>?]).{8,}$/;
  return passwordRegex.test(password);
}

LoginBtn.addEventListener('click', function () {
  const enteredEmail = userInputId.value;
  const enteredPassword = userInputPassword.value;

  if (!validateEmail(enteredEmail)) {
    alert('이메일이 형식에 맞지 않습니다.');
    return;
  }

  const minLength = 8;
  const maxLength = 24;

  // 길이 확인
  if (
    enteredPassword.length < minLength ||
    enteredPassword.length >= maxLength
  ) {
    alert('비밀번호는 8자리 이상 24자리 미만이어야 합니다');
    return;
  }

  // 영문자 확인
  const containsLetter = /[a-zA-Z]/.test(enteredPassword);

  // 숫자 확인
  const containsNumber = /[0-9]/.test(enteredPassword);

  // 특수 기호 확인
  const containsSpecialChar = /[!@#$%^&*()_+{}\[\]|\\:;"'<,>.?/]/.test(
    enteredPassword,
  );

  if (!containsLetter || !containsNumber || !containsSpecialChar) {
    alert('비밀번호는 영문자, 숫자, 특수 기호를 포함해야 합니다');
  } else {
    alert('로그인 성공');
  }
});
