
// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 2000);
});

// Navbar Active Links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typewriter Effect
function typeWriter() {
    const phrases = [
        'Backend Developer 💻',
        'Photography Enthusiast 📸'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typewriterElement = document.getElementById('typewriter');

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
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

document.addEventListener('DOMContentLoaded', typeWriter);

async function getRandomFox() {
    try {
        const response = await fetch('https://randomfox.ca/floof/');
        const data = await response.json();
        if (data.image != "https://randomfox.ca/images/16.jpg") {
            document.getElementById('fox-image').src = data.image;
        } else {
            getRandomFox();
        }
    } catch (error) {
        console.error('Uh-oh! The fox ran away:', error);
        document.getElementById('fox-image').src = "https://randomfox.ca/images/1.jpg";
    }
}

document.addEventListener('DOMContentLoaded', getRandomFox);