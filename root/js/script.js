// Get the button and the menu elements
const menuToggleButton = document.getElementById('menu-toggle-btn');
const navigationMenu = document.getElementById('navigation-menu');

// click event listener for nav button
menuToggleButton.addEventListener('click', function() {

  navigationMenu.classList.toggle('menu-visible');
  

  if (navigationMenu.classList.contains('menu-visible')) {
    menuToggleButton.textContent = '✕';
  } else {
    menuToggleButton.textContent = '☰';
  }
});
// added the theme toggle function to the script file, this will be called when the user clicks the theme toggle button in the header. It will swap the stylesheet and save the user's choice in local storage so it persists across sessions.
function toggleTheme() {
    const theme = document.getElementById('overide-link');
    let newHref = '';

    // Swap the stylesheet
    if (theme.disabled === true) {
        newHref = '/css/dos.css';
        document.getElementById('overide-link').disabled = false;
    } else {
        newHref = '/css/style.css';
        document.getElementById('overide-link').disabled = true;
    }

    
    
    // Save the choice permanently in the browser
    localStorage.setItem('selected-theme', newHref);
}