// Example: Using jQuery for slide animation
// (This would replace your vanilla JS slide logic)
$(document).ready(function() {
    let slideIndex = 1;
    showSlides(slideIndex);

    $('.next-slide').on('click', function() {
        plusSlides(1);
    });

    $('.prev-slide').on('click', function() {
        plusSlides(-1);
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = $('.mySlides'); // Assuming this class is on your individual slide divs
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }

        slides.hide(); // Hide all slides
        $(slides[slideIndex - 1]).fadeIn(500); // Fade in the current slide
    }
});
// Example: Initializing Slick Carousel (requires Slick CSS and JS)
// <link rel="stylesheet" type="text/css" href="slick/slick.css"/>
// <link rel="stylesheet" type="text/css" href="slick/slick-theme.css"/>
// <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

$(document).ready(function(){
  $('.testimonial-cards-grid').slick({
    slidesToShow: 3, // Show 3 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Show navigation arrows
    dots: true, // Show pagination dots
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});
// Example: More complex hover on benefit card
$(document).ready(function() {
    $('.benefit-card').hover(
        function() { // mouseenter
            $(this).find('.card-icon-circle').stop().animate({
                'font-size': '2.2em', // Grow icon
                'border-radius': '60px' // Slightly deform circle
            }, 200);
            $(this).find('.benefit-title').stop().animate({
                'letter-spacing': '0.5px'
            }, 200);
        },
        function() { // mouseleave
            $(this).find('.card-icon-circle').stop().animate({
                'font-size': '1.8em',
                'border-radius': '50%'
            }, 200);
            $(this).find('.benefit-title').stop().animate({
                'letter-spacing': '0px'
            }, 200);
        }
    );
});