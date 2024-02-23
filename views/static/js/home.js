import { infinityScroll } from './lib/infinityScroll.js';

export function home() {
  const swiper = new Swiper('.main.swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  infinityScroll();
}
