document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('main-header');
    const h1 = document.getElementById('messenger');
    const subtext = document.getElementById('subtext');
    const projectCards = document.querySelectorAll('.project-card');
    let isScrolled = false;

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe project cards for animations
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Observe about section
    const aboutSection = document.querySelector('#about .about-content');
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    function stopScrambling() {
        // Clear any ongoing animations
        if (app.animationTimeout) {
            clearTimeout(app.animationTimeout);
        }
        if (app.fadeTimeout) {
            clearTimeout(app.fadeTimeout);
        }
        if (app.cycleTimeout) {
            clearTimeout(app.cycleTimeout);
        }
        app.isAnimating = false;
        h1.textContent = 'Ricco Lim';
    }

    function startScrambling() {
        if (!app.isAnimating) {
            h1.textContent = '\u00A0'; // Non-breaking space to maintain height
            app.init();
        }
    }

    // Smooth scroll handling to prevent flickering
    let ticking = false;
    let scrollTimeout;
    const SCROLL_THRESHOLD = 60;
    
    function updateHeader() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > SCROLL_THRESHOLD) {
            if (!header.classList.contains('scrolled')) {
                // Apply scrolled state immediately to prevent flickering
                header.classList.add('scrolled');
                subtext.classList.add('hidden');
                if (!isScrolled) {
                    stopScrambling();
                    isScrolled = true;
                }
            }
        } else {
            if (header.classList.contains('scrolled')) {
                // Use slight delay when returning to normal state for smoother transition
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    header.classList.remove('scrolled');
                    subtext.classList.remove('hidden');
                    if (isScrolled) {
                        isScrolled = false;
                        startScrambling();
                    }
                }, 50);
            }
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced scrambling effect
    const app = {
        animationTimeout: null,
        fadeTimeout: null,
        cycleTimeout: null,
        isAnimating: false
    };

    app.init = () => {
        const messenger = document.getElementById('messenger');
        const codeletters = "⚡☉◈◎⧫⬢⬡◆◇";
        const messages = ['Ricco Lim'];
        let messageIndex = 0;
        let currentLength = 0;
        let fadeBuffer = false;

        app.isAnimating = true;

        function generateRandomString(length) {
            let randomText = '';
            while (randomText.length < length) {
                randomText += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
            }
            return randomText;
        }

        function animateIn() {
            if (isScrolled || !app.isAnimating) return;
            
            if (currentLength < messages[messageIndex].length) {
                currentLength += Math.random() > 0.5 ? 2 : 1;
                if (currentLength > messages[messageIndex].length) {
                    currentLength = messages[messageIndex].length;
                }
                
                let message = generateRandomString(currentLength);
                messenger.innerHTML = message;
                app.animationTimeout = setTimeout(animateIn, 40 + Math.random() * 30);
            } else {
                app.animationTimeout = setTimeout(animateFadeBuffer, 20);
            }
        }

        function animateFadeBuffer() {
            if (isScrolled || !app.isAnimating) return;
            
            if (!fadeBuffer) {
                fadeBuffer = [];
                for (let i = 0; i < messages[messageIndex].length; i++) {
                    fadeBuffer.push({ 
                        c: (Math.floor(Math.random() * 15)) + 1, 
                        l: messages[messageIndex].charAt(i) 
                    });
                }
            }

            let doCycles = false;
            let message = '';

            for (let i = 0; i < fadeBuffer.length; i++) {
                let fader = fadeBuffer[i];
                if (fader.c > 0) {
                    doCycles = true;
                    fader.c--;
                    message += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
                } else {
                    message += fader.l;
                }
            }

            messenger.innerHTML = message;

            if (doCycles) {
                app.fadeTimeout = setTimeout(animateFadeBuffer, 60 + Math.random() * 40);
            } else {
                app.cycleTimeout = setTimeout(cycleText, 3000);
            }
        }

        function cycleText() {
            if (isScrolled || !app.isAnimating) return;
            
            messageIndex = (messageIndex + 1) % messages.length;
            currentLength = 0;
            fadeBuffer = false;
            messenger.innerHTML = '\u00A0'; // Maintain space

            app.cycleTimeout = setTimeout(animateIn, 300);
        }

        animateIn();
    };



    // Initialize typing animation
    app.init();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger animations for visible elements
        const elementsToAnimate = document.querySelectorAll('.about-content, .project-card');
        elementsToAnimate.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in-up');
            }, index * 100);
        });
    });
});
