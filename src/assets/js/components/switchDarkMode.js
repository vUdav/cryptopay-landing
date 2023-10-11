(function() {
  const LS_NAME = "darkMode";
  const DARK_NAME = "dark";
  const DEFAULT_NAME = "default";

  const data = {
    darkMode: false,
  };

  function init() {
    get();

    const $switchBtn = document.querySelector(".js-switch-dark-mode-btn");
    $switchBtn.addEventListener("click", toggle);
  }

  function get() {
    let darkMode = localStorage.getItem(LS_NAME);

    if(darkMode !== null) {
      data.darkMode = darkMode;
      render(true);
    }
  }

  function set(darkMode) {
    localStorage.setItem(LS_NAME, darkMode);
    data.darkMode = darkMode;
    render();
  }

  function toggle() {
    if (data.darkMode === DARK_NAME) {
      set(DEFAULT_NAME);
    } else {
      set(DARK_NAME);
    }
  }

  function render(isFirstRender = false) {
    const html = document.documentElement;

    if(!isFirstRender) {
      html.classList.add('transition');
  
      setTimeout(() => {
        html.classList.remove('transition');
      }, 1000);
    }

    html.setAttribute('data-theme', data.darkMode);

    switchElementsStyles();
  }

  function switchElementsStyles() {
    const $headerBtn = document.querySelector(".js-header-btn");

    if(data.darkMode === DARK_NAME) {
      $headerBtn.classList.add("btn--outline");
      $headerBtn.classList.remove("btn--light");
    } else {
      $headerBtn.classList.add("btn--light");
      $headerBtn.classList.remove("btn--outline");
    }
  }

  init();
})();