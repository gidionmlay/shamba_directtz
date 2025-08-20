export function initValueCardAnimations() {
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
}