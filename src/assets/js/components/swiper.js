import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";

(function () {
  const $activeCountEl = document.querySelector(".js-slider-active-slide");
  const $totalCountEl = document.querySelector(".js-slider-total-slides");

  const swiper = new Swiper(".swiper", {
    modules: [Pagination, Autoplay],

    slidesPerView: 1,
    spaceBetween: 20,
    autoHeight: true,
    direction: "horizontal",
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      992: {
        direction: "vertical",
        autoHeight: false,
        spaceBetween: 193,
      },
    },
  });

  $totalCountEl.innerHTML = firstZero(swiper.slides.length);

  swiper.on('slideChange', function (e) {
    const { realIndex } = e;
    $activeCountEl.innerHTML = firstZero(realIndex + 1);
  });

  function firstZero(number) {
    return number < 10 ? `0${number}` : number;
  }
})();