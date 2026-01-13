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

// Cleanup IntersectionObserver on page unload
window.addEventListener('beforeunload', (): void => {
    fadeInObserver.disconnect();
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
    let lastFocusedElement: HTMLElement | null = null;

    // Get all focusable elements in lightbox
    const getFocusableElements = (): HTMLElement[] => {
        if (!lightbox) return [];
        const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        return Array.from(lightbox.querySelectorAll(focusableSelectors)) as HTMLElement[];
    };

    // Focus trap handler
    const trapFocus = (e: KeyboardEvent): void => {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift+Tab: If on first element, move to last
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab: If on last element, move to first
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    };

    const openLightbox = (index: number): void => {
        const item = portfolioItems[index] as HTMLElement;
        const title = item.getAttribute('data-title') || '';
        const category = item.getAttribute('data-category') || '';

        // Store last focused element before opening
        lastFocusedElement = document.activeElement as HTMLElement;

        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCategory) lightboxCategory.textContent = category;

        // Update lightbox image aria-label dynamically
        const lightboxImage = lightbox?.querySelector('.lightbox-placeholder') as HTMLElement;
        if (lightboxImage) {
            lightboxImage.setAttribute('aria-label',
                `${title}, ${category} portfolio work by Blended by Vish`
            );
        }

        lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus first focusable element
        lightboxClose?.focus();

        // Add focus trap listener
        document.addEventListener('keydown', trapFocus);
    };

    const closeLightbox = (): void => {
        lightbox?.classList.remove('active');
        document.body.style.overflow = '';

        // Remove focus trap listener
        document.removeEventListener('keydown', trapFocus);

        // Return focus to last focused element
        lastFocusedElement?.focus();
    };

    const showNext = (): void => {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        openLightbox(currentIndex);
    };

    const showPrev = (): void => {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        openLightbox(currentIndex);
    };

    // Keyboard navigation (separate from focus trap)
    const keyboardNavHandler = (e: KeyboardEvent): void => {
        if (!lightbox?.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
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

    // Use a separate listener for navigation to avoid conflicts with focus trap
    document.addEventListener('keydown', keyboardNavHandler);

    // Cleanup on page unload
    const cleanup = (): void => {
        document.removeEventListener('keydown', keyboardNavHandler);
    };

    window.addEventListener('beforeunload', cleanup);

    console.log('✨ Lightbox initialized with focus trap and cleanup');
};

/**
 * Initialize Before & After Comparison Slider
 * Handles interactive drag to compare images
 */
const initComparisonSlider = (): void => {
    const comparisonItems = document.querySelectorAll('.comparison-item');

    // Store cleanup functions for each item
    const cleanupFunctions: Array<() => void> = [];

    comparisonItems.forEach((item): void => {
        const handle = item.querySelector('.comparison-handle') as HTMLElement;
        const after = item.querySelector('.comparison-after') as HTMLElement;
        let isDragging = false;

        const updateSlider = (clientX: number): void => {
            const rect = item.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percentage = Math.round((x / rect.width) * 100);

            if (handle) {
                handle.style.left = `${percentage}%`;
                handle.setAttribute('aria-valuenow', percentage.toString());
                handle.setAttribute('aria-valuetext', `${percentage} percent`);
            }
            if (after) after.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        };

        // Mouse events
        const mouseDownHandler = (e: MouseEvent): void => {
            isDragging = true;
            e.preventDefault(); // Prevent text selection
        };

        const mouseMoveHandler = (e: MouseEvent): void => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        };

        const mouseUpHandler = (): void => {
            isDragging = false;
        };

        // Touch events
        const touchStartHandler = (): void => {
            isDragging = true;
        };

        const touchMoveHandler = (e: TouchEvent): void => {
            if (!isDragging) return;
            e.preventDefault(); // Critical: Prevent page scrolling while dragging
            updateSlider(e.touches[0].clientX);
        };

        const touchEndHandler = (): void => {
            isDragging = false;
        };

        const clickHandler = (e: MouseEvent): void => {
            updateSlider(e.clientX);
        };

        // Add event listeners
        handle?.addEventListener('mousedown', mouseDownHandler);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        handle?.addEventListener('touchstart', touchStartHandler, { passive: false });
        document.addEventListener('touchmove', touchMoveHandler, { passive: false });
        document.addEventListener('touchend', touchEndHandler);

        item.addEventListener('click', clickHandler);

        // Store cleanup function for this item
        cleanupFunctions.push((): void => {
            handle?.removeEventListener('mousedown', mouseDownHandler);
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);

            handle?.removeEventListener('touchstart', touchStartHandler);
            document.removeEventListener('touchmove', touchMoveHandler);
            document.removeEventListener('touchend', touchEndHandler);

            item.removeEventListener('click', clickHandler);
        });
    });

    // Global cleanup function
    const cleanup = (): void => {
        cleanupFunctions.forEach((fn) => fn());
    };

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);

    console.log('📊 Comparison slider initialized with cleanup');
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

    // Store event handlers for cleanup
    const handlers = {
        dotClick: [] as Array<(dot: HTMLElement) => void>,
        mousedown: null as ((e: MouseEvent) => void) | null,
        mouseleave: null as (() => void) | null,
        mouseup: null as (() => void) | null,
        mousemove: null as ((e: MouseEvent) => void) | null,
        scroll: null as (() => void) | null,
        mouseenterStop: null as (() => void) | null,
        mouseleaveStart: null as (() => void) | null,
    };

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

    // Cleanup function
    const cleanup = (): void => {
        stopAutoScroll();

        // Remove dot click handlers
        dots.forEach((dot): void => {
            const handler = handlers.dotClick.find(h => (h as any)(dot));
            if (handler) {
                dot.removeEventListener('click', handler as any);
            }
        });

        // Remove track event handlers
        if (handlers.mousedown) track.removeEventListener('mousedown', handlers.mousedown);
        if (handlers.mouseleave) track.removeEventListener('mouseleave', handlers.mouseleave);
        if (handlers.mouseup) track.removeEventListener('mouseup', handlers.mouseup);
        if (handlers.mousemove) track.removeEventListener('mousemove', handlers.mousemove);
        if (handlers.scroll) track.removeEventListener('scroll', handlers.scroll);
        if (handlers.mouseenterStop) track.removeEventListener('mouseenter', handlers.mouseenterStop);
        if (handlers.mouseleaveStart) track.removeEventListener('mouseleave', handlers.mouseleaveStart);
    };

    // Dot navigation
    dots.forEach((dot): void => {
        const handler = (): void => {
            const index = parseInt(dot.getAttribute('data-index') || '0');
            scrollToItem(index);
            stopAutoScroll();
            startAutoScroll();
        };
        handlers.dotClick.push(handler);
        dot.addEventListener('click', handler);
    });

    // Pause on hover
    handlers.mouseenterStop = stopAutoScroll;
    handlers.mouseleaveStart = startAutoScroll;
    track.addEventListener('mouseenter', handlers.mouseenterStop);
    track.addEventListener('mouseleave', handlers.mouseleaveStart);

    // Touch/drag support
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    handlers.mousedown = (e: MouseEvent): void => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    };

    handlers.mouseleave = (): void => {
        isDown = false;
        track.style.cursor = 'grab';
    };

    handlers.mouseup = (): void => {
        isDown = false;
        track.style.cursor = 'grab';
    };

    handlers.mousemove = (e: MouseEvent): void => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
    };

    track.addEventListener('mousedown', handlers.mousedown);
    track.addEventListener('mouseleave', handlers.mouseleave);
    track.addEventListener('mouseup', handlers.mouseup);
    track.addEventListener('mousemove', handlers.mousemove);

    // Update active dot on scroll
    handlers.scroll = (): void => {
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
    };

    track.addEventListener('scroll', handlers.scroll);

    // Start auto-scroll
    startAutoScroll();

    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);

    // Cleanup on visibility change (pause in background)
    document.addEventListener('visibilitychange', (): void => {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    });

    console.log('💬 Testimonials carousel initialized with cleanup');
};

/**
 * Handle window resize events
 * Recalculates carousel/slider positions on window resize
 */
const initResizeHandlers = (): void => {
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = (): void => {
        // Debounce resize events
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout((): void => {
            // 1. Recalculate testimonials carousel position
            const track = document.querySelector('.testimonial-track') as HTMLElement;
            const items = document.querySelectorAll('.testimonial-item');
            const dots = document.querySelectorAll('.testimonial-dot');

            if (track && items.length > 0) {
                // Find current center item
                const scrollCenter = track.scrollLeft + track.offsetWidth / 2;

                items.forEach((item, index): void => {
                    const htmlItem = item as HTMLElement;
                    const itemCenter = htmlItem.offsetLeft + htmlItem.offsetWidth / 2;

                    if (Math.abs(scrollCenter - itemCenter) < htmlItem.offsetWidth / 2) {
                        dots.forEach((dot, i): void => {
                            dot.classList.toggle('active', i === index);
                        });
                    }
                });
            }

            // 2. Reset comparison slider handles to center
            const comparisonItems = document.querySelectorAll('.comparison-item');
            comparisonItems.forEach((item): void => {
                const handle = item.querySelector('.comparison-handle') as HTMLElement;
                const after = item.querySelector('.comparison-after') as HTMLElement;

                if (handle && after) {
                    handle.style.left = '50%';
                    after.style.clipPath = 'inset(0 50% 0 0)';
                }
            });
        }, 250); // Debounce by 250ms
    };

    window.addEventListener('resize', handleResize);

    console.log('📐 Resize handlers initialized');
};

/**
 * Initialize FAQ Accessibility
 * Manages aria-expanded state for FAQ items
 */
const initFAQAccessibility = (): void => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item): void => {
        const summary = item.querySelector('.faq-question') as HTMLElement;

        const updateAriaExpanded = (): void => {
            const isOpen = item.hasAttribute('open');
            if (summary) {
                summary.setAttribute('aria-expanded', isOpen.toString());
            }
        };

        // Update on toggle
        item.addEventListener('toggle', updateAriaExpanded);

        // Initial state
        updateAriaExpanded();
    });

    console.log('📋 FAQ accessibility initialized');
};

/**
 * Initialize Navigation Accessibility
 * Manages aria-current for active navigation link based on scroll position
 */
const initNavigationAccessibility = (): void => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNavLink = (): void => {
        let currentSection = '';

        sections.forEach((section): void => {
            const htmlSection = section as HTMLElement;
            const sectionTop = htmlSection.offsetTop;
            const sectionHeight = htmlSection.offsetHeight;

            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach((link): void => {
            link.removeAttribute('aria-current');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    // Use throttle for scroll events (defined later in utilities)
    window.addEventListener('scroll', (): void => {
        // Simple throttle implementation
        if (!(window as any).navScrollThrottle) {
            (window as any).navScrollThrottle = setTimeout((): void => {
                updateActiveNavLink();
                (window as any).navScrollThrottle = null;
            }, 100);
        }
    });

    // Initial call
    updateActiveNavLink();

    console.log('🧭 Navigation accessibility initialized');
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
            initResizeHandlers();
            initFAQAccessibility();
            initNavigationAccessibility();
        });
    } else {
        initLightbox();
        initComparisonSlider();
        initTestimonialsCarousel();
        initResizeHandlers();
        initFAQAccessibility();
        initNavigationAccessibility();
    }
};

// Initialize all new features
initAllFeatures();

console.log('🎀 Blended by Vish - Portfolio loaded successfully!');
console.log('💄 Built with Semantic HTML5, Modern CSS, and TypeScript');
console.log('✨ All interactive features initialized!');
