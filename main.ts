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

console.log('🎀 Blended by Vish - Portfolio loaded successfully!');
console.log('💄 Built with Semantic HTML5, Modern CSS, and TypeScript');
