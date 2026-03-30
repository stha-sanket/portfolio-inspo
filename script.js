document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Section Reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal animation to elements
    const elementsToReveal = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.about-image-wrapper'),
        ...document.querySelectorAll('.music-card'),
        ...document.querySelectorAll('.contact-card')
    ];

    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        sectionObserver.observe(el);
    });

    // Custom Scroll Logic for the reveal class
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleTag);

    // Form submission handling
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('.btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#4caf50';
                btn.style.color = '#fff';
                bookingForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Play button interaction (Visual only)
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.textContent;
            if (icon === '▶') {
                this.textContent = '⏸';
            } else {
                this.textContent = '▶';
            }
        });
    });
});
