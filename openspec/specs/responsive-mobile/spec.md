# Responsive & Mobile-First Architecture

## Purpose
Specify the responsive breakpoints, touch target sizing, mobile navigation drawer, and 3D camera/orbit scaling to guarantee zero horizontal overflow and flawless mobile performance.

## Requirements

### Requirement: Zero Horizontal Overflow
The portfolio application SHALL maintain zero horizontal overflow across all desktop, tablet, and mobile device viewports.

#### Scenario: User navigates on small viewport
- **WHEN** the browser window is resized to 390px (iPhone) or 360px (Android)
- **THEN** `document.documentElement.scrollWidth` strictly equals `window.innerWidth`, preventing all unintended horizontal panning.

### Requirement: Adaptive 3D Orbit Scaling
The Three.js scene SHALL scale its orbit radii and geometries on mobile devices to prevent assets from clipping outside the screen.

#### Scenario: Viewing 3D scene on mobile viewport
- **WHEN** `window.innerWidth <= 968px`
- **THEN** the tech badge orbit radius is scaled to 0.72 and geometry to 0.82, keeping all 3D assets within the visible screen area.

### Requirement: Slide-Down Mobile Drawer Navigation
Mobile visitors SHALL have access to a smooth slide-down navigation drawer toggled via the hamburger button.

#### Scenario: User opens mobile menu
- **WHEN** the user taps `#navToggle` on mobile
- **THEN** the frosted glass navigation drawer slides down with high-contrast links, and tapping any link closes the drawer and scrolls to the selected section.
