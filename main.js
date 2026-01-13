/**
 * Blended by Vish - Portfolio Website
 * Main TypeScript file for interactive functionality
 */
// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
if (hamburger && navMenu) {
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Update aria-label for accessibility
        const isActive = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isActive.toString());
    });
    // Close menu when clicking on a nav link
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const target = event.target;
        const isClickInsideNav = navMenu?.contains(target);
        const isClickOnHamburger = hamburger?.contains(target);
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}
// ===================================
// SMOOTH SCROLLING
// ===================================
// Enhanced smooth scroll with offset for fixed navbar
const smoothScroll = (targetId) => {
    const targetElement = document.querySelector(targetId);
    if (!targetElement)
        return;
    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
};
// Add smooth scroll to all nav links
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId) {
            smoothScroll(targetId);
        }
    });
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once visible (remove if you want re-animation on scroll up)
            // fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach((element) => {
    fadeInObserver.observe(element);
});
// ===================================
// STICKY NAVBAR SHADOW ON SCROLL
// ===================================
const navbar = document.getElementById('navbar');
if (navbar) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        // Add shadow when scrolled
        if (currentScrollY > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(74, 59, 59, 0.15)';
        }
        else {
            navbar.style.boxShadow = '0 2px 4px rgba(74, 59, 59, 0.1)';
        }
        lastScrollY = currentScrollY;
    });
}
// ===================================
// PORTFOLIO ITEM INTERACTIONS
// ===================================
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach((item) => {
    const htmlItem = item;
    item.addEventListener('click', () => {
        // Placeholder for portfolio item click functionality
        // You can add lightbox functionality here later
        console.log('Portfolio item clicked');
        item.classList.toggle('expanded');
    });
    // Add keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View portfolio item');
    item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            item.click();
        }
    });
});
// ===================================
// LOADING ANIMATION (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    // Trigger initial fade-in for hero elements
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });
});
// ===================================
// SERVICE CARD ANIMATIONS
// ===================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card) => {
    const htmlCard = card;
    card.addEventListener('mouseenter', () => {
        // Optional: Add additional hover effects here
        htmlCard.style.transform = 'translateY(-12px)';
    });
    card.addEventListener('mouseleave', () => {
        htmlCard.style.transform = 'translateY(-8px)';
    });
});
// ===================================
// EASTER EGG: Konami Code
// ===================================
const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
];
let konamiIndex = 0;
document.addEventListener('keydown', (event) => {
    if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s ease';
            alert('🎀 You found the secret! Blended by Vish loves you! 💄');
            konamiIndex = 0;
        }
    }
    else {
        konamiIndex = 0;
    }
});
// ===================================
// UTILITIES
// ===================================
// Debounce function for performance
const debounce = (func, wait) => {
    let timeout = null;
    return (...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
// Throttle function for scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
// Add page visibility change handler
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden - Pausing animations');
    }
    else {
        console.log('Page visible - Resuming animations');
    }
});
// ===================================
// NEW FEATURES - UPGRADE FUNCTIONS
// ===================================
/**
 * Initialize Portfolio Lightbox
 * Handles full-screen modal with navigation and accessibility
 */
const initLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
    const lightboxNext = lightbox?.querySelector('.lightbox-next');
    const lightboxTitle = lightbox?.querySelector('.lightbox-title');
    const lightboxCategory = lightbox?.querySelector('.lightbox-category');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentIndex = 0;
    const openLightbox = (index) => {
        const item = portfolioItems[index];
        const title = item.getAttribute('data-title') || '';
        const category = item.getAttribute('data-category') || '';
        if (lightboxTitle)
            lightboxTitle.textContent = title;
        if (lightboxCategory)
            lightboxCategory.textContent = category;
        lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus management for accessibility
        lightboxClose?.focus();
    };
    const closeLightbox = () => {
        lightbox?.classList.remove('active');
        document.body.style.overflow = '';
    };
    const showNext = () => {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        openLightbox(currentIndex);
    };
    const showPrev = () => {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        openLightbox(currentIndex);
    };
    // Open lightbox on portfolio item click
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            currentIndex = index;
            openLightbox(currentIndex);
        });
        // Keyboard accessibility
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentIndex = index;
                openLightbox(currentIndex);
            }
        });
    });
    // Close button
    lightboxClose?.addEventListener('click', closeLightbox);
    // Navigation buttons
    lightboxNext?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });
    lightboxPrev?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });
    // Close on background click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('active'))
            return;
        if (e.key === 'Escape') {
            closeLightbox();
        }
        else if (e.key === 'ArrowRight') {
            showNext();
        }
        else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });
    console.log('✨ Lightbox initialized');
};
/**
 * Initialize Before & After Comparison Slider
 * Handles interactive drag to compare images
 */
const initComparisonSlider = () => {
    const comparisonItems = document.querySelectorAll('.comparison-item');
    comparisonItems.forEach((item) => {
        const handle = item.querySelector('.comparison-handle');
        const after = item.querySelector('.comparison-after');
        let isDragging = false;
        const updateSlider = (clientX) => {
            const rect = item.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percentage = (x / rect.width) * 100;
            if (handle)
                handle.style.left = `${percentage}%`;
            if (after)
                after.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };
        handle?.addEventListener('mousedown', () => {
            isDragging = true;
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging)
                return;
            updateSlider(e.clientX);
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        // Touch support
        handle?.addEventListener('touchstart', () => {
            isDragging = true;
        });
        document.addEventListener('touchmove', (e) => {
            if (!isDragging)
                return;
            updateSlider(e.touches[0].clientX);
        });
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
        // Click to jump to position
        item.addEventListener('click', (e) => {
            updateSlider(e.clientX);
        });
    });
    console.log('📊 Comparison slider initialized');
};
/**
 * Initialize Testimonials Carousel
 * Handles auto-scroll, manual navigation, and pause on hover
 */
const initTestimonialsCarousel = () => {
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.testimonial-dot');
    const items = document.querySelectorAll('.testimonial-item');
    if (!track || items.length === 0)
        return;
    let currentIndex = 0;
    let autoScrollInterval;
    const scrollDelay = 5000; // 5 seconds
    const scrollToItem = (index) => {
        currentIndex = index;
        const targetItem = items[index];
        if (targetItem && track) {
            // Scroll only the track, not the page
            const scrollLeft = targetItem.offsetLeft - (track.offsetWidth / 2) + (targetItem.offsetWidth / 2);
            track.scrollLeft = scrollLeft;
        }
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };
    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % items.length;
        scrollToItem(nextIndex);
    };
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(nextSlide, scrollDelay);
    };
    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };
    // Dot navigation
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index') || '0');
            scrollToItem(index);
            stopAutoScroll();
            startAutoScroll();
        });
    });
    // Pause on hover
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
    // Touch/drag support
    let isDown = false;
    let startX;
    let scrollLeft;
    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });
    track.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });
    track.addEventListener('mousemove', (e) => {
        if (!isDown)
            return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    });
    // Update active dot on scroll
    track.addEventListener('scroll', () => {
        const scrollCenter = track.scrollLeft + track.offsetWidth / 2;
        items.forEach((item, index) => {
            const htmlItem = item;
            const itemCenter = htmlItem.offsetLeft + htmlItem.offsetWidth / 2;
            if (Math.abs(scrollCenter - itemCenter) < htmlItem.offsetWidth / 2) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
                currentIndex = index;
            }
        });
    });
    // Start auto-scroll
    startAutoScroll();
    console.log('💬 Testimonials carousel initialized');
};
/**
 * Initialize FAQ Accordion
 * Handles expand/collapse with smooth animations
 */
const initFAQAccordion = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            const icon = question.querySelector('.faq-icon');
            // Close all other items (optional - remove if you want multiple open)
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    otherQuestion?.setAttribute('aria-expanded', 'false');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', (!isActive).toString());
            // Update icon text
            if (icon) {
                icon.textContent = item.classList.contains('active') ? '×' : '+';
            }
        });
        // Keyboard accessibility
        question?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
    console.log('❓ FAQ accordion initialized');
};
/**
 * Initialize all new features
 */
const initAllFeatures = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initLightbox();
            initComparisonSlider();
            initTestimonialsCarousel();
            initFAQAccordion();
        });
    }
    else {
        initLightbox();
        initComparisonSlider();
        initTestimonialsCarousel();
        initFAQAccordion();
    }
};
// Initialize all new features
initAllFeatures();
console.log('🎀 Blended by Vish - Portfolio loaded successfully!');
console.log('💄 Built with Semantic HTML5, Modern CSS, and TypeScript');
console.log('✨ All interactive features initialized!');
