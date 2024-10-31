document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.scroll-color-transition');
    
    elements.forEach(function(element) {
        // Set color to white and remove all background styles
        element.style.setProperty('color', 'white', 'important');  // Force text color to white
        element.style.setProperty('background', 'none', 'important');  // Ensure no background
        element.style.setProperty('background-clip', 'unset', 'important');  // Unset background clip
        element.style.setProperty('-webkit-background-clip', 'unset', 'important');  // Unset webkit background clip
        element.style.setProperty('text-shadow', 'none', 'important');  // Remove text shadow if applied
        console.log('Styles applied to element:', element, 'Current styles:', window.getComputedStyle(element));
    });
});
