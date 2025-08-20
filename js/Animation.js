// public/js/animation.js
// This function handles the click-to-highlight animation for testimonial items
export function initTestimonialHighlight() {
    // We no longer need $(document).ready because app.js will call this after DOMContentLoaded
    const testimonialItems = document.querySelectorAll('.testimonial-item'); // Get all elements with class 'testimonial-item'

    testimonialItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove 'highlight' class from ALL testimonial items
            testimonialItems.forEach(ti => ti.classList.remove('highlight'));
            // Add 'highlight' class to the ONE that was clicked
            this.classList.add('highlight');
        });
    });
}