// Pre-loader
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");

  preloader.addEventListener("transitionend", function () {
    preloader.style.display = "none";
  });

  setTimeout(function () {
    preloader.classList.add("loaded");
  }, 2000);
});

// Nav Active
var navItems = document.getElementsByClassName("nav_item");

for (var i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");

    if (current.length > 0) {
      current[0].classList.remove("active");
    }

    this.classList.add("active");
  });
}

// Theme Toggler
function calculateThemeString() {
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

function updateButton({ btnEl, isActive }) {
  const symbolEl = btnEl.querySelector(".theme-symbol");
  const symbol = isActive ? "&#9724;" : "&#9723;";
  const buttonText = isActive ? "Dark" : "Light";
  const newCta = `Change to ${buttonText} theme`;

  btnEl.setAttribute("aria-label", newCta);
  symbolEl.innerHTML = symbol;
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

const lightThemeButton = document.querySelector("[data-theme-light]");
const darkThemeButton = document.querySelector("[data-theme-dark]");

let currentThemeSetting = calculateThemeString();

updateButton({
  btnEl: lightThemeButton,
  isActive: currentThemeSetting === "light",
});
updateButton({
  btnEl: darkThemeButton,
  isActive: currentThemeSetting === "dark",
});
updateThemeOnHtmlEl({
  theme: currentThemeSetting,
});

lightThemeButton.addEventListener("click", () => {
  const newTheme = "light";
  localStorage.setItem("theme", newTheme);
  updateButton({
    btnEl: lightThemeButton,
    isActive: true,
  });
  updateButton({
    btnEl: darkThemeButton,
    isActive: false,
  });
  updateThemeOnHtmlEl({
    theme: newTheme,
  });
  currentThemeSetting = newTheme;
});

darkThemeButton.addEventListener("click", () => {
  const newTheme = "dark";
  localStorage.setItem("theme", newTheme);
  updateButton({
    btnEl: lightThemeButton,
    isActive: false,
  });
  updateButton({
    btnEl: darkThemeButton,
    isActive: true,
  });
  updateThemeOnHtmlEl({
    theme: newTheme,
  });
  currentThemeSetting = newTheme;
});
