// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initializeDashboard();
    
    // Initialize dashboard components
    function initializeDashboard() {
        // Menu toggle functionality
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
                menuToggle.querySelector('i').classList.toggle('ri-menu-line');
                menuToggle.querySelector('i').classList.toggle('ri-close-line');
            });
        }
        
        // Status badge click handlers
        const statusBadges = document.querySelectorAll('.status-badge');
        statusBadges.forEach(badge => {
            badge.addEventListener('click', function() {
                const status = this.textContent.trim().toLowerCase();
                alert(`Status: ${status}`);
            });
        });
        
        // Action button handlers
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.textContent.trim();
                alert(`Action: ${action}`);
            });
        });
    }
});