document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('farmerRegistrationForm');
            const formSteps = document.querySelectorAll('.form-step');
            const progressSteps = document.querySelectorAll('.progress-step');
            const progressBarFill = document.querySelector('.progress-line-fill');
            let currentStep = 1;

            // --- Data for Regions and Districts (Example Data) ---
            const regionsData = {
                "Dar es Salaam": ["Kinondoni", "Ilala", "Temeke", "Kigamboni", "Ubungo"],
                "Arusha": ["Arusha Urban", "Arusha Rural", "Meru", "Longido", "Monduli", "Karatu"],
                "Dodoma": ["Dodoma Urban", "Bahi", "Chamwino", "Chemba", "Kondoa", "Kongwa", "Mpwapwa"],
                "Mwanza": ["Nyamagana", "Ilemela", "Magu", "Misungwi", "Kwimba", "Sengerema", "Ukerewe"]
            };

            // --- Helper Functions ---
            const showStep = (step) => {
                formSteps.forEach((s, index) => {
                    s.classList.toggle('active', index + 1 === step);
                });
                updateProgressBar(step);
                currentStep = step;
            };

            const updateProgressBar = (step) => {
                progressSteps.forEach((p, index) => {
                    p.classList.toggle('active', index < step);
                });
                const percent = ((step - 1) / (progressSteps.length - 1)) * 100;
                progressBarFill.style.width = `${percent}%`;
            };

            const validateStep = (step) => {
                let isValid = true;
                const currentFormStep = document.getElementById(`step-${step}`);
                const requiredInputs = currentFormStep.querySelectorAll('[required]');

                requiredInputs.forEach(input => {
                    const errorElement = document.getElementById(`${input.id}-error`);
                    input.classList.remove('invalid'); // Clear previous invalid state

                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('invalid');
                        if (errorElement) errorElement.textContent = 'This field is required.';
                    } else if (input.type === 'email' && input.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('invalid');
                        if (errorElement) errorElement.textContent = 'Please enter a valid email address.';
                    } else if (input.id === 'phone' && !/^\+?[0-9]{7,15}$/.test(input.value.trim())) { // Basic phone number validation
                        isValid = false;
                        input.classList.add('invalid');
                        if (errorElement) errorElement.textContent = 'Please enter a valid phone number (e.g., +2557XXXXXXXX).';
                    } else if (input.type === 'password' && input.id === 'password' && input.value.length < 8) {
                        isValid = false;
                        input.classList.add('invalid');
                        if (errorElement) errorElement.textContent = 'Password must be at least 8 characters.';
                    } else if (input.id === 'confirmPassword' && input.value !== document.getElementById('password').value) {
                        isValid = false;
                        input.classList.add('invalid');
                        if (errorElement) errorElement.textContent = 'Passwords do not match.';
                    } else if (input.type === 'checkbox' && !input.checked) {
                        isValid = false;
                        input.classList.add('invalid');
                        if (errorElement) errorElement.textContent = 'You must agree to the terms.';
                    } else {
                        if (errorElement) errorElement.textContent = ''; // Clear error if valid
                    }
                });
                return isValid;
            };

            // --- Event Listeners for Navigation Buttons ---
            document.querySelectorAll('.next-step-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const nextStep = parseInt(button.dataset.step);
                    if (validateStep(currentStep)) {
                        showStep(nextStep);
                    }
                });
            });

            document.querySelectorAll('.prev-step-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const prevStep = parseInt(button.dataset.step);
                    showStep(prevStep);
                });
            });

            // --- Dynamic Region and District Dropdowns ---
            const regionSelect = document.getElementById('region');
            const districtSelect = document.getElementById('district');

            // Populate regions on load
            const populateRegions = () => {
                for (const region in regionsData) {
                    const option = document.createElement('option');
                    option.value = region;
                    option.textContent = region;
                    regionSelect.appendChild(option);
                }
            };

            // Populate districts based on selected region
            regionSelect.addEventListener('change', () => {
                const selectedRegion = regionSelect.value;
                districtSelect.innerHTML = '<option value="">Select District</option>'; // Clear districts
                districtSelect.disabled = true; // Disable until a region is selected
                districtSelect.classList.remove('invalid'); // Clear invalid state

                if (selectedRegion && regionsData[selectedRegion]) {
                    regionsData[selectedRegion].forEach(district => {
                        const option = document.createElement('option');
                        option.value = district;
                        option.textContent = district;
                        districtSelect.appendChild(option);
                    });
                    districtSelect.disabled = false;
                }
                document.getElementById('district-error').textContent = ''; // Clear error on region change
            });

            // --- File Upload Display ---
            const idUploadInput = document.getElementById('idUpload');
            const fileNameSpan = document.getElementById('fileName');

            idUploadInput.addEventListener('change', () => {
                if (idUploadInput.files.length > 0) {
                    fileNameSpan.textContent = idUploadInput.files[0].name;
                } else {
                    fileNameSpan.textContent = 'No file chosen';
                }
            });

            // --- Form Submission Handling ---
            form.addEventListener('submit', async (event) => {
                event.preventDefault(); // Prevent default form submission

                const submitBtn = document.getElementById('submitBtn');
                const btnText = submitBtn.querySelector('.btn-text');
                const loadingSpinner = submitBtn.querySelector('.loading-spinner');

                // Validate the final step before submission
                if (!validateStep(currentStep)) {
                    return;
                }

                // Show loading spinner
                btnText.style.display = 'none';
                loadingSpinner.style.display = 'inline-block';
                submitBtn.disabled = true; // Disable button to prevent multiple submissions

                // Prepare form data
                const formData = new FormData(form);
                const data = {};
                for (const [key, value] of formData.entries()) {
                    // Handle multiple selections for 'mainCrops'
                    if (key === 'mainCrops') {
                        if (!data[key]) {
                            data[key] = [];
                        }
                        data[key].push(value);
                    } else if (key !== 'idUpload') { // Exclude file from direct serialization for now
                        data[key] = value;
                    }
                }

                try {
                    // Make API call to register farmer
                    const response = await fetch('/api/register/farmer', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();

                    if (response.ok) {
                        alert('Farmer registration submitted successfully! Your account is pending admin approval.');
                        // Redirect to success page
                        window.location.href = './success.html';
                    } else {
                        alert(`Registration failed: ${result.message || 'An unexpected error occurred.'}`);
                    }
                } catch (error) {
                    console.error('Registration failed:', error);
                    alert('Registration failed. Please try again.');
                } finally {
                    // Hide loading spinner and enable button
                    btnText.style.display = 'inline';
                    loadingSpinner.style.display = 'none';
                    submitBtn.disabled = false;
                }
            });

            // Initialize the form
            showStep(1);
            populateRegions();
        });