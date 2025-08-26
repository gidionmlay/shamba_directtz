// Admin Settings JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Save settings functionality
    const saveSettingsBtn = document.getElementById('saveSettings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // In a real application, this would make an API call to save the settings
            // For now, we'll just show a message
            alert('Settings saved successfully!');
        });
    }
    
    // Reset settings functionality
    const resetSettingsBtn = document.getElementById('resetSettings');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all settings to their default values?')) {
                // In a real application, this would make an API call to reset the settings
                // For now, we'll just show a message
                alert('Settings reset to defaults!');
            }
        });
    }
    
    // Notification badge click functionality
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('In a full implementation, this would show a notification panel.');
        });
    }
    
    // User profile click functionality
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            alert('In a full implementation, this would show a user profile menu.');
        });
    }
    
    // Add hover effects to setting groups
    const settingGroups = document.querySelectorAll('.setting-group');
    settingGroups.forEach(group => {
        group.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9fafb';
        });
        
        group.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Password visibility toggle
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        // Create eye icon for password visibility toggle
        const eyeIcon = document.createElement('i');
        eyeIcon.className = 'ri-eye-line password-toggle';
        eyeIcon.style.position = 'absolute';
        eyeIcon.style.right = '10px';
        eyeIcon.style.top = '50%';
        eyeIcon.style.transform = 'translateY(-50%)';
        eyeIcon.style.cursor = 'pointer';
        eyeIcon.style.color = '#9ca3af';
        
        // Insert eye icon after password input
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(eyeIcon);
        
        // Toggle password visibility
        eyeIcon.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
                this.className = 'ri-eye-off-line password-toggle';
            } else {
                input.type = 'password';
                this.className = 'ri-eye-line password-toggle';
            }
        });
    });
});