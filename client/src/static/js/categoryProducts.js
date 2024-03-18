// 카테고리별 상품을 나열할 함수

import { infinityScroll } from './lib/infinityScroll.js';

export const categoryProducts = () => {
  const query = new URLSearchParams(window.location.search);
  const prodCategory = query.get('prodCategory');
  infinityScroll(prodCategory);
};
