export const product = () => {
  // eslint-disable-next-line no-undef
  const swiper = new Swiper('.mySwiper.detail2', {
    spaceBetween: 5,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true
  });
  // eslint-disable-next-line no-undef, no-unused-vars
  const swiper2 = new Swiper('.mySwiper2.detail1', {
    spaceBetween: 10,
    thumbs: {
      swiper
    }
  });
};
