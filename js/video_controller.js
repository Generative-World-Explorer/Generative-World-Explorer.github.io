const video = document.getElementById('EQA');

// When the video ends, pause it and set it to the last frame
video.addEventListener('ended', function() {
  video.pause();  // Pause the video
  video.currentTime = video.duration;  // Set video to last frame
});