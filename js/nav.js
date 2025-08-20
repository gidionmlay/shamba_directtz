document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const menuToggle = document.getElementById('menuToggle');
    const mobileNavOffcanvas = document.getElementById('mobileNavOffcanvas');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenuBtn = document.getElementById('closeMenu');

    // Select all links within the mobile navigation for auto-closing
    const mobileNavLinks = document.querySelectorAll('.mobile-main-nav a, .mobile-icon-section a, .mobile-auth-section a');

    // Function to open the mobile menu
    const openMobileMenu = () => {
        mobileNavOffcanvas.classList.add('is-open');
        mobileMenuOverlay.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling body when menu is open
    };

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        mobileNavOffcanvas.classList.remove('is-open');
        mobileMenuOverlay.classList.remove('is-open');
        document.body.style.overflow = ''; // Restore body scrolling
    };

    // Event listener for hamburger icon click
    if (menuToggle) {
        menuToggle.addEventListener('click', openMobileMenu);
    }

    // Event listener for close button click inside menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // Event listener for overlay click (to close menu)
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Event listeners for mobile navigation links (auto-close on click)
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // --- IMPORTANT: Ensure existing JS functions are correctly initialized ---
    // If you have themeToggle or languageToggle in mobile menu with new IDs,
    // you might need to initialize them here for the mobile versions:
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            console.log("Dark mode toggled from mobile:", document.body.classList.contains('dark-mode'));
        });
    }

    const languageToggleMobile = document.getElementById('language-toggle-mobile');
    if (languageToggleMobile) {
        languageToggleMobile.addEventListener('click', () => {
            // Your language toggle logic for mobile goes here
            console.log("Language toggle clicked from mobile.");
        });
    }
    // ... (Your existing JavaScript logic from previous responses, e.g., price slider, quick filters,
    //      testimonial slider, smooth scrolling, staggered animations, video player, login, supplier registration)
    //      should also be included in this DOMContentLoaded block or imported and called.
    //      Refer to the "Revised public/js/app.js" or "Modify Individual JavaScript Files to Export Functions"
    //      from the previous turn to ensure all your JS is properly integrated.
});