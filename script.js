// Get the button and the menu elements
const menuToggleButton = document.getElementById('menu-toggle-btn');
const navigationMenu = document.getElementById('navigation-menu');

// Add a click event listener to the button
menuToggleButton.addEventListener('click', function() {

  navigationMenu.classList.toggle('menu-visible');
  

  if (navigationMenu.classList.contains('menu-visible')) {
    menuToggleButton.textContent = '✕';
  } else {
    menuToggleButton.textContent = '☰';
  }
});
