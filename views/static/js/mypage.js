import { navigateTo } from '../../router/index.js';
import { BASE_URI } from './constant/url.js';
import { getCookie } from './lib/getCookie.js';

export const mypage = () => {
  const cookie = getCookie('token');
  if (!cookie) {
    navigateTo(BASE_URI);
  }
  // 사용자 ID를 가져오기
  fetch(`${BASE_URI}/api/users/getUserId`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookie}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('사용자 ID를 가져오는 데 실패했습니다');
      }
      return response.json();
    })
    .then((data) => {
      const id = data.userId;

      // 사용자 정보 가져오기
      return fetch(`${BASE_URI}/api/users?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie}`
        }
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는 데 실패했습니다');
      }
      return response.json();
    })
    .then((userData) => {
      const name = userData.name;
      const email = userData.email;

      // 사용자 정보를 페이지에 적용
      const $nameInput = document.querySelector('.name');
      const $emailInput = document.querySelector('.email');
      $nameInput.innerHTML = `${name} 님`;
      $emailInput.innerHTML = email;

      // 사용자 주문 가져오기
      return fetch(`${BASE_URI}/api/orders?userId=${userData.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie}`
        }
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('사용자 주문을 가져오는 데 실패했습니다');
      }
      return response.json();
    })
    .then((orders) => {
      const orderList = document.querySelector('.order_list_con');
      console.log(orderList);
      if (orders.length === 0) {
        orderList.innerHTML = `<li><div class="ol_list"><img src="/static/images/icon-cancel.png"></div>주문 내역이 없습니다.</li>`;
      } else {
        orders.forEach((order) => {
          let icon = [
            { img: 'icon-button preparing-btn', name: '처리전' },
            { img: 'icon-button delivery-btn', name: '배송중' },
            { img: 'icon-button complete-btn', name: '배송완료' }
          ]; // 기본값은 '준비 중'
          const foundIcon =
            icon.find(({ name }) => name === order.orderState) ||
            'icon-button preparing-btn';
          orderList.innerHTML += `
          <li>
            <div class="ol_list">
              <a href="${BASE_URI}/orders/${order.id}">
              <li><button src="${foundIcon}"></li>
              </a> 
              <p>${order.orderDate}</p>
              <p>${order.orderDetailAddress}</p>
              ${order.orderProds
                .map(
                  (prod) => `
              <a href="${BASE_URI}/product/${prod.prodNum}" data-link>상품 상세보기</a>
              <p>갯수: ${prod.orderProdCount}</p>
              `
                )
                .join('')}
                  <p>요청 사항: ${order.orderReq}</p>
                  <p>주문 번호: ${order.orderZipCode}</p>
            </div>
            
          </li>`;
        });
      }
    })
    .catch((error) => {
      console.error(`사용자 정보를 가져오는 중 에러 발생: ${error}`);
    });
};
