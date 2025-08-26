// Admin Login JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('ri-eye-line');
            this.classList.toggle('ri-eye-off-line');
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Disable submit button and show loading state
            const submitBtn = loginForm.querySelector('.login-btn');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Logging in...</span>';
            submitBtn.disabled = true;
            
            // Make API call to authenticate user
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailPhone: email,
                    password: password,
                    role: 'ADMIN'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.code === 'LOGIN_SUCCESS') {
                    // Check if user is admin
                    if (data.user.role === 'ADMIN') {
                        // Store token in localStorage or sessionStorage based on "remember me" option
                        if (remember) {
                            localStorage.setItem('adminToken', data.token);
                        } else {
                            sessionStorage.setItem('adminToken', data.token);
                        }
                        
                        // Show success popup message
                        alert('Thanks for being part of Shamba Direct! Your admin dashboard is now ready');
                        
                        // Redirect to admin dashboard
                        window.location.href = './dashboard.html';
                    } else {
                        // User is not admin
                        alert('Unauthorized Access');
                    }
                } else {
                    // Show generic error message for security
                    alert('Invalid credentials');
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Please enter your email address to reset your password:');
            if (email) {
                // In a real application, this would make an API call to send a password reset email
                alert(`Password reset instructions have been sent to ${email}`);
            }
        });
    }
});