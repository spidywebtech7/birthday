document.addEventListener("DOMContentLoaded", () => {
    
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');

    // 10 Second Exact Transition
    setTimeout(() => {
        // Fade out intro
        introScreen.style.opacity = '0';
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            
            // Show main screen
            mainScreen.style.display = 'flex';
            
            // Short delay to allow display flex to apply before transitioning opacity
            setTimeout(() => {
                mainScreen.style.opacity = '1';
                createConfetti();
            }, 50);

        }, 1500); // 1.5 seconds for fade out CSS transition to finish
    }, 10000); // 10000 ms = exactly 10 seconds

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
