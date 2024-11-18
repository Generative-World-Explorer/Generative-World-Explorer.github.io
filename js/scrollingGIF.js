const track = document.querySelector('.gif-track');
const trackWidth = track.scrollWidth; // Get the full width of the original track
let posX = 0;
let speed = 1;  // Adjust the speed if necessary

// Clone the original track to create the illusion of an infinite loop
const clone = track.cloneNode(true);
track.parentElement.appendChild(clone);

function scrollTrack() {
  // Move both the original track and the cloned one
  posX -= speed;
  track.style.transform = `translateX(${posX}px)`;
  clone.style.transform = `translateX(${posX - trackWidth}px)`; // Shift the clone

  // When the original track has fully scrolled out of view, adjust posX without resetting
  if (posX <= -trackWidth) {
    // Instead of resetting to 0, we continue scrolling by shifting the posX forward
    posX += trackWidth;
  }

  requestAnimationFrame(scrollTrack); // Continue the animation
}

scrollTrack();
