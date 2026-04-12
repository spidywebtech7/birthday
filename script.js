document.addEventListener("DOMContentLoaded", () => {
    
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');
    const giftBtn1 = document.getElementById('gift-btn-1');
    const giftBtn2 = document.getElementById('gift-btn-2');
    const localVideoContainer = document.getElementById('local-video-container');
    const localVideo = document.getElementById('local-video');
    const giftBtn3 = document.getElementById('gift-btn-3');
    
    const photoSlider = document.getElementById('photo-slider');
    const sliderImg = document.getElementById('slider-main-img');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    
    // Attempt to play background audio
    const bgAudio = document.getElementById('bg-audio');
    
    function startAudio() {
        if (bgAudio && bgAudio.paused) {
            bgAudio.play().then(() => {
                console.log("Audio started successfully");
                // Remove listeners once audio starts
                removeInteractionListeners();
            }).catch(e => console.log("Audio play failed:", e));
        }
    }

    function removeInteractionListeners() {
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
        document.removeEventListener('keydown', startAudio);
    }

    if (bgAudio) {
        // Initial attempt (might be blocked)
        bgAudio.play().catch(() => {
            // Listen for any interaction
            document.addEventListener('click', startAudio);
            document.addEventListener('touchstart', startAudio);
            document.addEventListener('keydown', startAudio);
        });
    }

    // 5.jpeg and 5.MP4 logic: there is no 5.jpeg, so we use an array of valid images
    const validPhotos = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
    let currentArrayIndex = 0;
    const totalPhotos = validPhotos.length;

    // 1. Transition from Space to Festive Room
    giftBtn1.addEventListener('click', () => {
        // Try to play audio if it hasn't started yet
        if (bgAudio && bgAudio.paused) {
            bgAudio.play().catch(e => console.log("Audio play failed on click:", e));
        }

        // Fade out intro
        introScreen.style.opacity = '0';
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            // Show main screen
            mainScreen.style.display = 'flex';
            
            // Allow CSS to catch up before fading in
            setTimeout(() => {
                mainScreen.style.opacity = '1';
                createConfetti();
            }, 50);

        }, 1500); // 1.5 seconds for fade out CSS transition to finish
    });

    // 2. Open Local Video
    giftBtn2.addEventListener('click', () => {
        // Hide the button so they don't click it multiple times
        giftBtn2.style.display = 'none';
        
        // Pause background music to prevent "double song"
        if (bgAudio) bgAudio.pause();
        
        // Show the local video container and play
        localVideoContainer.style.display = 'flex';
        localVideo.play();
    });

    // 3. Video Ended Event
    localVideo.addEventListener('ended', () => {
        giftBtn3.style.display = 'block';
        // Resume background music after video ends
        if (bgAudio) bgAudio.play().catch(e => console.log("Audio resume failed:", e));
    });

    let slideInterval;

    // 4. Open Photo Slider
    giftBtn3.addEventListener('click', () => {
        // Hide video container
        localVideoContainer.style.display = 'none';
        
        // Setup initial image
        currentArrayIndex = 0;
        sliderImg.src = `photots/${validPhotos[currentArrayIndex]}.jpeg`;
        
        // Show the slider container
        photoSlider.style.display = 'flex';

        // Auto change photos every 3 seconds
        if (!slideInterval) {
            slideInterval = setInterval(nextSlide, 3000);
        }
    });

    function nextSlide() {
        currentArrayIndex++;
        if (currentArrayIndex >= totalPhotos) {
            currentArrayIndex = 0;
        }
        sliderImg.src = `photots/${validPhotos[currentArrayIndex]}.jpeg`;
    }

    // Slider Controls
    sliderPrev.addEventListener('click', () => {
        currentArrayIndex--;
        if (currentArrayIndex < 0) {
            currentArrayIndex = totalPhotos - 1;
        }
        sliderImg.src = `photots/${validPhotos[currentArrayIndex]}.jpeg`;

        // Reset auto change interval on manual interaction
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    });

    sliderNext.addEventListener('click', () => {
        nextSlide();

        // Reset auto change interval on manual interaction
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    });

    // Confetti Generator
    function createConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#ffd700', '#c0c0c0', '#ffb6c1', '#add8e6', '#fff']; // Gold, Silver, Pink, Light Blue, White
        
        for (let i = 0; i < 100; i++) {
            let confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 3) + 's'; // Fall between 3-6s
            confetti.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(confetti);
        }
    }
});
