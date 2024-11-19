// document.addEventListener('DOMContentLoaded', function () {
//     const video = document.getElementById('demoVideo');
//     const svgs = document.querySelectorAll('.svg-transparent');

//     video.addEventListener('play', () => {
//         svgs.forEach(svg => svg.classList.add('transparent'));
//     });

//     video.addEventListener('pause', () => {
//         svgs.forEach(svg => svg.classList.remove('transparent'));
//     });

//     video.addEventListener('ended', () => {
//         svgs.forEach(svg => svg.classList.remove('transparent'));
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    const svgs = document.querySelectorAll('.svg-transparent');

    // Load YouTube Player API
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);

    // Initialize the YouTube player
    let player;
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('demoVideo', {
            events: {
                onStateChange: onPlayerStateChange
            }
        });
    };

    // Handle YouTube player state changes
    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            svgs.forEach(svg => svg.classList.add('transparent'));
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            svgs.forEach(svg => svg.classList.remove('transparent'));
        }
    }
});
