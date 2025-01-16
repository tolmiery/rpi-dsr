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
              document.documentElement.style.setProperty('--container-color', savedColors.containerColor);
              document.documentElement.style.setProperty('--button-color', savedColors.buttonColor);
              document.documentElement.style.setProperty('--bactive-color', savedColors.bactiveColor);
              document.documentElement.style.setProperty('--navbar-color', savedColors.navbarColor);
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
      const textSizeOutput = document.getElementById('text-size-output');
      if (textSizeOutput) {
          textSizeOutput.textContent = savedTextSize;
      }
      const textSizeRange = document.getElementById('text-size-range');
      if (textSizeRange) {
          textSizeRange.value = savedTextSize;
      }
  }
}


// Save text size preference
function saveTextSize() {
  const textSize = document.getElementById('text-size-range').value;
  document.getElementById('text-size-output').textContent = `${textSize}`;
  document.body.style.fontSize = `${textSize}px`;
  document.querySelectorAll('.text-element').forEach(function(el) {
    el.style.fontSize = `${textSize}px`; 
  });

  localStorage.setItem('textSize', textSize);
}

// Save theme preference from buttons
function saveTheme(theme) {
  const element = document.body;
  element.classList.remove("light-mode", "dark-mode", "cream", "custom-theme");
  element.classList.add(theme);
  localStorage.setItem("theme", theme);
}

// Set theme when a button is clicked
function setTheme(theme) {
  // Save the selected theme and update UI
  saveTheme(theme);
  // Check if the custom theme is selected
  if (theme === "custom-theme") {
  const savedColors = JSON.parse(localStorage.getItem('customThemeColors'));
  if (savedColors) {
    Object.keys(savedColors).forEach(key => {
      if (savedColors[key]) {
        document.documentElement.style.setProperty(`--${key.toLowerCase()}`, savedColors[key]);
      }
    });
  }
}

  // Update the active state of the buttons
  const buttons = document.querySelectorAll('.theme-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  document.getElementById(theme).classList.add('active');
}

// Update custom theme colors
function updateCustomTheme() {
  const colors = ['background', 'text', 'container', 'button', 'bactive', 'navbar'].reduce((acc, key) => {
    acc[`${key}Color`] = document.getElementById(`${key}-color-picker`).value;
    document.documentElement.style.setProperty(`--${key}-color`, acc[`${key}Color`]);
    return acc;
  }, {});

  localStorage.setItem('customThemeColors', JSON.stringify(colors));
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

  // Text size range input listener
  const textSizeRange = document.getElementById('text-size-range');
  if (textSizeRange) textSizeRange.addEventListener('input', saveTextSize);

  // Theme buttons event listener
  document.querySelectorAll('.theme-button').forEach(button => {
    button.addEventListener('click', () => setTheme(button.id));
  });

  // Custom theme color pickers event listeners
  ['background', 'text', 'container', 'button', 'bactive', 'navbar'].forEach(id => {
    const picker = document.getElementById(`${id}-color-picker`);
    if (picker) picker.addEventListener('input', updateCustomTheme);
  });
};
