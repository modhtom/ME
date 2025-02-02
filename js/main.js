import { initNavbar } from './components/navbar.js';

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Initialize components
initNavbar();

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 3000);
});

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
        if (data.image != "https://randomfox.ca/images/16.jpg")
            document.getElementById('fox-image').src = data.image;
        else
            getRandomFox();
    } catch (error) {
        console.error('Uh-oh! The fox ran away:', error);
    }
}

getRandomFox();