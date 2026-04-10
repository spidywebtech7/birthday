document.addEventListener("DOMContentLoaded", () => {
    
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');
    const giftBtn1 = document.getElementById('gift-btn-1');
    const giftBtn2 = document.getElementById('gift-btn-2');
    const photoGallery = document.getElementById('photo-gallery');

    // 1. Transition from Space to Festive Room
    giftBtn1.addEventListener('click', () => {
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

    // 2. Open Gallery and Spawn 11 Images Dynamically
    giftBtn2.addEventListener('click', () => {
        // Hide the button so they don't click it multiple times
        giftBtn2.style.display = 'none';
        
        // Show the gallery container
        photoGallery.style.display = 'grid';
        
        // Ensure there are 11 photos to load (1.jpeg to 11.jpeg)
        for(let i = 1; i <= 11; i++) {
            let imgDiv = document.createElement('div');
            imgDiv.classList.add('gallery-item');
            
            // Set the background image to the photots folder
            imgDiv.style.backgroundImage = `url('photots/${i}.jpeg')`;
            
            // Staggered pop-in animation delay
            // Each image pops in 0.2s after the previous one
            let delay = (i * 0.2); 
            imgDiv.style.animation = `popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s forwards`;
            
            photoGallery.appendChild(imgDiv);
        }
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
