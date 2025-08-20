// public/js/hero-slideshow-main.js

export function initHeroSlideshow() { // Export the function
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide-image');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

    if (!slideshowContainer || !slidesWrapper || !slides.length || !dotsContainer || !prevBtn || !nextBtn) {
        console.warn("Hero slideshow elements not found, skipping initialization.");
        return;
    }

    let currentSlide = 0;
    let autoPlayInterval;
    const slideDuration = 4000; // 4 seconds per slide

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slidesWrapper.style.transform = `translateX(${-currentSlide * (100 / slides.length)}%)`;

        // Update dots
        dotsContainer.querySelectorAll('.dot').forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function plusSlides(n) {
        showSlide(currentSlide + n);
        resetAutoPlay();
    }

    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.slideIndex = index;
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
        showSlide(currentSlide); // Initialize dot state
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            plusSlides(1);
        }, slideDuration);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Event Listeners for navigation
    prevBtn.addEventListener('click', () => plusSlides(-1));
    nextBtn.addEventListener('click', () => plusSlides(1));

    // Optional: Pause slideshow on hover
    slideshowContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    slideshowContainer.addEventListener('mouseleave', () => startAutoPlay());

    // Initialize slideshow
    createDots(); // This will also call showSlide(0) initially
    startAutoPlay();
}