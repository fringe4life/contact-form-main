# Frontend Mentor - Contact Form Solution

This is a solution to the [Contact form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/contact-form--G-hYlqKJj). A fully accessible, responsive contact form with comprehensive validation and modern CSS techniques.

![Design preview for the Contact form coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Features](#features)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Design System](#design-system)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- ✅ Complete the form and see a success dialog message upon successful submission
- ✅ Receive form validation messages if:
  - A required field has been missed
  - The email address is not formatted correctly
  - No query type is selected
  - Consent checkbox is not checked
- ✅ Complete the form only using their keyboard
- ✅ Have inputs, error messages, and the success message announced on their screen reader
- ✅ View the optimal layout for the interface depending on their device's screen size
- ✅ See hover and focus states for all interactive elements on the page

### Features

#### 🎨 **Design System**
- **6 Colors**: HSL-based color variables with semantic naming
- **7 Spacing Values**: Consistent spacing scale in rem units
- **4 Typography Classes**: Utility classes for consistent font usage
- **Responsive Breakpoints**: Mobile (375px), Tablet (768px), Desktop (1440px)

#### ♿ **Accessibility**
- **Semantic HTML**: Proper use of `<dialog>`, `<fieldset>`, `<legend>`
- **ARIA Attributes**: Comprehensive labeling and descriptions
- **Keyboard Navigation**: Full keyboard support with focus management
- **Screen Reader Support**: Proper announcements and landmarks
- **Focus Management**: Dialog focus trapping and return focus
- **High Contrast**: Accessible color combinations

#### 📱 **Responsive Design**
- **Mobile-First**: Progressive enhancement approach
- **CSS Grid**: Modern layout system with utility classes
- **Flexible Typography**: Responsive font sizing
- **Touch-Friendly**: Appropriate touch targets

#### 🔧 **Form Validation**
- **Real-time Validation**: Instant feedback on field blur
- **Custom Error Messages**: Contextual validation messages
- **HTML5 Validation**: Native browser validation with custom styling
- **`:user-invalid` Pseudo-class**: Modern validation styling (90% browser support)

#### 🎭 **Interactive States**
- **Hover Effects**: Subtle visual feedback
- **Focus States**: Clear focus indicators with pseudo-elements
- **Loading States**: Submit button loading animation
- **Success Feedback**: Animated dialog with auto-close

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- **Semantic HTML5** markup with proper form structure
- **CSS Custom Properties** for design tokens and theming
- **CSS Grid** for modern layouts with utility classes
- **CSS Logical Properties** for better internationalization
- **CSS `@starting-style`** for modern animations
- **Vanilla JavaScript** with modern ES6+ features
- **Local Font Loading** with `@font-face` declarations
- **Mobile-first** responsive workflow
- **Progressive Enhancement** approach

### Design System

#### **Color Palette**
```css
--color-green-600: hsl(169, 82%, 27%); /* Primary brand color */
--color-green-700: hsl(169, 82%, 22%); /* Hover state */
--color-green-200: hsl(169, 82%, 82%); /* Success text */
--color-grey-900: hsl(169, 82%, 12%); /* Dark backgrounds */
--color-grey-400: hsl(169, 82%, 47%); /* Borders and dividers */
--color-white: hsl(0, 0%, 100%); /* Text and backgrounds */
```

#### **Typography System**
```css
.font-heading { /* 2.5rem/40px - Form title */
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 700;
}

.font-body-md-bold { /* 1.125rem/18px - Labels, buttons */
  font-size: 1.125rem;
  line-height: 1.556;
  font-weight: 700;
}

.font-body-md-regular { /* 1.125rem/18px - Inputs, radio text */
  font-size: 1.125rem;
  line-height: 1.556;
  font-weight: 400;
}

.font-body-sm { /* 0.875rem/14px - Error messages, dialog text */
  font-size: 0.875rem;
  line-height: 1.714;
  font-weight: 400;
}
```

#### **Spacing Scale**
```css
--spacing-100: 0.5rem;   /* 8px */
--spacing-200: 1rem;     /* 16px */
--spacing-300: 1.5rem;   /* 24px */
--spacing-400: 2rem;     /* 32px */
--spacing-500: 2.5rem;   /* 40px */
--spacing-600: 3rem;     /* 48px */
--spacing-700: 4rem;     /* 64px */
```

### What I learned

#### **Modern CSS Techniques**
- **CSS Logical Properties**: Using `inline-size`, `block-size`, `margin-inline` for better internationalization
- **CSS `@starting-style`**: Modern way to define initial animation states
- **CSS `aspect-ratio`**: Maintaining proportions without JavaScript
- **CSS `accent-color`**: Styling native form controls consistently
- **CSS `:user-invalid`**: Modern validation pseudo-class with excellent browser support

#### **Performance Optimization**
```css
/* Using pseudo-elements for box-shadows reduces painting */
.submit-btn::before {
  content: '';
  position: absolute;
  inset: -0.25rem;
  border-radius: inherit;
  background: var(--color-green-600);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: -1;
}

.submit-btn:focus::before {
  opacity: 1;
}
```

#### **Accessibility Best Practices**
```html
<!-- Semantic dialog with proper ARIA attributes -->
<dialog class="success-dialog" id="successDialog" 
        aria-labelledby="dialog-title" aria-describedby="dialog-message">
  <div class="dialog-content">
    <div class="dialog-header grid-row">
      <img src="./assets/images/icon-success-check.svg" alt="" class="dialog-icon">
      <h2 id="dialog-title" class="dialog-title font-body-md-bold">Message Sent!</h2>
      <button type="button" class="dialog-close" aria-label="Close dialog">
        <!-- Close icon -->
      </button>
    </div>
  </div>
</dialog>
```

#### **CSS Grid Utility Classes**
```css
/* Reusable grid patterns */
.grid-row {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: start;
}

.grid-row-center {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
}
```

#### **Form Validation Patterns**
```javascript
// Modern validation with custom error messages
const showFieldError = (field, errorElement, message) => {
  field.setCustomValidity(message);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
};

// Real-time validation with :user-invalid
const setupRealTimeValidation = () => {
  firstNameInput.addEventListener('blur', validateFirstName);
  // ... other fields
};
```

### Continued development

Areas I want to continue focusing on:

- **CSS Container Queries**: For more granular responsive design
- **CSS `@layer`**: For better CSS organization and specificity management
- **CSS `@property`**: For custom property animations
- **Web Components**: For reusable form components
- **Testing**: Unit tests for validation logic and accessibility testing
- **Internationalization**: Multi-language support with logical properties
- **Performance**: Bundle optimization and critical CSS extraction

### Useful resources

- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties) - Essential for internationalization and modern layouts
- [CSS `@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) - Modern animation technique for smooth transitions
- [CSS `:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid) - Modern validation pseudo-class with great browser support
- [Dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) - Semantic HTML for modal dialogs
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) - Modern layout system
- [Web.dev Accessibility](https://web.dev/learn/accessibility/) - Comprehensive accessibility guide
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - Design tokens and theming

## Author

- Frontend Mentor - [@fringe4life](https://www.frontendmentor.io/profile/fringe4life)
- GitHub - [@fringe4life](https://github.com/fringe4life)

---

**Note**: This project demonstrates modern web development practices with a focus on accessibility, performance, and maintainable code. The design system approach ensures consistency and scalability, while the comprehensive accessibility features make the form usable by everyone.
