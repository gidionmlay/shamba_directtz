export function initLoginForm() {
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
                link = '/register/farmer'; // Example route
                break;
            case 'supplier':
                text += 'Supplier.';
                link = '/register/supplier'; // Example route
                break;
            case 'admin':
                text += 'Admin (Contact Support).';
                link = 'mailto:support@shambadirect.com'; // Admin registration might be different
                break;
        }
        registerText.textContent = text;
        registerNowBtn.onclick = () => {
            // For simplicity, we'll just log the redirect in this demo
            console.log(`Redirecting to: ${link}`);
            // In a real application: window.location.href = link;
            alert(`Simulating redirection to: ${link}`);
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

        // BACKEND: Submit login credentials to /api/login
        // Expected request: { emailPhone, password, role }
        // Expected response: { success: boolean, message: string, redirectUrl?: string }
        fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailPhone, password, role: currentRole })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Login successful as ${currentRole}! Redirecting to dashboard.`);
                // window.location.href = data.redirectUrl || `/${currentRole}-dashboard`;
            } else {
                alert('Login failed: ' + (data.message || 'Invalid credentials or role not recognized.'));
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