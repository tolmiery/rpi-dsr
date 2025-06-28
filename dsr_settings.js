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
        customHelper();
    }
  }

  // Apply text size settings
  const savedTextSize = localStorage.getItem('textSize');
  if (savedTextSize) {
      document.body.style.fontSize = `${savedTextSize}px`;
      // Update the text size output
      const textSizeOutput = document.getElementById('text-size-output');
      if (textSizeOutput) {
          textSizeOutput.textContent = savedTextSize;
      }
      const textSizeRange = document.getElementById('text-size-range');
      if (textSizeRange) {
          textSizeRange.value = savedTextSize;
      }
      const clampedSize = `clamp(8px, ${savedTextSize}px, 2.4vw)`;
      document.documentElement.style.setProperty('--navbar-font-size', clampedSize);
  }
}


// Save text size preference
function saveTextSize() {
  const textSize = document.getElementById('text-size-range').value;
  document.getElementById('text-size-output').textContent = `${textSize}`;

  const clampedSize = `clamp(8px, ${textSize}px, 2.4vw)`;
  document.documentElement.style.setProperty('--navbar-font-size', clampedSize);
  document.body.style.fontSize = `${textSize}px`;

  document.querySelectorAll('#navbar').forEach(function(el) {
    el.style.fontSize = clampedSize;
  });

  localStorage.setItem('textSize', textSize);
}


function customHelper() {
  let savedColors = JSON.parse(localStorage.getItem('customThemeColors'));
  // If no custom colors are saved, set default colors
  if (!savedColors) {
    savedColors = {
      backgroundColor: "#2A3F54",
      textColor: "#EDEDED",
      containerColor: "#1A252F",
      buttonColor: "#39AD7D",
      bactiveColor: "#555555",
      navbarColor: "#333333"
    };
    localStorage.setItem('customThemeColors', JSON.stringify(savedColors));
  }

  // Apply the theme colors and update pickers
  Object.entries(savedColors).forEach(([key, value]) => {
    const color = `--${key.replace("Color", "")}-color`;
    document.documentElement.style.setProperty(color, value);

    const pickerId = `${key.replace("Color", "")}-color-picker`;
    const picker = document.getElementById(pickerId);
    if (picker) picker.value = value;
  });
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
  customHelper();
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

// Setup sticky navbar functionality
let lastScrollY = window.scrollY;
function stickFunction() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return; // Exit if navbar doesn't exist

  const navbarOffset = navbar.offsetTop;
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY >= navbarOffset) {
    // Scrolling down
    navbar.classList.add("sticky");
  } else {
    // Scrolling up
    navbar.classList.remove("sticky");
  }

  lastScrollY = currentScrollY;
}
window.addEventListener("scroll", stickFunction);

function highlightActiveLink() {
  const links = document.querySelectorAll('#navbar a');
  const currentPage = location.pathname.split('/').pop();
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}


// Call on page load
document.addEventListener("DOMContentLoaded", function () {
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

  // Load header HTML and give enough time to get around FOUC
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    fetch("header.html")
      .then(response => {
        if (!response.ok) throw new Error("Failed to load header");
        return response.text();
      })
      .then(html => {
        headerPlaceholder.innerHTML = html;
        highlightActiveLink();
      })
  }

  const loadingScreen = document.getElementById("loading-screen");
  const pageContent = document.getElementById("page-content");

  if (loadingScreen && pageContent) {
    // Delay before showing content to get around FOUC
    setTimeout(() => {
      loadingScreen.style.display = "none";
      pageContent.style.display = "block";
      pageContent.style.opacity = "1";
    }, 100); 
  }
});
