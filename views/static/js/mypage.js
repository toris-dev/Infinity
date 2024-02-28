import { getCookie } from './lib/getCookie.js';

export const mypage = () => {
  // 사용자 ID를 가져오는 API 엔드포인트 호출
  fetch('/api/users/getUserId', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('Authorization') // 쿠키에서 토큰을 가져와서 요청 헤더에 포함
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }
      return response.json();
    })
    .then((data) => {
      const id = data.userId; // 서버로부터 받은 사용자 ID
      const token = getCookie('Authorization');
      // 사용자 정보를 가져오는 API 엔드포인트 호출
      return fetch(`http://localhost:3000/api/users?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token // 쿠키에서 토큰을 가져와서 요청 헤더에 포함
        }
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      return response.json();
    })
    .then((userData) => {
      // 사용자 정보 처리
      const name = userData.name;
      const email = userData.email;
      // 이후에 이름과 이메일을 마이페이지에 적용하는 코드를 작성합니다.
      const $nameInput = document.querySelector('.name');
      const $emailInput = document.querySelector('.email');
      $nameInput.innerHTML = `${name} 님`;
      $emailInput.innerHTML = email;
    })
    .catch((error) => {
      console.error('Error fetching user info:', error);
    });
};
