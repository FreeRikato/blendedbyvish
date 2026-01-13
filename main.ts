/**
 * Blended by Vish - Portfolio Website
 * Main TypeScript file for interactive functionality
 */

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const hamburger = document.getElementById('hamburger') as HTMLButtonElement | null;
const navMenu = document.getElementById('nav-menu') as HTMLUListElement | null;
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    // Toggle mobile menu
    hamburger.addEventListener('click', (): void => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Update aria-label for accessibility
        const isActive = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isActive.toString());
    });

    // Close menu when clicking on a nav link
    navLinks.forEach((link): void => {
        link.addEventListener('click', (): void => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event: MouseEvent): void => {
        const target = event.target as Node;
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
const smoothScroll = (targetId: string): void => {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const navbarHeight = (document.getElementById('navbar') as HTMLElement)?.offsetHeight || 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
};

// Add smooth scroll to all nav links
navLinks.forEach((link): void => {
    link.addEventListener('click', (event: Event): void => {
        event.preventDefault();
        const targetId = (link as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
            smoothScroll(targetId);
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ===================================

interface ObserverOptions {
    threshold: number;
    rootMargin: string;
}

const observerOptions: ObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries): void => {
    entries.forEach((entry): void => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Optional: Stop observing once visible (remove if you want re-animation on scroll up)
            // fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach((element): void => {
    fadeInObserver.observe(element);
});

// ===================================
// STICKY NAVBAR SHADOW ON SCROLL
// ===================================

const navbar = document.getElementById('navbar') as HTMLElement | null;

if (navbar) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', (): void => {
        const currentScrollY = window.scrollY;

        // Add shadow when scrolled
        if (currentScrollY > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(74, 59, 59, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(74, 59, 59, 0.1)';
        }

        lastScrollY = currentScrollY;
    });
}

// ===================================
// PORTFOLIO ITEM INTERACTIONS
// ===================================

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach((item): void => {
    const htmlItem = item as HTMLElement;

    item.addEventListener('click', (): void => {
        // Placeholder for portfolio item click functionality
        // You can add lightbox functionality here later
        console.log('Portfolio item clicked');
        item.classList.toggle('expanded');
    });

    // Add keyboard accessibility
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View portfolio item');

    item.addEventListener('keydown', (event: KeyboardEvent): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            (item as HTMLElement).click();
        }
    });
});

// ===================================
// LOADING ANIMATION (Optional)
// ===================================

window.addEventListener('load', (): void => {
    document.body.classList.add('loaded');

    // Trigger initial fade-in for hero elements
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((element, index): void => {
        setTimeout((): void => {
            element.classList.add('visible');
        }, index * 200);
    });
});

// ===================================
// SERVICE CARD ANIMATIONS
// ===================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card): void => {
    const htmlCard = card as HTMLElement;

    card.addEventListener('mouseenter', (): void => {
        // Optional: Add additional hover effects here
        htmlCard.style.transform = 'translateY(-12px)';
    });

    card.addEventListener('mouseleave', (): void => {
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

document.addEventListener('keydown', (event: KeyboardEvent): void => {
    if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s ease';
            alert('🎀 You found the secret! Blended by Vish loves you! 💄');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ===================================
// UTILITIES
// ===================================

// Debounce function for performance
const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>): void => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Throttle function for scroll events
const throttle = <T extends (...args: any[]) => void>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;

    return (...args: Parameters<T>): void => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Add page visibility change handler
document.addEventListener('visibilitychange', (): void => {
    if (document.hidden) {
        console.log('Page hidden - Pausing animations');
    } else {
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
const initLightbox = (): void => {
    const lightbox = document.getElementById('lightbox') as HTMLElement;
    const lightboxClose = lightbox?.querySelector('.lightbox-close') as HTMLButtonElement;
    const lightboxPrev = lightbox?.querySelector('.lightbox-prev') as HTMLButtonElement;
    const lightboxNext = lightbox?.querySelector('.lightbox-next') as HTMLButtonElement;
    const lightboxTitle = lightbox?.querySelector('.lightbox-title') as HTMLElement;
    const lightboxCategory = lightbox?.querySelector('.lightbox-category') as HTMLElement;

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let currentIndex = 0;

    const openLightbox = (index: number): void => {
        const item = portfolioItems[index] as HTMLElement;
        const title = item.getAttribute('data-title') || '';
        const category = item.getAttribute('data-category') || '';

        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCategory) lightboxCategory.textContent = category;

        lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        lightboxClose?.focus();
    };

    const closeLightbox = (): void => {
        lightbox?.classList.remove('active');
        document.body.style.overflow = '';
    };

    const showNext = (): void => {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        openLightbox(currentIndex);
    };

    const showPrev = (): void => {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        openLightbox(currentIndex);
    };

    // Open lightbox on portfolio item click
    portfolioItems.forEach((item, index): void => {
        item.addEventListener('click', (event: Event): void => {
            event.preventDefault();
            currentIndex = index;
            openLightbox(currentIndex);
        });

        // Keyboard accessibility
        item.addEventListener('keydown', (e: KeyboardEvent): void => {
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
    lightboxNext?.addEventListener('click', (e: Event): void => {
        e.stopPropagation();
        showNext();
    });

    lightboxPrev?.addEventListener('click', (e: Event): void => {
        e.stopPropagation();
        showPrev();
    });

    // Close on background click
    lightbox?.addEventListener('click', (e: Event): void => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e: KeyboardEvent): void => {
        if (!lightbox?.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });

    console.log('✨ Lightbox initialized');
};

/**
 * Initialize Before & After Comparison Slider
 * Handles interactive drag to compare images
 */
const initComparisonSlider = (): void => {
    const comparisonItems = document.querySelectorAll('.comparison-item');

    comparisonItems.forEach((item): void => {
        const handle = item.querySelector('.comparison-handle') as HTMLElement;
        const after = item.querySelector('.comparison-after') as HTMLElement;
        let isDragging = false;

        const updateSlider = (clientX: number): void => {
            const rect = item.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percentage = (x / rect.width) * 100;

            if (handle) handle.style.left = `${percentage}%`;
            if (after) after.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };

        handle?.addEventListener('mousedown', (): void => {
            isDragging = true;
        });

        document.addEventListener('mousemove', (e: MouseEvent): void => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        document.addEventListener('mouseup', (): void => {
            isDragging = false;
        });

        // Touch support
        handle?.addEventListener('touchstart', (): void => {
            isDragging = true;
        });

        document.addEventListener('touchmove', (e: TouchEvent): void => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        });

        document.addEventListener('touchend', (): void => {
            isDragging = false;
        });

        // Click to jump to position
        item.addEventListener('click', (e: MouseEvent): void => {
            updateSlider(e.clientX);
        });
    });

    console.log('📊 Comparison slider initialized');
};

/**
 * Initialize Testimonials Carousel
 * Handles auto-scroll, manual navigation, and pause on hover
 */
const initTestimonialsCarousel = (): void => {
    const track = document.querySelector('.testimonial-track') as HTMLElement;
    const dots = document.querySelectorAll('.testimonial-dot');
    const items = document.querySelectorAll('.testimonial-item');

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    let autoScrollInterval: ReturnType<typeof setInterval>;
    const scrollDelay = 5000; // 5 seconds

    const scrollToItem = (index: number): void => {
        currentIndex = index;
        const targetItem = items[index] as HTMLElement;

        if (targetItem && track) {
            // Scroll only the track, not the page
            const scrollLeft = targetItem.offsetLeft - (track.offsetWidth / 2) + (targetItem.offsetWidth / 2);
            track.scrollLeft = scrollLeft;
        }

        // Update dots
        dots.forEach((dot, i): void => {
            dot.classList.toggle('active', i === index);
        });
    };

    const nextSlide = (): void => {
        const nextIndex = (currentIndex + 1) % items.length;
        scrollToItem(nextIndex);
    };

    const startAutoScroll = (): void => {
        autoScrollInterval = setInterval(nextSlide, scrollDelay);
    };

    const stopAutoScroll = (): void => {
        clearInterval(autoScrollInterval);
    };

    // Dot navigation
    dots.forEach((dot): void => {
        dot.addEventListener('click', (): void => {
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
    let startX: number;
    let scrollLeft: number;

    track.addEventListener('mousedown', (e: MouseEvent): void => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', (): void => {
        isDown = false;
        track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', (): void => {
        isDown = false;
        track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', (e: MouseEvent): void => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    });

    // Update active dot on scroll
    track.addEventListener('scroll', (): void => {
        const scrollCenter = track.scrollLeft + track.offsetWidth / 2;

        items.forEach((item, index): void => {
            const htmlItem = item as HTMLElement;
            const itemCenter = htmlItem.offsetLeft + htmlItem.offsetWidth / 2;
            if (Math.abs(scrollCenter - itemCenter) < htmlItem.offsetWidth / 2) {
                dots.forEach((dot, i): void => {
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
const initFAQAccordion = (): void => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item): void => {
        const question = item.querySelector('.faq-question') as HTMLButtonElement;

        question?.addEventListener('click', (): void => {
            const isActive = item.classList.contains('active');
            const icon = question.querySelector('.faq-icon') as HTMLElement;

            // Close all other items (optional - remove if you want multiple open)
            faqItems.forEach((otherItem): void => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question') as HTMLButtonElement;
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
        question?.addEventListener('keydown', (e: KeyboardEvent): void => {
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
const initAllFeatures = (): void => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', (): void => {
            initLightbox();
            initComparisonSlider();
            initTestimonialsCarousel();
            initFAQAccordion();
        });
    } else {
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
