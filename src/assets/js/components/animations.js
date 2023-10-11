import anime from "animejs/lib/anime.es.js";

(async function () {
  const animateCurrency = () => {
    return anime({
      targets: ".js-currency-item img",
      scale: [1, 1.1, 1],
      duration: 1000,
      delay: anime.stagger(250),
      easing: "linear",
    });
  }

  const animateOneClick = () => {
    const $oneClickBtn = document.querySelector(".js-one-click-btn");
    const $oneClickCursor = document.querySelector(".js-one-click-cursor");
    const oneClickBtnActiveClassName = "one-click-block__btn--active";

    return anime.timeline({
      duration: 600
    })
      .add({
        targets: $oneClickCursor,
        translateX: -30,
        translateY: -15,
        easing: "linear",
        complete() {
          $oneClickBtn.classList.add(oneClickBtnActiveClassName);
        },
      })
      .add({
        targets: $oneClickBtn,
        scale: [1, 1.1, 1],
        easing: "easeInOutQuad",
      })
      .add({
        targets: $oneClickCursor,
        translateX: 0,
        translateY: 0,
        easing: "linear",
        complete() {
          $oneClickBtn.classList.remove(oneClickBtnActiveClassName);
        },
      })
  }

  const animateExchange = () => {
    const $items = document.querySelectorAll(".js-exchange-item");
    const itemWidth = parseInt(getComputedStyle($items[0]).width);
    const $list = document.querySelector(".js-exchange-list");
    const listWidth = parseInt(getComputedStyle($list).width);
    const activeClassName = "js-exchange-item-active";
    const offsetToStart = listWidth - itemWidth;
    const offset = offsetToStart / 2;

    const tl = anime.timeline({
      duration: 500,
      easing: "easeInOutQuad",
      complete() {
        const currentActiveElement = Array.from($items).find((el) =>
          el.classList.contains(activeClassName)
        );
        const newActiveElement = Array.from($items).find((el) => {
          return (
            !el.classList.contains(activeClassName) &&
            getComputedStyle(el).zIndex === "3"
          );
        }
        );

        currentActiveElement.classList.remove(activeClassName);
        newActiveElement.classList.add(activeClassName);
      }
    });

    tl.add({
      targets: $items,
      zIndex: (el) => {
        if(el.classList.contains(activeClassName)) {
          return 1;
        } else {
          return parseInt(getComputedStyle(el).zIndex) + 1;
        }
      },
      easing: "easeInOutQuad",
      complete() {
        const $activeEl = Array.from($items).find((el) =>
          el.classList.contains(activeClassName)
        );

        const $previousElement = $activeEl.previousElementSibling
          || $items[$items.length - 1];

        anime({
          targets: $activeEl.querySelector("img"),
          opacity: [1, 0],
          duration: 500,
        })

        anime({
          targets: $previousElement.querySelector("img"),
          opacity: [0, 1],
          duration: 1000,
        })
      }
    });

    tl.add({
      targets: $items,
      translateX: (el) => {
        const translateX = parseInt(getComputedStyle(el).transform.split(",")[4]) || 0;
        if(el.classList.contains(activeClassName)) {
          return translateX - offsetToStart;
        } else {
          return translateX + offset;
        }
      },
      easing: "easeInOutQuad",
    });

    return tl;
  }

  const animateStatistics = () => {
    return new Promise(async (resolve) => {
      const $items = document.querySelectorAll(".js-statistics-item");

      for (const $el of $items) {
        const $nextElement = $el.nextElementSibling || $items[0];

        anime({
          targets: $el,
          opacity: [1, 0],
          delay: 1000,
          duration: 500,
          endDelay: 500,
          easing: "easeInOutSine",
        });

        await anime({
          targets: $nextElement,
          opacity: [0, 1],
          duration: 500,
          delay: 500,
          easing: "easeInOutSine",
        }).finished;
      }

      resolve();
    })
  }

  const animateMessage = (selector, translate) => {
    return new Promise(async (resolve) => {
      const $items = document.querySelectorAll(selector);

      for (const $el of $items) {
        const $nextElement = $el.nextElementSibling || $items[0];
        const $previousElement = $el.previousElementSibling || $items[$items.length - 1];

        anime({
          targets: $el,
          opacity: [1, 0.7],
          translateY: [0, `-${translate}`],
          scale: [1, 0.9],
          delay: 1000,
          duration: 500,
          endDelay: 500,
          easing: "easeInOutSine",
          begin() {
            $el.style.zIndex = 2;
          }
        });

        await Promise.all([
          anime({
            targets: $nextElement,
            opacity: [0, 1],
            translateY: [translate, 0],
            scale: [0.9, 1],
            duration: 500,
            delay: 1000,
            easing: "easeInOutSine",
            begin() {
              $nextElement.style.zIndex = 3;
            }
          }).finished,
          anime({
            targets: $previousElement,
            opacity: [0.7, 0],
            translateY: [`-${translate}`, translate],
            duration: 500,
            delay: 1000,
            easing: "easeInOutSine",
            begin() {
              $previousElement.style.zIndex = 1;
            }
          }).finished,
        ]);
      }

      resolve();
    })
  }

  while (true) {
    await animateCurrency().finished;
    await animateOneClick().finished;
    for (let i = 0; i < 3; i++) {
      await animateExchange().finished;
    }
    await animateStatistics();
    await animateMessage(".js-send-coin-item", "15%");
    await animateMessage(".js-anonymous-item", "8%");
  }
})();
