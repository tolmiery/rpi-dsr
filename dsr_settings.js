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

      // Apply custom theme colors if custom theme is selected
      if (theme === "custom-theme") {
          const savedColors = JSON.parse(localStorage.getItem('customThemeColors'));
          if (savedColors) {
              document.documentElement.style.setProperty('--background-color', savedColors.backgroundColor);
              document.documentElement.style.setProperty('--text-color', savedColors.textColor);
              document.documentElement.style.setProperty('--container-background', savedColors.containerColor);
              document.documentElement.style.setProperty('--button-color', savedColors.buttonColor);
              document.documentElement.style.setProperty('--button-active-color', savedColors.buttonActiveColor);
              document.documentElement.style.setProperty('--navbar-color', savedColors.navbarColor);

              // Update color pickers with saved values
              document.getElementById('background-color-picker').value = savedColors.backgroundColor;
              document.getElementById('text-color-picker').value = savedColors.textColor;
              document.getElementById('container-background-picker').value = savedColors.containerColor;
              document.getElementById('button-color-picker').value = savedColors.buttonColor;
              document.getElementById('button-active-color-picker').value = savedColors.buttonActiveColor;
              document.getElementById('navbar-color-picker').value = savedColors.navbarColor;
          }
      }
  }

  // Apply text size settings
  const savedTextSize = localStorage.getItem('textSize');
  if (savedTextSize) {
      document.body.style.fontSize = `${savedTextSize}px`;
      document.querySelectorAll('.text-element').forEach(function(el) {
          el.style.fontSize = `${savedTextSize}px`;
      });

      // Update the text size output
      document.getElementById('text-size-output').textContent = `${savedTextSize}`;
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
  element.classList.remove("light-mode", "dark-mode", "cream", "custom-theme");

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

// Update custom theme colors
function updateCustomTheme() {
  const backgroundColor = document.getElementById('background-color-picker').value;
  const textColor = document.getElementById('text-color-picker').value;
  const containerColor = document.getElementById('container-background-picker').value;
  const buttonColor = document.getElementById('button-color-picker').value;
  const buttonActiveColor = document.getElementById('button-active-color-picker').value;
  const navbarColor = document.getElementById('navbar-color-picker').value; // Navbar background color picker

  // Update CSS variables for background, container, button, and navbar colors
  document.documentElement.style.setProperty('--background-color', backgroundColor);
  document.documentElement.style.setProperty('--text-color', textColor);  // Keep this if needed
  document.documentElement.style.setProperty('--container-background', containerColor);
  document.documentElement.style.setProperty('--button-color', buttonColor);
  document.documentElement.style.setProperty('--button-active-color', buttonActiveColor);
  document.documentElement.style.setProperty('--navbar-color', navbarColor); // Update navbar color

  // Save to localStorage
  localStorage.setItem('customThemeColors', JSON.stringify({
      backgroundColor,
      textColor,
      containerColor,
      buttonColor,
      buttonActiveColor,
      navbarColor
  }));
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

  // Add event listeners for custom theme color pickers
  const backgroundColorPicker = document.getElementById('background-color-picker');
  const textColorPicker = document.getElementById('text-color-picker');
  const containerColorPicker = document.getElementById('container-background-picker');
  const buttonColorPicker = document.getElementById('button-color-picker');
  const activeButtonColorPicker = document.getElementById('button-active-color-picker');
  const navbarColorPicker = document.getElementById('navbar-color-picker');

  if (backgroundColorPicker && textColorPicker && containerColorPicker && buttonColorPicker && activeButtonColorPicker && navbarColorPicker) {
    backgroundColorPicker.addEventListener('input', updateCustomTheme);
    textColorPicker.addEventListener('input', updateCustomTheme);
    containerColorPicker.addEventListener('input', updateCustomTheme);
    buttonColorPicker.addEventListener('input', updateCustomTheme);
    activeButtonColorPicker.addEventListener('input', updateCustomTheme);
    navbarColorPicker.addEventListener('input', updateCustomTheme);
  }
};
