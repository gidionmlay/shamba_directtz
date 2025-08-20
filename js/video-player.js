export function initVideoPlayer() {
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
}