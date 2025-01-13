// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: false, // Animation should only happen once for false for everytime
        easing: 'ease-in-out'
    });

    // Initialize Feather Icons
    feather.replace();

    // Parallax Effect
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // Scroll Reveal Animations for Elements with `.reveal-animation`
    const revealElements = document.querySelectorAll('.reveal-animation');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
});

    // Add fade-in effect on scroll
document.addEventListener('scroll', () => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
});


// Add scroll listener to apply effects
window.addEventListener('scroll', () => {
    const textSection = document.getElementById('textSection');
    const avatarSection = document.getElementById('avatarSection');
    const scrollPosition = window.scrollY;

    // Fade and move the text section upwards
    if (textSection) {
        textSection.style.transform = `translateY(-${scrollPosition * 0.2}px)`;
        textSection.style.opacity = `${1 - scrollPosition / 300}`;
    }

    // Fade and move the avatar section downwards
    if (avatarSection) {
        avatarSection.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        avatarSection.style.opacity = `${1 - scrollPosition / 300}`;
    }
});
// Optional: Add intersection observer for scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in-left', 'animate-slide-in-right', 'animate-slide-in-up', 'animate-fade-in');
        }
    });
}, { threshold: 0.3 });

// Observe elements
document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right, .animate-slide-in-up, .animate-fade-in')
    .forEach(el => observer.observe(el));
