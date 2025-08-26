// Admin Authentication JavaScript

// Check if user is authenticated as admin
function checkAdminAuth() {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!token) {
        // Redirect to login page if no token found
        window.location.href = './login.html';
        return Promise.resolve(false);
    }
    
    // Verify token with backend
    return fetch('/api/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.code !== 'SUCCESS' || data.user.role !== 'ADMIN') {
            // Redirect to login page if token is invalid or user is not admin
            localStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminToken');
            window.location.href = './login.html';
            return false;
        }
        
        // Update user profile information if element exists
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) {
            userNameElement.textContent = data.user.name;
        }
        
        return true;
    })
    .catch(error => {
        console.error('Token verification error:', error);
        // Redirect to login page on error
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminToken');
        window.location.href = './login.html';
        return false;
    });
}

// Initialize admin auth on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only run auth check if we're not on the login page
    if (!window.location.pathname.includes('login.html')) {
        checkAdminAuth().then(() => {
            // Logout functionality
            const logoutLink = document.querySelector('.sidebar-footer a');
            if (logoutLink) {
                logoutLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Remove tokens
                    localStorage.removeItem('adminToken');
                    sessionStorage.removeItem('adminToken');
                    // Redirect to login page
                    window.location.href = './login.html';
                });
            }
        });
    }
});