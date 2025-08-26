function initLoginForm() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const loginForm = document.getElementById('loginForm');
    const registerText = document.getElementById('registerText');
    const registerNowBtn = document.getElementById('registerNowBtn');
    const emailPhoneInput = document.getElementById('emailPhone');
    const passwordInput = document.getElementById('password');

    let currentRole = 'farmer'; // Default role

    const updateRegisterLink = () => {
        let text = "Don't have an account? Register as a ";
        let link = '#'; // Default placeholder, replace with actual routes

        switch (currentRole) {
            case 'farmer':
                text += 'Farmer.';
                link = './farmer-registration.html'; // Actual route
                break;
            case 'supplier':
                text += 'Supplier.';
                link = './supplier-registration.html'; // Actual route
                break;
            case 'admin':
                text += 'Admin (Contact Support).';
                link = 'mailto:support@shambadirect.com'; // Admin registration might be different
                break;
        }
        registerText.textContent = text;
        registerNowBtn.onclick = (e) => {
            e.preventDefault();
            // Redirect to the appropriate registration page
            if (link.startsWith('mailto:')) {
                window.location.href = link;
            } else {
                window.location.href = link;
            }
        };
    };

    // Initialize the register link text
    updateRegisterLink();

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked tab
            button.classList.add('active');

            // Update current role
            currentRole = button.dataset.role;
            console.log(`Switched to ${currentRole} login.`);

            // Update dynamic text and link
            updateRegisterLink();

            // Optionally, clear form fields on role switch for new input
            emailPhoneInput.value = '';
            passwordInput.value = '';
        });
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const emailPhone = emailPhoneInput.value.trim();
        const password = passwordInput.value.trim();

        if (!emailPhone || !password) {
            alert('Please enter both email/phone and password.');
            return;
        }

        const loginButton = event.submitter;
        const originalButtonText = loginButton.textContent;
        loginButton.textContent = 'Logging in...';
        loginButton.disabled = true;

        // Submit login credentials to /api/login
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailPhone, password, role: currentRole })
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 'LOGIN_SUCCESS') {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                
                // Check if it's the user's first login
                if (data.user.isFirstLogin) {
                    // Show welcome message
                    alert('Thank you for becoming part of the Shamba Direct family! We\'re excited to help you grow with us. Welcome to your dashboard.');
                }
                
                // Redirect to appropriate dashboard based on role
                if (currentRole === 'admin') {
                    window.location.href = '../pages/admin/dashboard.html';
                } else {
                    // For farmers and suppliers, redirect to their respective dashboards
                    window.location.href = `./${currentRole}-dashboard.html`;
                }
            } else {
                // Handle different error cases
                switch (data.code) {
                    case 'ACCOUNT_PENDING':
                        alert('Your account is under review. Please wait for admin approval.');
                        break;
                    case 'ACCOUNT_REJECTED':
                        alert('Your registration request was declined. Contact support for assistance.');
                        break;
                    case 'INVALID_CREDENTIALS':
                        alert('Invalid email/phone or password.');
                        break;
                    case 'INVALID_ROLE':
                        alert('User role does not match provided role.');
                        break;
                    default:
                        alert('Login failed: ' + (data.message || 'Invalid credentials or role not recognized.'));
                }
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('An error occurred while logging in. Please try again.');
        })
        .finally(() => {
            loginButton.textContent = originalButtonText;
            loginButton.disabled = false;
        });
    });
}