document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('demoVideo');
    const svgs = document.querySelectorAll('.svg-transparent');

    video.addEventListener('play', () => {
        svgs.forEach(svg => svg.classList.add('transparent'));
    });

    video.addEventListener('pause', () => {
        svgs.forEach(svg => svg.classList.remove('transparent'));
    });

    video.addEventListener('ended', () => {
        svgs.forEach(svg => svg.classList.remove('transparent'));
    });
});
