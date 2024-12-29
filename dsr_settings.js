// Apply local settings (theme and text size) on page load
function applySavedSettings() {
  // Apply theme settings
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.add(theme);

    // Update the theme dropdown to reflect the saved theme
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
      themeSelect.value = theme; 
    }
  }

  // Apply text size settings
  const textSize = localStorage.getItem("textSize");
  if (textSize) {
    document.body.classList.add(textSize);

    // Update the text size dropdown to reflect the saved text size
    const textSizeSelect = document.getElementById('text-size');
    if (textSizeSelect) {
      textSizeSelect.value = textSize;  
    }
  }
}

// Save text size preference
function saveTextSize() {
  const textSize = document.getElementById('text-size').value;
  const element = document.body;

  // Remove any existing text size classes
  element.classList.remove("small-text", "standard-text", "large-text");

  // Apply the selected text size class
  element.classList.add(textSize);

  // Save text size preference in localStorage
  localStorage.setItem("textSize", textSize);
}

// Save theme preference
function saveTheme() {
  const theme = document.getElementById('theme').value;
  const element = document.body;

  // Remove any existing theme classes
  element.classList.remove("light-mode", "dark-mode");

  // Apply the selected theme class
  element.classList.add(theme);

  // Save theme preference in localStorage
  localStorage.setItem("theme", theme);
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
