const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 5,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.5,
      navigatoin: false,
    },
    575: {
      slidesPerView: 2,
      navigatoin: false,
    },
    991: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});
