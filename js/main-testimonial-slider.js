export function initMainTestimonialSlider() {
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

}