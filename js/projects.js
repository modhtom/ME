document.addEventListener('DOMContentLoaded', () => {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Mouse move effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Handle demo links
        const demoLink = card.querySelector('.live-demo');
        if (demoLink) {
            demoLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Add your demo link logic here
                alert('Demo coming soon! 🚧');
            });
        }
    });

    // Add scroll reveal animation
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        },
        { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    cards.forEach(card => observer.observe(card));

    // Random meme facts on hover
    const memeFacts = [
        "Fun fact: This project was fueled by approximately 42 cups of coffee ☕",
        "Warning: Code may contain traces of midnight debugging 🌙",
        "60% of the time, it works every time! 😎",
        "No bugs were harmed in the making of this project 🐛",
        "Legend says the first version is still running somewhere 🏃‍♂️"
    ];

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const fact = memeFacts[Math.floor(Math.random() * memeFacts.length)];
            const tooltip = document.createElement('div');
            tooltip.className = 'meme-tooltip';
            tooltip.textContent = fact;
            card.appendChild(tooltip);

            setTimeout(() => {
                tooltip.remove();
            }, 3000);
        });
    });
});