// Apply local settings (theme and text size) on page load
function applySavedSettings() {
  // Apply theme settings
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.add(theme);
  }
  // Apply text size settings
  const textSize = localStorage.getItem("textSize");
  if (textSize) {
    document.body.classList.add(textSize);
  }
}

// Toggle dark mode
function toggleDark() {
  const element = document.body;
  element.classList.toggle("dark-mode");

  // Save theme preference
  const currentTheme = element.classList.contains("dark-mode") ? "dark-mode" : "";
  localStorage.setItem("theme", currentTheme);
}

// Sticky Navbar
window.onscroll = function() { stickFunction() };

const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;

function stickFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// Change text size
function setTextSize(size) {
  const element = document.body;
  
  // Apply the selected text size class after clearing previous
  element.classList.remove("small-text", "standard-text", "large-text");
  element.classList.add(`${size}-text`);
  
  // Save text size preference
  localStorage.setItem("textSize", `${size}-text`);
}
