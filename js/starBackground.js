function generateStars(elementId, numStars, color) {
    const element = document.getElementById(elementId);
    let boxShadowValue = '';

    for (let i = 0; i < numStars; i++) {
        const x = Math.floor(Math.random() * window.innerWidth);  // Random x position
        const y = Math.floor(Math.random() * window.innerHeight); // Random y position

        // Append each star's shadow position and color
        boxShadowValue += `${x}px ${y}px ${color}, `;
    }

    // Remove the trailing comma and space, then apply the box-shadow
    boxShadowValue = boxShadowValue.slice(0, -2);  // Trim the last comma and space
    element.style.boxShadow = boxShadowValue;
}

// Generate stars for each element with different parameters
generateStars('stars', 300, '#7209b7');  // 100 stars with color #7209b7
generateStars('stars2', 80, '#bbd0ff');  // 80 stars with color #bbd0ff
generateStars('stars3', 60, '#c49952');  // 60 stars with color #c49952
generateStars('stars4', 120, '#c8b6ff'); // 120 stars with color #c8b6ff
