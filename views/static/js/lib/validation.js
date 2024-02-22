// 패스워드검증을 위한 함수
/**
 *
 * @param {string} password - 비밀번호
 * @param {string} secondPassword - 2차 비밀번호 확인
 * @returns {string} - no -> 비밀번호 불일치, less -> 24글자 이상이거나 특수기호 영소문자, 숫자가 안들어감, ok는 검증완료
 *
 */
const passwordValidation = (password, secondPassword) => {
  // 영문자, 숫자, 특수기호 포함되어있는지 확인
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:\'",.<>?]).{8,}$/;
  if (password !== secondPassword) {
    return 'no';
  }
  if (password.length > 24 && !passwordRegex.test(password)) {
    return 'less';
  } else {
    return 'ok';
  }
};

/**
 *
 * @param {string} email - email 검사
 * @returns {boolean}
 */
const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

/**
 * 핸드폰 번호 앞 숫자3개, 중간에 숫자3~4개, 맨뒤 숫자4개 검증
 * @param {string} phoneNumber
 * @return {boolean}
 */
const phoneNumberValidation = (phoneNumber) => {
  const phoneRegex = /^\d{3}\d{3,4}\d{4}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return false;
  }
  return true;
};

/**
 * func 으로 element를 검증.
 * @type { (element: HTMLInputElement, func: (value:string) => boolean) => void }
 * @param {HTMLElement} element - html element가 옵니다.
 * @param {(value: string) => boolean} func - 검증할 수 있는 함수가 옵니다.
 * @return {void}
 */
const validation = (element, func) => {
  element.addEventListener('input', (e) => {
    if (func(e.target.value)) {
      element.classList.remove('faild');
    } else {
      element.classList.add('faild');
    }
  });
};
/**
 *
 * @param {string[]} values - input을 검증할 values
 * @return {boolean}
 */
const nullCheckValidation = (values) => {
  let answer = true;
  values.forEach((data) => {
    if (data === '') {
      answer = false;
    }
  });
  return answer;
};

/**
 *
 * @param {HTMLInputElement} radio - radio checked 검사
 * @returns {boolean}
 */
const radioCheckValidation = (radio) => {
  if (!radio.checked) {
    return false;
  }
  return true;
};

export {
  emailValidation,
  nullCheckValidation,
  passwordValidation,
  phoneNumberValidation,
  radioCheckValidation,
  validation
};
