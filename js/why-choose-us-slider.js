// public/js/why-choose-us-slider.js

export function initWhyChooseUsSlider() { // Export the function
    const pointItems = document.querySelectorAll('.points-slider .point-item');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (!pointItems.length || !dots.length) {
        console.warn("Why Choose Us slider elements not found, skipping initialization.");
        return;
    }

    let currentPointIndex = 0;
    let autoSlideInterval;

    function showPoint(index) {
        pointItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        pointItems[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextPoint() {
        currentPointIndex = (currentPointIndex + 1) % pointItems.length;
        showPoint(currentPointIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextPoint, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    showPoint(currentPointIndex);
    startAutoSlide();

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.point);
            currentPointIndex = index;
            showPoint(currentPointIndex);
            resetAutoSlide();
        });
    });
}