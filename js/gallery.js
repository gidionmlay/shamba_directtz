// Gallery Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.dot');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    
    // Show slide function
    function showSlide(index) {
        // Hide all slides
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        carouselDots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        carouselSlides[index].classList.add('active');
        carouselDots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    }
    
    // Auto slide change every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide when hovering over carousel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Dot click functionality
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Navigation button functionality
    if (prevSlideBtn) prevSlideBtn.addEventListener('click', prevSlide);
    if (nextSlideBtn) nextSlideBtn.addEventListener('click', nextSlide);
    
    // Category filtering functionality
    const categoryButtons = document.querySelectorAll('.category-filter-btn');
    const mediaCards = document.querySelectorAll('.media-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide cards based on category
            mediaCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevLightbox = document.getElementById('prev-lightbox');
    const nextLightbox = document.getElementById('next-lightbox');
    const mediaImages = document.querySelectorAll('.media-image');
    
    let currentImageIndex = 0;
    
    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        const card = mediaCards[index];
        const img = card.querySelector('.media-image');
        const title = card.querySelector('.media-title').textContent;
        const desc = card.querySelector('.media-description').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightboxFunc() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Next image in lightbox
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % mediaCards.length;
        openLightbox(currentImageIndex);
    }
    
    // Previous image in lightbox
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + mediaCards.length) % mediaCards.length;
        openLightbox(currentImageIndex);
    }
    
    // Add click event to media images
    mediaImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Add click event to media overlays
    const mediaOverlays = document.querySelectorAll('.media-overlay');
    mediaOverlays.forEach((overlay, index) => {
        overlay.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Close lightbox when clicking on close button or outside image
    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxFunc);
    if (lightbox) lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxFunc();
    });
    
    // Navigate lightbox with arrow buttons
    if (prevLightbox) prevLightbox.addEventListener('click', prevImage);
    if (nextLightbox) nextLightbox.addEventListener('click', nextImage);
    
    // Navigate lightbox with keyboard arrows
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeLightboxFunc();
        }
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
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});