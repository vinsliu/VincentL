// Theme Toggler
function calculateSettingAsThemeString() {
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

let currentThemeSetting = calculateSettingAsThemeString();

updateButton({
  btnEl: lightThemeButton,
  isActive: currentThemeSetting === "light",
});
updateButton({
  btnEl: darkThemeButton,
  isActive: currentThemeSetting === "dark",
});
updateThemeOnHtmlEl({ theme: currentThemeSetting });

lightThemeButton.addEventListener("click", () => {
  const newTheme = "light";
  localStorage.setItem("theme", newTheme);
  updateButton({ btnEl: lightThemeButton, isActive: true });
  updateButton({ btnEl: darkThemeButton, isActive: false });
  updateThemeOnHtmlEl({ theme: newTheme });
  currentThemeSetting = newTheme;
});

darkThemeButton.addEventListener("click", () => {
  const newTheme = "dark";
  localStorage.setItem("theme", newTheme);
  updateButton({ btnEl: lightThemeButton, isActive: false });
  updateButton({ btnEl: darkThemeButton, isActive: true });
  updateThemeOnHtmlEl({ theme: newTheme });
  currentThemeSetting = newTheme;
});
