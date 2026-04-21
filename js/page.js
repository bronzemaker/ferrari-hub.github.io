// Page switching and theme management

// Function to show a specific section and hide all others
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  
  // Show the selected section
  const selectedSection = document.getElementById(sectionId + '-section');
  if (selectedSection) {
    selectedSection.classList.remove('hidden');
  }
  
  // Close the mobile menu when a section is selected
  const navigationMenu = document.getElementById('navigation-menu');
  navigationMenu.classList.remove('menu-visible');
  
  const menuToggleButton = document.getElementById('menu-toggle-btn');
  menuToggleButton.textContent = '☰';
}

// Theme toggle function - swaps stylesheet and saves preference to local storage
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
