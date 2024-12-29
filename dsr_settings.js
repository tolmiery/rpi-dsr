// Apply local settings (theme and text size) on page load
function applySavedSettings() {
  // Apply theme settings
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.add(theme);

    // Set the active class on the theme buttons
    const buttons = document.querySelectorAll('.theme-button');
    buttons.forEach(button => {
      button.classList.remove('active');
      if (button.id === theme) {
        button.classList.add('active');
      }
    });
  }

  // Apply text size settings
  const savedTextSize = localStorage.getItem('textSize');
  if (savedTextSize) {
    // Set the font size on the body and other elements
    document.body.style.fontSize = `${savedTextSize}px`;
    document.querySelectorAll('.text-element').forEach(function(el) {
      el.style.fontSize = `${savedTextSize}px`; // Apply font size to specific elements
    });

    // Update the text size output
    document.getElementById('text-size-output').textContent = `${savedTextSize}`;
    // Update the range input's value 
    const textSizeRange = document.getElementById('text-size-range');
    if (textSizeRange) {
      textSizeRange.value = savedTextSize; 
    }
  }
}

// Save text size preference
function saveTextSize() {
  const textSize = document.getElementById('text-size-range').value;
  
  // Update the displayed text size output
  document.getElementById('text-size-output').textContent = `${textSize}`;
  
  // Apply the text size to the body and specific elements
  document.body.style.fontSize = `${textSize}px`;
  document.querySelectorAll('.text-element').forEach(function(el) {
    el.style.fontSize = `${textSize}px`; // Apply font size to specific elements
  });
  
  // Save text size in localStorage
  localStorage.setItem('textSize', textSize);
}

// Save theme preference from buttons
function saveTheme(theme) {
  const element = document.body;

  // Remove any existing theme classes
  element.classList.remove("light-mode", "dark-mode", "cream");

  // Apply the selected theme class
  element.classList.add(theme);

  // Save theme preference in localStorage
  localStorage.setItem("theme", theme);
}

// Set theme when a button is clicked
function setTheme(theme) {
  // Save the selected theme and update UI
  saveTheme(theme);

  // Update the active state of the buttons
  const buttons = document.querySelectorAll('.theme-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  document.getElementById(theme).classList.add('active');
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

// Call on page load
window.onload = function() {
  applySavedSettings();

  const textSizeRange = document.getElementById('text-size-range');
  if (textSizeRange) {
    textSizeRange.addEventListener('input', saveTextSize); 
  }

  // Add event listeners for theme buttons
  const themeButtons = document.querySelectorAll('.theme-button');
  themeButtons.forEach(button => {
    button.addEventListener('click', function() {
      setTheme(button.id);
    });
  });
};
