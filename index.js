// ===== JMGO Website Clone - Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initAnnouncementBar();
    initHeader();
    initHeroSlider();
    initProductCarousel();
    initExpertCarousel();
    initUGCCarousel();
    initMaskZoom();
    initScrollReveal();
    initScrollTop();
    initTechSlider();
    initNewsletterForm();
});

// ===== Announcement Bar =====
function initAnnouncementBar() {
    const bar = document.getElementById('announcement-bar');
    const closeBtn = document.getElementById('announce-close');
    const prevBtn = document.getElementById('announce-prev');
    const nextBtn = document.getElementById('announce-next');
    const content = document.getElementById('announce-content');

    const announcements = [
        'Back To School Sale: <span class="announce-highlight">Up To $1430 OFF</span> + <span class="announce-highlight">Free Gifts</span>',
        'Bundle Offer - Get <span class="announce-highlight">Free Accessory</span>',
        'Back to School Sale: <span class="announce-highlight">N3 Ultimate</span> — Save $650'
    ];

    let currentAnnounce = 0;
    let announceInterval;

    function showAnnouncement(index) {
        const textEl = content.querySelector('.announce-text');
        textEl.style.opacity = '0';
        textEl.style.transform = 'translateY(-8px)';

        setTimeout(() => {
            textEl.innerHTML = announcements[index];
            textEl.style.opacity = '1';
            textEl.style.transform = 'translateY(0)';
        }, 250);
    }

    function nextAnnouncement() {
        currentAnnounce = (currentAnnounce + 1) % announcements.length;
        showAnnouncement(currentAnnounce);
    }

    function prevAnnouncement() {
        currentAnnounce = (currentAnnounce - 1 + announcements.length) % announcements.length;
        showAnnouncement(currentAnnounce);
    }

    function startAutoRotate() {
        announceInterval = setInterval(nextAnnouncement, 5000);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            bar.classList.add('hidden');
            clearInterval(announceInterval);
        });
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
        clearInterval(announceInterval);
        nextAnnouncement();
        startAutoRotate();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        clearInterval(announceInterval);
        prevAnnouncement();
        startAutoRotate();
    });

    // Add transition styles to announce text
    const textEl = content?.querySelector('.announce-text');
    if (textEl) {
        textEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    }

    startAutoRotate();
}

// ===== Header Scroll Effect =====
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');

    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'white';
            nav.style.flexDirection = 'column';
            nav.style.padding = '16px';
            nav.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
            nav.style.borderRadius = '0 0 12px 12px';
            nav.style.zIndex = '100';
        });
    }
}

// ===== Hero Slider =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.dataset.slide);
            goToSlide(slideIndex);
            resetAutoSlide();
        });
    });

    startAutoSlide();

    // Touch support for hero slider
    const slider = document.getElementById('hero-slider');
    let touchStartX = 0;
    let touchEndX = 0;

    if (slider) {
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
                resetAutoSlide();
            }
        }, { passive: true });
    }
}

// ===== Product Carousel =====
function initProductCarousel() {
    const track = document.querySelector('.products-track');
    const prevBtn = document.getElementById('products-prev');
    const nextBtn = document.getElementById('products-next');
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cards = track.querySelectorAll('.product-card');

    function updateCarousel() {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 20 : 300;
        const maxIndex = Math.max(0, cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth));
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 20 : 300;
        const maxIndex = Math.max(0, cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth));
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 20 : 300;
        const maxIndex = Math.max(0, cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth));
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
}

// ===== Expert Carousel =====
function initExpertCarousel() {
    const track = document.getElementById('experts-track');
    const prevBtn = document.getElementById('experts-prev');
    const nextBtn = document.getElementById('experts-next');
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cards = track.querySelectorAll('.expert-slide-card');

    function updateCarousel() {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 40 : 380;
        const visibleCount = Math.max(1, Math.floor(track.parentElement.offsetWidth / cardWidth));
        const maxIndex = Math.max(0, cards.length - visibleCount);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 40 : 380;
        const visibleCount = Math.max(1, Math.floor(track.parentElement.offsetWidth / cardWidth));
        const maxIndex = Math.max(0, cards.length - visibleCount);
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 40 : 380;
        const visibleCount = Math.max(1, Math.floor(track.parentElement.offsetWidth / cardWidth));
        const maxIndex = Math.max(0, cards.length - visibleCount);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
}

// ===== Tech 3D Stacking Deck =====
function initTechSlider() {
    const section = document.getElementById('tech-section');
    const dataItems = document.querySelectorAll('.tech-data-item');
    const cards = document.querySelectorAll('.tech-stack-card');
    const dots = document.querySelectorAll('.tech-dot-btn');
    if (!section || cards.length === 0) return;

    let currentIndex = 0;

    function setSlide(index) {
        currentIndex = (index + cards.length) % cards.length;

        // Update data text on left
        dataItems.forEach((item, i) => {
            if (i === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update 3D card positions
        cards.forEach((card, i) => {
            if (i < currentIndex) {
                // Card has slid up out of view
                card.setAttribute('data-pos', '-1');
            } else {
                // Card in stack: pos 0 is active front, 1 is next, 2 is behind, etc.
                const pos = i - currentIndex;
                card.setAttribute('data-pos', pos.toString());
            }
        });
    }

    // Initialize initial stacking state
    setSlide(0);

    // Click on cards
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            setSlide(i);
        });
    });

    // Click on dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            setSlide(i);
        });
    });

    // Scroll-driven calculation
    function handleScroll() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.6) {
            const totalScrollable = rect.height - windowHeight;
            const currentScroll = -rect.top;
            const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

            // Map progress across 4 slides: [0, 0.33, 0.66, 1.0]
            const targetSlide = Math.min(cards.length - 1, Math.floor(progress * cards.length));
            if (targetSlide !== currentIndex) {
                setSlide(targetSlide);
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ===== Scroll Reveal =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.products-section, .scenario-section, .finder-section, .confidence-section, ' +
        '.tech-section, .about-section, .press-section, .experts-section, .ugc-section, ' +
        '.newsletter-section, .product-card, .scenario-card, .confidence-card, .press-card, ' +
        '.ugc-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // Staggered reveal for grid items
    const gridSections = document.querySelectorAll('.confidence-grid, .press-grid, .scenario-grid');
    gridSections.forEach(section => {
        const children = section.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// ===== Scroll to Top =====
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Newsletter Form =====
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            const consent = document.getElementById('newsletter-consent-check').checked;

            if (!consent) {
                alert('Please consent to the Terms of Use and Privacy Policy.');
                return;
            }

            // Simulate subscription
            const submitBtn = form.querySelector('.newsletter-submit');
            submitBtn.innerHTML = '✓';
            submitBtn.style.background = '#27ae60';

            setTimeout(() => {
                submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        });
    }
}

// ===== Smooth hover parallax on product cards =====
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (y - 0.5) * -8;
        const rotateY = (x - 0.5) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== Counter animation for hero stats =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + '+';
    }, 16);
}

// Animate hero stat on page load
const heroStat = document.querySelector('.hero-stat');
if (heroStat && heroStat.textContent.includes('5,000')) {
    heroStat.textContent = '0+';
    setTimeout(() => animateCounter(heroStat, 5000), 500);
}

// ===== Mask Zoom on Scroll (JMGO Video Logo Effect) =====
function initMaskZoom() {
    const maskSection = document.getElementById('jmgo-mask');
    const overlay = document.getElementById('mask-overlay');
    const content = document.getElementById('mask-content');
    const video = maskSection?.querySelector('video');
    if (!maskSection || !overlay) return;

    function handleScroll() {
        const rect = maskSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if section is in view
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            // Calculate progress (0 when entering bottom of screen, 1 when scrolled through)
            const totalScroll = rect.height - windowHeight;
            const currentScroll = -rect.top;
            const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

            // Zoom scale from 100% to 350%
            const scale = 100 + (progress * 250);
            // Opacity fades out towards the end of scroll
            const opacity = progress > 0.6 ? Math.max(0, 1 - ((progress - 0.6) / 0.4)) : 1;

            overlay.style.backgroundSize = `${scale}%`;
            overlay.style.opacity = opacity;

            if (progress > 0.5) {
                content?.classList.add('visible');
            } else {
                content?.classList.remove('visible');
            }

            if (video && video.paused) {
                video.play().catch(() => {});
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// ===== UGC Draggable Scroll =====
function initUGCCarousel() {
    const slider = document.querySelector('.ugc-carousel-wrapper');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
}


