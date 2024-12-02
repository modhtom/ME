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

// Theme toggling
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 
                  (prefersDarkScheme.matches ? 'dark' : 'light');
setTheme(savedTheme);

// Typing animation
function setupTypingAnimation() {
    const text = document.querySelector('.typing-text');
    if (!text) return;

    const phrases = [
        'Backend Developer 💻',
        'Photography Enthusiast 📸',
        'Meme Lord 😎'
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