import { getCookie } from '../static/js/lib/getCookie.js';
export const rightbar = () => {
  const $rightBar = document.getElementById('rightbar');
  const cookie = getCookie('token');
  if (!cookie) {
    $rightBar.innerHTML = `
    <div class="cart-txt">
      <a href="/cart" data-link>Cart ― 0</a>
    </div>
    <div class="right-element">
      <a href="/login" class="log" data-link>Log in</a>
      <a href="/signup" data-link>Register</a>
    </div>`;
    return;
  }

  $rightBar.innerHTML = `
      <div class="cart-txt">
        <a href="/cart" data-link>Cart ― 0</a>
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
