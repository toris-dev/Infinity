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
//   const userTokenRes = await fetch(`${BASE_URI}/api/users/getUserId`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${cookie}`
//     }
//   });
//   const user = await userTokenRes.json();
//   const userId = user.userId;

  const findOrderRes = await fetch(`${BASE_URI}/api/payments?orderNum=${orderNum}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie}`
    }
  });
  //회원 정보 setting
  const userInfo = await findUserRes.json();
  console.log(userInfo.orderId);
  document.querySelector('#delivery-choice-1').innerHTML =
    `${userInfo.name}님 배송지`;
    document.getElementById("delivery_choice_1").value = `(${userInfo.zipCode}) ${userInfo.address} ${userInfo.detailAddress}`

};
