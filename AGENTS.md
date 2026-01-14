# AGENTS.md

This file provides guidelines for AI coding agents working on this Vite + TypeScript portfolio website.

## Project Overview

**Tech Stack:**
- Framework: Vite
- Language: TypeScript (strict mode)
- Styling: CSS with custom properties
- Package Manager: npm

**Purpose:** Personal portfolio website for Blended by Vish showcasing makeup artist services with interactive portfolio filtering, contact form, and mobile-responsive navigation.

## Commands

### Development
- `npm run dev` - Start development server (Vite)
- `npm run build` - TypeScript compile + production build
- `npm run preview` - Preview production build

### Type Checking
- `npx tsc` - Run TypeScript compiler only
- Type checking is integrated into `npm run build`

### Testing & Linting
**Note:** This project does not have testing or linting configured.
- No test command available
- No linting tools (ESLint, Prettier) configured
- Always run `npm run build` to verify TypeScript compilation before considering work complete

## Code Style Guidelines

### Naming Conventions

**Variables & Functions:**
- Use camelCase for all variables and functions
- Prefix functions with action verbs: `initPortfolioFilter()`, `showMessage()`, `validateForm()`
- Constants: camelCase (inconsistent in current code), prefer SCREAMING_SNAKE_CASE for truly global constants

**Types & Interfaces:**
- PascalCase: `ObserverOptions`, `HTMLElement`, `MouseEvent`
- Use explicit type annotations for all function parameters and return types

**CSS:**
- Class names: kebab-case (`.portfolio-item`, `.service-card`, `.nav-menu`)
- Custom properties: kebab-case with `--` prefix (`--color-primary`, `--font-heading`)
- Organize custom properties by category (colors, typography, spacing)

**Files:**
- TypeScript files: camelCase (`main.ts`)
- CSS files: kebab-case (`style.css`)
- Assets: kebab-case (`Before Bridal.webp`, `After Glam.jpeg`)

### Formatting

**Indentation:** 4 spaces (not tabs)

**Spacing:**
- Space after colons in type annotations: `: void`, `: string`
- Space after commas in parameters: `(targetId: string, index: number)`
- Space around operators: `deltaX > 50 && Math.abs(deltaY) < 50`
- No trailing whitespace

**Line Length:** No strict limit, but prefer readability over long lines

### TypeScript Conventions

**Type Annotations:**
- Always explicit: `const smoothScroll = (targetId: string): void => { }`
- Use union types when needed: `ReturnType<typeof setTimeout> | null`
- Optional chaining for potentially null values: `lightboxTitle?.textContent`

**Type Assertions & Guards:**
- Use type assertions with `as`: `const keyboardEvent = event as KeyboardEvent`
- Instance checks for runtime guards: `if (item instanceof HTMLElement) { }`
- Explicit element casting: `document.getElementById('navbar') as HTMLElement`

**Strict Mode Requirements (enforced by tsconfig.json):**
- Strict mode enabled
- No unused locals: `noUnusedLocals: true`
- No unused parameters: `noUnusedParameters: true`
- No fallthrough cases in switch: `noFallthroughCasesInSwitch: true`

## Code Patterns

### Documentation

**JSDoc Comments:**
```typescript
/**
 * Initialize Portfolio Filtering System
 * Handles category-based filtering with animations
 */
const initPortfolioFilter = (): void => { }
```

**Section Separators:**
```typescript
// ===================================
// SECTION NAME
// ===================================
```

### Error Handling

**Async Operations:**
```typescript
try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
        // Handle success
    } else {
        throw new Error(data.message || 'Operation failed');
    }
} catch (error) {
    console.error('Operation error:', error);
    // Handle error
} finally {
    // Cleanup
}
```

**Validation:**
```typescript
const validateForm = (): boolean => {
    // Early returns for validation
    if (!nameInput.value.trim()) {
        nameInput.setCustomValidity('Name is required');
        return false;
    }
    return true;
};
```

### Event Handlers & Cleanup

**Arrow Functions:**
```typescript
hamburger.addEventListener('click', (e: Event): void => { });
```

**Cleanup Pattern:**
```typescript
const cleanupFunctions: (() => void)[] = [];
cleanupFunctions.push(() => element.removeEventListener('click', handler));
window.addEventListener('beforeunload', () => cleanupFunctions.forEach(fn => fn()));
```

### Performance

- Use `requestAnimationFrame` for smooth DOM updates
- Debounce/throttle scroll and resize events
- CSS custom properties for performance-critical updates
- Lazy load images and use appropriate formats

## Best Practices

### Accessibility
- Always include ARIA attributes for interactive elements
- Keyboard navigation support for all interactive components
- Focus trap patterns for modals/lightboxes
- Set `aria-expanded`, `aria-current`, `aria-label` appropriately

### Error Handling
- Try-catch-finally for all async operations
- Graceful fallbacks for images (placeholders, gradients)
- User-friendly error messages (never expose stack traces)
- Console.error for debugging, but not user-facing

### Code Organization
- Section-based organization with clear headers
- Related functionality grouped together
- Cleanup functions at end of sections
- Global declarations at top for TypeScript augmentation

### CSS Organization
- Group related styles with section headers
- CSS custom properties defined at root level
- Mobile-first responsive design
- Use modern CSS features (grid, flexbox, custom properties)

## File Structure

```
/
├── index.html          # Main HTML file
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── src/
│   ├── main.ts        # Main TypeScript logic
│   └── style.css      # All styles
└── public/            # Static assets (images, etc.)
```

## Important Notes

1. **No Testing Framework:** When implementing features, manually test by running `npm run dev` and checking functionality. Do not attempt to write or run tests.

2. **No Linting:** Code consistency is maintained through TypeScript compiler settings. Run `npm run build` to catch type errors.

3. **Strict TypeScript:** All code must pass strict mode compilation. Fix all TypeScript errors before considering work complete.

4. **Accessibility First:** Always consider keyboard navigation, screen readers, and ARIA attributes for any interactive element.

5. **Performance Conscious:** Use appropriate patterns (debouncing, RAF, CSS properties) to maintain smooth performance.
