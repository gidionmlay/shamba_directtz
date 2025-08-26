// Blog Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    const categoryButtons = document.querySelectorAll('.category-filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide posts based on category
            blogPosts.forEach(post => {
                if (category === 'all' || post.getAttribute('data-category') === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('blogSearch');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('.blog-post-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.blog-post-excerpt').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, this would load new content
            // For now, we'll just show an alert
            if (!this.querySelector('i')) {
                alert(`Loading page ${this.textContent}`);
            }
        });
    });
    
    // Gallery preview functionality
    const galleryCards = document.querySelectorAll('.gallery-card');
    const galleryOverlays = document.querySelectorAll('.gallery-card-overlay');
    
    // Add click event to gallery overlays
    galleryOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const card = this.closest('.gallery-card');
            const title = card.querySelector('.gallery-card-title').textContent;
            alert(`Opening gallery: ${title}\nIn a full implementation, this would open a lightbox or redirect to the gallery page.`);
        });
    });
    
    // Add hover effect to gallery cards
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});