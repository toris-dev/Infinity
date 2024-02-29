import { categorysEnum } from '../static/js/constant/categorys.js';
import { BASE_URI } from '../static/js/constant/url.js';
import { getCookie } from '../static/js/lib/getCookie.js';
export const rightbar = async () => {
  const $rightBar = document.getElementById('rightbar');
  const $leftBar = document.querySelector('.menu-list');

  const res = await fetch(`${BASE_URI}/api/category`, {
    method: 'GET'
  });
  const categorys = await res.json();
  console.log(categorys);
  categorys.map((category) => {
    $leftBar.innerHTML = `
      <li><a href="${BASE_URI}/categorys/${categorysEnum[category.prodMajorCategory]}" data-link>${categorysEnum[category.prodMajorCategory]}</a></li>
    `;
  });
  const cookie = getCookie('token');

  if (!cookie) {
    $rightBar.innerHTML = `
    <div class="cart-txt">
      <a href="/shoppingCart" data-link class="totalCartCount">Cart ― 0</a>
    </div>
    <div class="right-element">
      <a href="/login" class="log" data-link>Log in</a>
      <a href="/signup" data-link>Register</a>
    </div>`;
    return;
  }

  $rightBar.innerHTML = `
      <div class="cart-txt">
        <a href="/shoppingCart" data-link class="totalCartCount">Cart ― 0</a>
      </div>
      <div class="right-element">
        <a href="/order" data-link>Order</a>
        <a href="/mypage" data-link>My Page</a>
        <button id="logout">Log out</button>
      </div>
`;

  const $logoutBtn = document.getElementById('logout');
  $logoutBtn.addEventListener('click', () => {
    document.cookie =
      'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  });

  return;
};
