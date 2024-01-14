/**
 * Utility function to calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to light mode.
 */
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

/**
 * Utility function to update the button symbol, aria-label, and text.
 */
function updateButton({ btnEl, isActive }) {
  const symbolEl = btnEl.querySelector(".theme-symbol");
  const symbol = isActive ? "&#9724;" : "&#9723;";
  const buttonText = isActive ? "Dark" : "Light";
  const newCta = `Change to ${buttonText} theme`;

  btnEl.setAttribute("aria-label", newCta);
  symbolEl.innerHTML = symbol;
}

/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const lightThemeButton = document.querySelector("[data-theme-light]");
const darkThemeButton = document.querySelector("[data-theme-dark]");

/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString();

/**
 * 3. Update the theme setting and button symbol according to current settings
 */
updateButton({
  btnEl: lightThemeButton,
  isActive: currentThemeSetting === "light",
});
updateButton({
  btnEl: darkThemeButton,
  isActive: currentThemeSetting === "dark",
});
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
 * 4. Add event listeners to toggle the theme for each button
 */
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
