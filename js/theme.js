document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (!themeToggleBtn) {
        console.warn("Theme toggle button with ID 'theme-toggle' not found.");
        return; // Exit if the button isn't there
    }

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleBtn.classList.remove('ri-sun-line'); // Change icon to moon
            themeToggleBtn.classList.add('ri-moon-line');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleBtn.classList.remove('ri-moon-line'); // Change icon back to sun
            themeToggleBtn.classList.add('ri-sun-line');
        }
    };

    // 1. Check for saved theme preference on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Optional: Apply system preference if no saved theme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light'); // Default to light if no preference
        }
    }

    // 2. Add click listener to toggle theme
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
        console.log("Theme toggled. Current mode:", localStorage.getItem('theme'));
    });
});