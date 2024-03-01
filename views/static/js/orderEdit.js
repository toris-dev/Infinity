import { BASE_URI } from '../js/constant/url.js';
import { getCookie } from './lib/getCookie.js';

export const orderEdit = async () => {
  const cookie = getCookie('token');
  if (!cookie) {
    navigateTo(BASE_URI);
  }
  /**
   * 회원 정보
   */
  const userTokenRes = await fetch(`${BASE_URI}/api/users/getUserId`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie}`
    }
  });
  const user = await userTokenRes.json();
  const userId = user.userId;
  
  const findOrderRes = await fetch(`${BASE_URI}/api/orders?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie}`
    }
  });



  //회원 정보 setting
  const userInfo = await findUserRes.json();
  const phoneNum = userInfo.phoneNum;
  console.log(phoneNum);
  console.log(phoneNum.substr(0,3));
  console.log(phoneNum.substr(3,4));
  console.log(phoneNum.substr(7,4));

  document.querySelector('#delivery-name').value = `${userInfo.name}`;
  document.getElementById("delivery-zipcode").value = `(${userInfo.zipCode})`;
  document.getElementById("delivery-addr").value = `${userInfo.address} ${userInfo.detailAddress}`;

  document.querySelector(".phone1").value = phoneNum.substr(0,3);
  document.querySelector(".phone2").value = phoneNum.substr(3,4);
  document.querySelector(".phone3").value = phoneNum.substr(7,4);

  await fetch(`${BASE_URI}/api/orders?orderNum=${orderNum}`, {
    method: 'PUT',

  })


};