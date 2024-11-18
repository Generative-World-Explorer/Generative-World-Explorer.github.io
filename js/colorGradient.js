// Helper function to convert a hex color to an RGB object
function hexToRgb(hex) {
    let bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// Helper function to convert RGB to hex
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Function to interpolate between two RGB colors
function lerpColor(start, end, t) {
    return {
        r: Math.round(start.r + t * (end.r - start.r)),
        g: Math.round(start.g + t * (end.g - start.g)),
        b: Math.round(start.b + t * (end.b - start.b))
    };
}

// Function to generate a random hex color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Current and next gradient colors
let currentColors = [
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor()
];

let nextColors = [
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor()
];

// Function to update the gradient smoothly
function updateGradient() {
    const element = document.querySelector('.header-span-gradient');

    // Interpolation factor (0 = start, 1 = end)
    let t = 0;
    const duration = 5000; // 5 seconds for smooth transition
    const stepTime = 16; // Frame time for smooth interpolation (~60fps)

    function animate() {
        // Increment the interpolation factor
        t += stepTime / duration;

        // Interpolate each color between the current and next colors
        const colorStops = currentColors.map((start, index) => {
            const startRgb = hexToRgb(start);
            const endRgb = hexToRgb(nextColors[index]);
            const interpolated = lerpColor(startRgb, endRgb, t);
            return rgbToHex(interpolated.r, interpolated.g, interpolated.b);
        });

        // Apply the new gradient to the text
        element.style.backgroundImage = `linear-gradient(90deg, ${colorStops.join(', ')})`;

        // If the animation is still running, request the next frame
        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            // Once the transition is complete, start a new transition
            currentColors = [...nextColors];
            nextColors = [
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor(),
                getRandomColor()
            ];
            setTimeout(updateGradient, 1000); // Delay between transitions
        }
    }

    // Start the animation
    animate();
}

// Initial gradient setup
updateGradient();
