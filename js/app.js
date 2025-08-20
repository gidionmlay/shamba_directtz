// public/js/app.js - Unified JavaScript File

document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scrolling
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    };
    initSmoothScrolling();

    // 2. Theme Toggle
    const initThemeToggle = () => {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                // Optional: Save preference to localStorage
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });
            // Optional: Apply saved theme on load
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }
    };
    initThemeToggle();

    // 3. Hero Section Slideshow
    const initHeroSlideshow = () => {
        const slides = document.querySelectorAll('.hero-visual .slide-image');
        const dots = document.querySelectorAll('.hero-visual .slide-dots .dot');
        const prevButton = document.querySelector('.hero-visual .prev-slide');
        const nextButton = document.querySelector('.hero-visual .next-slide');
        const slidesWrapper = document.querySelector('.hero-visual .slides-wrapper');

        if (!slides.length || !slidesWrapper) return;

        let currentSlideIndex = 0;
        let slideInterval;
        const slideWidth = slides[0].clientWidth; // Assuming all slides have same width

        const updateSlideshow = () => {
            slidesWrapper.style.transform = `translateX(${-currentSlideIndex * slideWidth}px)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlideIndex);
            });
        };

        const goToNextSlide = () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlideshow();
        };

        const goToPrevSlide = () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlideshow();
        };

        const startAutoSlide = () => {
            clearInterval(slideInterval); // Clear any existing interval
            slideInterval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
        };

        // Event Listeners
        prevButton?.addEventListener('click', () => {
            goToPrevSlide();
            startAutoSlide(); // Reset timer on manual interaction
        });
        nextButton?.addEventListener('click', () => {
            goToNextSlide();
            startAutoSlide(); // Reset timer on manual interaction
        });
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                currentSlideIndex = parseInt(this.dataset.slideIndex);
                updateSlideshow();
                startAutoSlide(); // Reset timer on manual interaction
            });
        });

        // Initialize
        window.addEventListener('resize', updateSlideshow); // Recalculate width on resize
        updateSlideshow();
        startAutoSlide();
    };
    initHeroSlideshow();

    // 4. Staggered Load Animations (Intersection Observer)
    const initStaggeredLoadAnimations = () => {
        const faders = document.querySelectorAll('.fade-in');
        const appearOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px" // Start animating when 50px from bottom of viewport
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    };
    initStaggeredLoadAnimations();

    // 5. Testimonial Slider
    const initTestimonialSlider = () => {
        const testimonialGrid = document.querySelector('.testimonial-cards-grid');
        const testimonialItems = document.querySelectorAll('.testimonial-cards-grid .testimonial-item');

        if (!testimonialGrid || testimonialItems.length === 0) return;

        let currentIndex = 0;
        const itemsPerView = 3; // Number of items to show at once
        const totalItems = testimonialItems.length;

        const updateSlider = () => {
            // Calculate the width of one item including its margin, then transform
            const itemWidth = testimonialItems[0].offsetWidth + (parseFloat(getComputedStyle(testimonialItems[0]).marginLeft) + parseFloat(getComputedStyle(testimonialItems[0]).marginRight));
            testimonialGrid.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
        };

       

        
        window.addEventListener('resize', updateSlider);
        updateSlider(); // Initial update
    };
    
    initTestimonialSlider();


    // 6. Value Proposition Cards - Gentle Up/Down Animation
    const initValueCardAnimations = () => {
        const valueCards = document.querySelectorAll('.value-card');
        // The animation is primarily handled by CSS (@keyframes float).
        // This JS just ensures the class is present, which it is in HTML.
        // If you wanted to dynamically add it:
        valueCards.forEach(card => {
            card.style.animation = `float 3s ease-in-out infinite`;
        });
    };
    initValueCardAnimations();

    // 7. How It Works Section (Process Steps Animation)
    const initHowItWorksAnimation = () => {
        const processSteps = document.querySelectorAll('.process-step');

        const stepOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const stepObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear'); // You would need .appear CSS for process-step
                    observer.unobserve(entry.target);
                }
            });
        }, stepOptions);

        processSteps.forEach(step => {
            step.classList.add('fade-in'); // Add the fade-in class for consistency
            stepObserver.observe(step);
        });
    };
    initHowItWorksAnimation();

    // 8. Why Choose Us Section - Points Slider/Auto-fading points
    const initWhyChooseUsSlider = () => {
        const points = document.querySelectorAll('.why-choose-us-section .point-item');
        const dots = document.querySelectorAll('.why-choose-us-section .slider-dots .dot');

        if (!points.length || !dots.length) return;

        let currentPointIndex = 0;
        let autoSlideInterval;

        const showPoint = (index) => {
            points.forEach((point, i) => {
                point.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        const goToNextPoint = () => {
            currentPointIndex = (currentPointIndex + 1) % points.length;
            showPoint(currentPointIndex);
        };

        const startAutoSlide = () => {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(goToNextPoint, 4000); // Change point every 4 seconds
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        // Dot navigation click handlers
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.point);
                currentPointIndex = index;
                showPoint(currentPointIndex);
                resetAutoSlide();
            });
        });

        // Initialize
        showPoint(currentPointIndex);
        startAutoSlide();
    };
    initWhyChooseUsSlider();

    // 9. Why Choose Us Section - Video Play/Pause Toggle
    const initVideoPlayer = () => {
        const video = document.getElementById('howItWorksVideo');
        const playPauseBtn = document.getElementById('playPauseBtn');

        if (!video || !playPauseBtn) return;

        playPauseBtn.addEventListener('click', () => {
            if (video.paused || video.ended) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                video.muted = false; // Unmute on play (optional)
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Handle video ending
        video.addEventListener('ended', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

       
        video.addEventListener('playing', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        video.addEventListener('pause', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        // Initial check for autoplay state
        if (!video.paused && !video.muted) { // If video is auto-playing and not muted
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    };
    initVideoPlayer();

    // 10. Chatbot Functionality
    const initChatbot = () => {
        const chatbotToggle = document.querySelector('.chatbot-toggle');
        const chatbotWindow = document.querySelector('.chatbot-window');
        const closeChat = document.querySelector('.close-chat');
        const chatForm = document.getElementById('chatForm');
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');

        if (!chatbotToggle || !chatbotWindow || !closeChat || !chatForm || !chatInput || !chatMessages) return;

        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
        });

        closeChat.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });

        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userMessage = chatInput.value.trim();
            if (userMessage) {
                appendMessage(userMessage, 'user');
                chatInput.value = '';
                // BACKEND: Send user message to /api/chatbot and display response
                // Expected request: { message: string }
                // Expected response: { reply: string }
                try {
                    const response = await fetch('/api/chatbot', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: userMessage })
                    });
                    const data = await response.json();
                    if (data.reply) {
                        appendMessage(data.reply, 'bot');
                    } else {
                        appendMessage("Thank you for your message. A representative will get back to you shortly.", 'bot');
                    }
                } catch (error) {
                    console.error('Chatbot API error:', error);
                    appendMessage("Thank you for your message. A representative will get back to you shortly.", 'bot');
                }
            }
        });

        function appendMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('chat-message', sender);
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
        }
    };
    initChatbot();

    // --- Dynamic Hero Greeting ---
    (function fetchUserGreeting() {
        // BACKEND: Fetch user info for personalized greeting
        fetch('/api/user', { credentials: 'include' })
            .then(res => res.ok ? res.json() : null)
            .then(user => {
                if (user && user.name) {
                    const greetingDiv = document.getElementById('userGreeting');
                    if (greetingDiv) {
                        greetingDiv.textContent = `Welcome back, ${user.name}!`;
                    }
                }
            })
            .catch(err => {
                // Optionally log or display a fallback
                console.warn('User greeting fetch failed:', err);
            });
    })();

    // --- Dynamic Featured Products ---
    (function fetchFeaturedProducts() {
        // BACKEND: Fetch featured products for homepage
        fetch('/api/products?featured=true')
            .then(res => res.ok ? res.json() : [])
            .then(products => {
                const section = document.getElementById('featuredProductsSection');
                if (section && Array.isArray(products) && products.length) {
                    section.innerHTML = '<h2>Featured Products</h2>' +
                        '<div class="featured-products-list">' +
                        products.map(p => `
                            <div class="featured-product-card">
                                <img src="${p.image || '/public/assets/images/product-placeholder.jpg'}" alt="${p.name}">
                                <h3>${p.name}</h3>
                                <p>${p.price ? 'TZS ' + p.price.toLocaleString() : ''}</p>
                            </div>
                        `).join('') +
                        '</div>';
                }
            })
            .catch(err => {
                // Optionally log or display a fallback
                console.warn('Featured products fetch failed:', err);
            });
    })();
    
    // --- Dynamic Company Milestones (About Page) ---
    (function fetchCompanyMilestones() {
        const milestonesDiv = document.getElementById('companyMilestones');
        if (!milestonesDiv) return;
        // BACKEND: Fetch company milestones
        fetch('/api/company/milestones')
            .then(res => res.ok ? res.json() : [])
            .then(milestones => {
                if (Array.isArray(milestones) && milestones.length) {
                    milestonesDiv.innerHTML = '<h2>Our Milestones</h2>' +
                        '<ul>' + milestones.map(m => `<li>${m.year ? `<strong>${m.year}:</strong> ` : ''}${m.description || ''}</li>`).join('') + '</ul>';
                }
            })
            .catch(err => {
                console.warn('Milestones fetch failed:', err);
            });
    })();

    // --- Dynamic Team Member Bios (About Page) ---
    (function fetchTeamBios() {
        const teamDiv = document.getElementById('teamBios');
        if (!teamDiv) return;
        // BACKEND: Fetch team member bios
        fetch('/api/company/team')
            .then(res => res.ok ? res.json() : [])
            .then(team => {
                if (Array.isArray(team) && team.length) {
                    teamDiv.innerHTML = '<h2>Meet Our Team</h2>' +
                        '<div class="team-bios-list">' +
                        team.map(member => `
                            <div class="team-bio-card">
                                <img src="${member.photo || '/public/assets/images/ceo.jpg'}" alt="${member.name}">
                                <h3>${member.name}</h3>
                                <p>${member.role || ''}</p>
                                <p>${member.bio || ''}</p>
                            </div>
                        `).join('') +
                        '</div>';
                }
            })
            .catch(err => {
                console.warn('Team bios fetch failed:', err);
            });
    })();
    
});