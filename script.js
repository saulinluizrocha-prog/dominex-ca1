// ==========================================
// DOMINEX - LANDING PAGE ACTIONS & INTERACTIVITY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add scroll progress bar dynamically
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    // Scroll progress bar logic
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // Intersection Observer for scroll animations ([data-animate])
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    animatedElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 70; // Nav height offset
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Navigation bar shadow on scroll
    const nav = document.querySelector('.top-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            nav.style.padding = '8px 0';
        } else {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
            nav.style.padding = '12px 0';
        }
    });

    // Counter animation for stat percentages (92%, 85%, etc.)
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNum = parseInt(target.textContent);
                if (!isNaN(finalNum)) {
                    let current = 0;
                    const duration = 1200; // ms
                    const stepTime = 30; // ms
                    const totalSteps = duration / stepTime;
                    const increment = Math.ceil(finalNum / totalSteps);
                    
                    const timerInterval = setInterval(() => {
                        current += increment;
                        if (current >= finalNum) {
                            current = finalNum;
                            clearInterval(timerInterval);
                        }
                        target.textContent = current + '%';
                    }, stepTime);
                }
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => counterObserver.observe(el));

    // ==========================================
    // HIGH-CONVERTING COUNTDOWN TIMER (07:41)
    // ==========================================
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        let totalSeconds = (7 * 60) + 41; // 7 minutes and 41 seconds

        const countdown = setInterval(() => {
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            // Formatting with leading zero
            let formattedMinutes = String(minutes).padStart(2, '0');
            let formattedSeconds = String(seconds).padStart(2, '0');

            timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;

            if (totalSeconds <= 0) {
                clearInterval(countdown);
                timerElement.textContent = "00:00";
            } else {
                totalSeconds--;
            }
        }, 1000);
    }

    // ==========================================
    // SIMULATED AVAILABILITY BAR REDUCTION
    // ==========================================
    const stockFill = document.querySelector('.progress-bar-fill');
    if (stockFill) {
        // Start around 35%
        let currentStock = 35;
        stockFill.style.width = currentStock + '%';

        // Slowly decrease stock to simulate other orders coming in
        const stockDecrease = setInterval(() => {
            if (currentStock > 8) { // Don't drop below 8% to maintain realism
                const reduction = Math.floor(Math.random() * 2) + 1; // 1% or 2% drop
                currentStock -= reduction;
                stockFill.style.width = currentStock + '%';
            } else {
                clearInterval(stockDecrease);
            }
        }, 25000); // Trigger every 25 seconds
    }
});
