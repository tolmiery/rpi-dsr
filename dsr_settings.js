// Apply local settings (theme and text size) on page load
function applySavedSettings() {
  // Apply theme settings
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.add(theme);

    // Update the theme dropdown to reflect the saved theme
    const themeSelect = document.getElementById('theme');
    themeSelect.value = theme;  // Set the value of the select dropdown
  }

  // Apply text size settings
  const textSize = localStorage.getItem("textSize");
  if (textSize) {
    document.body.classList.add(textSize);

    // Update the text size dropdown to reflect the saved text size
    const textSizeSelect = document.getElementById('text-size');
    textSizeSelect.value = textSize;  // Set the value of the select dropdown
  }
}

// Toggle dark mode (for use on other pages)
function toggleDark() {
  const element = document.body;
  element.classList.toggle("dark-mode");

  // Save theme preference
  const currentTheme = element.classList.contains("dark-mode") ? "dark-mode" : "light-mode";
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

// Save text size preference
function saveTextSize() {
  const textSize = document.getElementById('text-size').value;
  const element = document.body;
  
  // Apply the selected text size class after clearing previous ones
  element.classList.remove("small-text", "standard-text", "large-text");
  element.classList.add(textSize);
  
  // Save text size preference in localStorage
  localStorage.setItem("textSize", textSize);
}

// Save theme preference
function saveTheme() {
  const theme = document.getElementById('theme').value;
  const element = document.body;

  // Apply the selected theme class
  element.classList.remove("light-mode", "dark-mode");
  element.classList.add(theme);

  // Save theme preference in localStorage
  localStorage.setItem("theme", theme);
}
