import { ExecDaumPostcode } from './lib/daumPostCode.js';
import { getCookie } from './lib/getCookie.js';

export const orderEdit = () => {
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
        // 사용자의 주문 정보를 조회해 오는 API 엔드포인트 호출
        return fetch(`http://localhost:3000/api/orders?userId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token // 쿠키에서 토큰을 가져와서 요청 헤더에 포함
          }
        });
      })
      .then((userData) => {
        console.log(`userDate::${userData}`);
        // 사용자 정보 처리
        const name = userData.name;
        const phoneNum = userData.phoneNum;
        const zipCode = userData.zipCode;
        const address = userData.address;
        const detailmoreAddress = userData.detailAddress;
  
        const first = phoneNum.substring(0, 3);
        const second = phoneNum.substring(3, 7);
        const third = phoneNum.substring(7);
        const $detailName = document.querySelector('.profile-name');
        const $detailEmail = document.querySelector('.nameInput');
        const $detailId = document.querySelector('.idInput');
        const $detailphone1 = document.querySelector('.phone1');
        const $detailphone2 = document.querySelector('.phone2');
        const $detailphone3 = document.querySelector('.phone3');
        const $detailzipcode = document.querySelector('.zipcode');
        const $detailaddress = document.querySelector('.address');
        const $detailmoreAddress = document.querySelector('.detailAddress');
  
        $detailName.innerHTML = `${name} 님`;
        $detailEmail.value = email;
        $detailId.value = id;
        $detailId.value = id;
        $detailphone1.value = first;
        $detailphone2.value = second;
        $detailphone3.value = third;
        $detailzipcode.value = zipCode;
        $detailaddress.value = address;
        $detailmoreAddress.value = detailmoreAddress;
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch order info');
        }
        return response.json();
      })
      .then((data) => {
        const orderNum = data._id;
        const token = getCookie('Authorization');
        return fetch(`http://localhost:3000/api/orders/${orderNum}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
            // 여기에 수정된 주문 정보를 담는 객체를 넣어줘야 함
            // 예를 들어, 수정된 주문 정보가 담긴 orderData 객체가 있다고 가정하면:
            // ...body: JSON.stringify(orderData)
            })
        });
      })
      .catch((error) => {
        console.error('Error fetching order info:', error);
      });
    const $findAddress = document.querySelector('#find-address');
  
    // 도로명 주소 검색
    $findAddress.addEventListener('click', ExecDaumPostcode);
  };
  
