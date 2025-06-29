// Apply local settings (theme and text size) on page load
function applySavedSettings() {
  // Apply theme and text size settings if they exist
  const theme = localStorage.getItem("theme");
  if (theme) setTheme(theme);

  const savedTextSize = localStorage.getItem('textSize');
  if (savedTextSize) updateTextSize(savedTextSize);
}

// Update text size based on value and apply to relevant elements
function updateTextSize(textSize) {
  document.body.style.fontSize = `${textSize}px`;

  const textSizeOutput = document.getElementById('text-size-output');
  if (textSizeOutput) textSizeOutput.textContent = textSize;
  const textSizeRange = document.getElementById('text-size-range');
  if (textSizeRange) textSizeRange.value = textSize;

  const clampedSize = `clamp(8px, ${textSize}px, 2.35vw)`;
  document.documentElement.style.setProperty('--navbar-font-size', clampedSize);
}

// Save text size to local storage and apply it
function saveTextSize() {
  const textSizeRange = document.getElementById('text-size-range');
  const textSize = textSizeRange.value;
  updateTextSize(textSize);
  localStorage.setItem('textSize', textSize);
}

// Apply custom theme colors
function applyCustomThemeColors() {
  let savedColors = JSON.parse(localStorage.getItem('customThemeColors'));
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

  Object.entries(savedColors).forEach(([key, value]) => {
    const color = `--${key.replace("Color", "")}-color`;
    document.documentElement.style.setProperty(color, value);
    const pickerId = `${key.replace("Color", "")}-color-picker`;
    const picker = document.getElementById(pickerId);
    if (picker) picker.value = value;
  });
}

// Set theme when a button is clicked
function setTheme(theme) {
  document.body.classList.remove("light-mode", "dark-mode", "cream", "custom-theme");
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
  if (theme === "custom-theme") applyCustomThemeColors();
  // Update active button state
  const activeButton = document.getElementById(theme);
  const buttons = document.querySelectorAll('.theme-button');
  buttons.forEach(button => button.classList.remove('active'));
  if (activeButton) activeButton.classList.add('active');
}

// Update custom theme colors
function updateCustomTheme() {
  const colors = ['background', 'text', 'container', 'button', 'bactive', 'navbar'].reduce((acc, key) => {
    const colorPicker = document.getElementById(`${key}-color-picker`);
    if (colorPicker) {
      acc[`${key}Color`] = colorPicker.value;
      document.documentElement.style.setProperty(`--${key}-color`, acc[`${key}Color`]);
    }
    return acc;
  }, {});

  localStorage.setItem('customThemeColors', JSON.stringify(colors));
}

// Setup sticky navbar functionality
let lastScrollY = window.scrollY;
let scrollTimeout; 
function stickFunction() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  const navbarOffset = navbar.offsetHeight + navbar.offsetTop;
  const currentScrollY = window.scrollY;
  if (currentScrollY <= lastScrollY && currentScrollY >= navbarOffset) {
    navbar.classList.add("sticky");
  }
  if (currentScrollY <= navbarOffset) {
    navbar.classList.remove("sticky");
  }
  clearTimeout(scrollTimeout);
  // Start a timeout to hide the navbar after 3 seconds if user stopped scrolling
  if (currentScrollY >= navbarOffset) {
    console.log(navbarOffset, currentScrollY);
    scrollTimeout = setTimeout(() => {
      navbar.style.transform = "translateY(-100%)";
    }, 1000); 
  }
  // Show navbar again if scrolled, before the timeout triggers
  if (currentScrollY < lastScrollY || currentScrollY <= navbarOffset) {
    navbar.style.transition = "transform 0.3s ease-out"; 
    navbar.style.transform = "translateY(0)"; 
  }
  lastScrollY = currentScrollY;
}
window.addEventListener("scroll", stickFunction);


// Highlight active link in navbar based on current page
function highlightActiveLink() {
  const links = document.querySelectorAll('#navbar a');
  const currentPage = location.pathname.split('/').pop();
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });
}

// Call on page load
document.addEventListener("DOMContentLoaded", function () {
  applySavedSettings();

  // Text size input listener
  const textSizeRange = document.getElementById('text-size-range');
  if (textSizeRange) textSizeRange.addEventListener('input', saveTextSize);

  // Theme button event listeners
  document.querySelectorAll('.theme-button').forEach(button => {
    button.addEventListener('click', () => setTheme(button.id));
  });

  // Color picker event listeners
  ['background', 'text', 'container', 'button', 'bactive', 'navbar'].forEach(id => {
    const picker = document.getElementById(`${id}-color-picker`);
    if (picker) picker.addEventListener('input', updateCustomTheme);
  });

  // Load header HTML and apply active link highlighting
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
      });
  }

  // Delay before showing content to avoid FOUC
  const loadingScreen = document.getElementById("loading-screen");
  const pageContent = document.getElementById("page-content");

  if (loadingScreen && pageContent) {
    setTimeout(() => {
      loadingScreen.style.display = "none";
      pageContent.style.display = "block";
      pageContent.style.opacity = "1";
    }, 100);
  }
});
