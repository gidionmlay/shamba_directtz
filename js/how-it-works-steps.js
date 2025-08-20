// public/js/how-it-works-steps.js

export function initHowItWorksSteps() { // Export the function
    const stepItems = document.querySelectorAll('.step-item');

    if (!stepItems.length) {
        console.warn("How It Works steps not found, skipping initialization.");
        return;
    }

    stepItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hovered');
        });
    });
}