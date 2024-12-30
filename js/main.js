import { initNavbar } from './components/navbar.js';
import { initParticles } from './components/particles.js';

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Initialize components
initNavbar();
initParticles();

// Typing animation
function setupTypingAnimation() {
    const text = document.querySelector('.typing-text');
    if (!text) return;

    const phrases = [
        'Backend Developer 💻',
        'Photography Enthusiast 📸',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            text.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

document.addEventListener('DOMContentLoaded', setupTypingAnimation);
async function getRandomFox() {
    try {
        const response = await fetch('https://randomfox.ca/floof/');
        const data = await response.json();
        document.getElementById('fox-image').src = data.image;
    } catch (error) {
        console.error('Uh-oh! The fox ran away:', error);
    }
}

getRandomFox();