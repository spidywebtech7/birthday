window.onload = () => {
    // Select all elements that need to be animated on load
    const elementsToAnimate = document.querySelectorAll('.animate-element');
    
    // Add the 'animate' class which triggers the CSS keyframes
    elementsToAnimate.forEach(el => {
        el.classList.add('animate');
    });

    // Optional: play the video explicitly just in case autoplay is blocked by some browsers
    const video = document.getElementById('bg-video');
    if (video) {
        video.play().catch(error => {
            console.log("Video autoplay was prevented by browser policy:", error);
        });
    }
};
