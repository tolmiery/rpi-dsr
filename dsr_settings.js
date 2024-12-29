// Apply local settings on page load
function applySavedTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.body.classList.add(theme);
    }
  }

  // Toggle dark mode
  function toggleDark() {
    const element = document.body;
    element.classList.toggle("dark-mode");
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
    element.classList.remove("small-text", "standard-text", "large-text");
    element.classList.add(`${size}-text`);
  }