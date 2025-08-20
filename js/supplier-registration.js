// `supplier-registration.js`
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#supplierRegistrationForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLineFill = document.querySelector('.progress-line-fill');
    let currentStep = 1;

    // Event listeners for "Next" and "Previous" buttons
    document.querySelectorAll('.next-step-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                updateStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.prev-step-btn').forEach(button => {
        button.addEventListener('click', () => {
            updateStep(currentStep - 1);
        });
    });

    // Handle file input changes to show file name
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', (event) => {
            const fileNameSpan = document.querySelector(`#${input.id}FileName`);
            if (event.target.files.length > 0) {
                fileNameSpan.textContent = event.target.files[0].name;
            } else {
                fileNameSpan.textContent = 'No file chosen';
            }
        });
    });

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Final validation for the last step
        if (!validateStep(currentStep)) {
            return;
        }

        // Show loading spinner
        const submitBtn = document.querySelector('#submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.loading-spinner');
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';

        const formData = new FormData(form);

        // This is a placeholder for the API endpoint
        const apiEndpoint = form.action;

        try {
            const response = await fetch(apiEndpoint, {
                method: form.method,
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);
                alert('Supplier registration successful! You will be redirected shortly.');
                window.location.href = '/public/pages/success.html'; // Example redirect
            } else {
                const error = await response.json();
                console.error('Registration failed:', error);
                alert(`Registration failed: ${error.message || 'An unexpected error occurred.'}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please check your internet connection.');
        } finally {
            // Hide loading spinner
            btnText.style.display = 'inline-block';
            spinner.style.display = 'none';
        }
    });

    function updateStep(stepNumber) {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        // Show the current step
        document.querySelector(`#step-${stepNumber}`).classList.add('active');
        
        // Update progress bar
        progressSteps.forEach((step, index) => {
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        });
        progressSteps.forEach(step => step.classList.remove('active'));
        document.querySelector(`.progress-step[data-step="${stepNumber}"]`).classList.add('active');

        const progressPercentage = ((stepNumber - 1) / (steps.length - 1)) * 100;
        progressLineFill.style.width = `${progressPercentage}%`;
        
        currentStep = stepNumber;
    }

    function validateStep(stepNumber) {
        let isValid = true;
        const currentStepElement = document.querySelector(`#step-${stepNumber}`);
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            const errorMessageElement = document.querySelector(`#${input.id}-error`);
            errorMessageElement.textContent = ''; // Clear previous errors
            
            if (!input.checkValidity()) {
                isValid = false;
                errorMessageElement.textContent = input.validationMessage || 'This field is required.';
            }

            // Custom validation for specific fields
            if (input.id === 'confirmPassword') {
                const password = document.getElementById('password').value;
                if (input.value !== password) {
                    isValid = false;
                    errorMessageElement.textContent = 'Passwords do not match.';
                }
            }

            // Handle multiple selects
            if (input.type === 'select-multiple') {
                if (input.selectedOptions.length === 0) {
                    isValid = false;
                    errorMessageElement.textContent = 'Please select at least one option.';
                }
            }
        });
        
        return isValid;
    }

    // Initialize the form
    updateStep(1);
});