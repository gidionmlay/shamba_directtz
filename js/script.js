export function initScript() {

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Staggered Load Animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    const appearOptionsFade = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScrollObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptionsFade);
    fadeInElements.forEach(fader => {
        appearOnScrollObserver.observe(fader);
    });

    // Testimonial Slider
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    const totalTestimonials = testimonials.length;
    let autoRotateInterval;

    function updateSlider() {
        testimonialWrapper.style.transform = `translateX(${-currentIndex * 100 / totalTestimonials}%)`;
        updateDots();
    }

    function createDots() {
        sliderDotsContainer.innerHTML = '';
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
                resetAutoRotate();
            });
            sliderDotsContainer.appendChild(dot);
        }
        updateDots();
    }

    function updateDots() {
        document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateSlider();
    }

    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateSlider();
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(goToNext, 5000); // Change testimonial every 5 seconds
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }

    prevButton.addEventListener('click', () => {
        goToPrev();
        resetAutoRotate();
    });

    nextButton.addEventListener('click', () => {
        goToNext();
        resetAutoRotate();
    });

    // Initialize slider
    createDots();
    startAutoRotate();

    // Value Proposition Cards - Gentle Up/Down Animation
    const valueCards = document.querySelectorAll('.value-card');

    valueCards.forEach(card => {
        card.style.animation = `float 3s ease-in-out infinite`;
    });

    // CSS for float animation (add to style.css)
    /*
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0px); }
    }
    */


    // Hero Section Parallax Effect (More involved, but a basic example)
    const heroSection = document.querySelector('.hero-section');
    const heroBg = heroSection.querySelector('::before'); // This targets the pseudo-element

    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            // Adjust the background position based on scroll (needs direct manipulation or a div for the background)
            // For pseudo-elements, this is tricky. A common approach is to have an inner div for the background.

            // Example if hero-section had an inner div for background:
            // const heroInnerBg = document.querySelector('.hero-inner-bg');
            // if (heroInnerBg) {
            //     heroInnerBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            // }

            // For the current setup with ::before, CSS perspective and transform will handle it with scroll.
            // Ensure `hero-section` has `perspective` and `transform-style: preserve-3d` if needed for other elements.
        });
    }

    // Interactive How It Works Steps
    const stepItems = document.querySelectorAll('.step-item');

    stepItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add a class for hover animation, already handled by CSS
            item.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hovered');
        });
    });

    // Ensure keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.closest('.testimonial-slider')) {
            if (e.key === 'ArrowLeft') {
                goToPrev();
                resetAutoRotate();
            } else if (e.key === 'ArrowRight') {
                goToNext();
                resetAutoRotate();
            }
        }
    });

    // Accessibility: ARIA labels are already in HTML for buttons.
    // Ensure all interactive elements have appropriate roles if not naturally conveyed.
    // --- Existing Smooth Scrolling and Staggered Load Animations (keep these) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    // --- End Existing Code ---

    // --- Hero Section Slideshow Logic ---
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide-image');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');

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

        slidesWrapper.style.transform = `translateX(${-currentSlide * (100 / slides.length)}%)`; // Adjust percentage based on number of slides

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

    // --- End Hero Section Slideshow Logic ---


    // Add to your existing script.js file, or ensure this part is present


    // ... (Your existing smooth scrolling and hero section JS) ...

    // --- General Scroll Fade-in/Zoom-in Animation ---
    const fadeIns = document.querySelectorAll('.fade-in-on-scroll'); // Select new class
    const appearOptionsFadeIn = {
        threshold: 0.2, // When 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start a bit before it enters viewport
    };

    const appearOnScrollFadeIn = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Element not in viewport
            } else {
                entry.target.classList.add('appear'); // Add 'appear' class to trigger animation
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptionsFadeIn);

    fadeIns.forEach(fader => {
        appearOnScrollFadeIn.observe(fader);
    });
    // --- End General Scroll Animation ---


    // --- Why Choose Us Section: Auto-Fading Points ---
    const pointItems = document.querySelectorAll('.points-slider .point-item');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentPointIndex = 0;
    let autoSlideInterval;

    function showPoint(index) {
        // Reset all
        pointItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Set active
        pointItems[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextPoint() {
        currentPointIndex = (currentPointIndex + 1) % pointItems.length;
        showPoint(currentPointIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextPoint, 5000); // Change point every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize first point and start auto-slide
    showPoint(currentPointIndex);
    startAutoSlide();

    // Dot navigation click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.point);
            currentPointIndex = index;
            showPoint(currentPointIndex);
            resetAutoSlide(); // Reset timer on manual click
        });
    });

    // --- Video Play/Pause Toggle ---
    const video = document.getElementById('howItWorksVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');

    playPauseBtn.addEventListener('click', () => {
        if (video.paused || video.ended) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change icon to pause
            video.muted = false; // Unmute on play (optional, user preference)
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change icon to play
        }
    });

    // Handle video ending if loop is removed later
    video.addEventListener('ended', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    // Set initial icon based on video state (e.g., if autoplay fails)
    video.addEventListener('playing', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    video.addEventListener('pause', () => {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    // --- Dynamic Product Reviews/Ratings and Real-Time Stock ---
    (function fetchProductReviewsAndStock() {
        // For each product card, fetch reviews/ratings and real-time stock
        document.querySelectorAll('.product-card').forEach(card => {
            // Assume each card has a data-product-id attribute or fallback to product name
            const productId = card.getAttribute('data-product-id') || card.querySelector('.product-name')?.textContent?.trim();
            if (!productId) return;

            // Fetch reviews/ratings
            fetch(`/api/products/${encodeURIComponent(productId)}/reviews`)
                .then(res => res.ok ? res.json() : [])
                .then(reviews => {
                    const reviewsDiv = card.querySelector('.product-reviews');
                    if (reviewsDiv && Array.isArray(reviews) && reviews.length) {
                        reviewsDiv.innerHTML = '<strong>Reviews:</strong><ul>' +
                            reviews.map(r => `<li>${r.rating ? '⭐'.repeat(r.rating) : ''} ${r.comment || ''}</li>`).join('') +
                            '</ul>';
                    }
                })
                .catch(err => {
                    // Optionally log or display a fallback
                    console.warn('Product reviews fetch failed:', err);
                });

            // Fetch real-time stock
            fetch(`/api/products/${encodeURIComponent(productId)}/stock`)
                .then(res => res.ok ? res.json() : null)
                .then(stock => {
                    const stockSpan = card.querySelector('.product-stock-realtime');
                    if (stockSpan && stock && typeof stock.quantity === 'number') {
                        stockSpan.textContent = `Stock: ${stock.quantity}`;
                    }
                })
                .catch(err => {
                    // Optionally log or display a fallback
                    console.warn('Product stock fetch failed:', err);
                });
        });
    })();
}
