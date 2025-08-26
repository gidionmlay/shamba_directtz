// `supplier-registration.js`
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#supplierRegistrationForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLineFill = document.querySelector('.progress-line-fill');
    let currentStep = 1;
    
    // Regions and wards data
    const regionsData = {
        "Dar es Salaam": ["Kinondoni", "Ilala", "Temeke", "Kigamboni", "Ubungo"],
        "Arusha": ["Arusha Urban", "Arusha Rural", "Meru", "Longido", "Monduli", "Karatu"],
        "Dodoma": ["Dodoma Urban", "Bahi", "Chamwino", "Chemba", "Kondoa", "Kongwa", "Mpwapwa"],
        "Mwanza": ["Nyamagana", "Ilemela", "Magu", "Misungwi", "Kwimba", "Sengerema", "Ukerewe"],
        "Kilimanjaro": ["Moshi Urban", "Moshi Rural", "Hai", "Mwanga", "Rombo", "Kahe", "Same"],
        "Tanga": ["Tanga Urban", "Tanga Rural", "Muheza", "Pangani", "Handeni", "Kilindi", "Lushoto", "Mkinga", "Korogwe"],
        "Morogoro": ["Morogoro Urban", "Morogoro Rural", "Mvomero", "Kilosa", "Malinyi", "Ifakara"],
        "Pwani": ["Dar es Salaam", "Kibaha", "Mkuranga", "Bagamoyo", "Kisarawe", "Mafia"],
        "Lindi": ["Lindi Urban", "Lindi Rural", "Nachingwea", "Ruangwa", "Kilwa", "Namtumbo", "Liwale"],
        "Mtwara": ["Mtwara Urban", "Mtwara Rural", "Nanyamba", "Newala", "Tandahimba", "Masasi", "Namtumbo"],
        "Ruvuma": ["Songea Urban", "Songea Rural", "Tunduru", "Mbinga", "Namtumbo", "Nyasa"],
        "Iringa": ["Iringa Urban", "Iringa Rural", "Kilolo", "Mufindi", "Njombe"],
        "Mbeya": ["Mbeya Urban", "Mbeya Rural", "Rungwe", "Mbozi", "Kyela", "Chunya"],
        "Singida": ["Singida Urban", "Singida Rural", "Mkalama", "Iramba", "Manyoni"],
        "Tabora": ["Tabora Urban", "Tabora Rural", "Sikonge", "Nzega", "Uyui", "Kaliua"],
        "Shinyanga": ["Shinyanga Urban", "Shinyanga Rural", "Kahama", "Ngorongoro", "Kishapu", "Bukombe"],
        "Kagera": ["Bukoba Urban", "Bukoba Rural", "Missenyi", "Muleba", "Karagwe", "Ngara", "Chato"],
        "Mara": ["Mara", "Musoma Urban", "Musoma Rural", "Tarime", "Rorya", "Serengeti", "Butiama"],
        "Kigoma": ["Kigoma Urban", "Kigoma Rural", "Kasulu", "Kibondo", "Kakonko", "Ngozi"],
        "Geita": ["Geita Urban", "Geita Rural", "Chato", "Nyang'hwale", "Bukombe", "Mbogwe"],
        "Mjini Magharibi": ["Unguja", "Pemba"],
        "Simiyu": ["Bariadi", "Busega", "Itilima", "Maswa", "Meatu"]
    };
    
    // Get DOM elements
    const regionSelect = document.getElementById('region');
    const districtSelect = document.getElementById('district');
    const regionPopup = document.getElementById('regionPopup');
    const wardPopup = document.getElementById('wardPopup');
    const regionList = document.getElementById('regionList');
    const wardList = document.getElementById('wardList');
    const regionPopupClose = regionPopup.querySelector('.close-popup');
    const wardPopupClose = wardPopup.querySelector('.close-popup');
    
    // Open region popup when region select is clicked
    regionSelect.addEventListener('click', function(e) {
        e.preventDefault();
        openRegionPopup();
    });
    
    // Open ward popup when district select is clicked
    districtSelect.addEventListener('click', function(e) {
        e.preventDefault();
        if (regionSelect.value) {
            openWardPopup(regionSelect.value);
        } else {
            alert('Please select a region first');
        }
    });
    
    // Close popups when close button is clicked
    regionPopupClose.addEventListener('click', closeRegionPopup);
    wardPopupClose.addEventListener('click', closeWardPopup);
    
    // Close popups when clicking outside
    regionPopup.addEventListener('click', function(e) {
        if (e.target === regionPopup) {
            closeRegionPopup();
        }
    });
    
    wardPopup.addEventListener('click', function(e) {
        if (e.target === wardPopup) {
            closeWardPopup();
        }
    });
    
    // Function to open region popup
    function openRegionPopup() {
        // Populate region list
        regionList.innerHTML = '';
        for (const region in regionsData) {
            const li = document.createElement('li');
            li.className = 'region-item';
            li.innerHTML = `${region} <i class="ri-arrow-right-line"></i>`;
            li.addEventListener('click', function() {
                selectRegion(region);
            });
            regionList.appendChild(li);
        }
        
        // Show popup
        regionPopup.style.display = 'flex';
    }
    
    // Function to close region popup
    function closeRegionPopup() {
        regionPopup.style.display = 'none';
    }
    
    // Function to open ward popup
    function openWardPopup(region) {
        // Populate ward list
        wardList.innerHTML = '';
        const wards = regionsData[region] || [];
        wards.forEach(ward => {
            const li = document.createElement('li');
            li.className = 'ward-item';
            li.innerHTML = `${ward} <i class="ri-arrow-right-line"></i>`;
            li.addEventListener('click', function() {
                selectWard(ward);
            });
            wardList.appendChild(li);
        });
        
        // Show popup
        wardPopup.style.display = 'flex';
    }
    
    // Function to close ward popup
    function closeWardPopup() {
        wardPopup.style.display = 'none';
    }
    
    // Function to select region
    function selectRegion(region) {
        // Clear existing options
        regionSelect.innerHTML = '';
        // Add selected region as an option
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
        // Set the value
        regionSelect.value = region;
        // Enable district select
        districtSelect.disabled = false;
        // Clear district selection
        districtSelect.innerHTML = '<option value="">Select Ward</option>';
        // Close popup
        closeRegionPopup();
    }
    
    // Function to select ward
    function selectWard(ward) {
        // Clear existing options
        districtSelect.innerHTML = '';
        // Add selected ward as an option
        const option = document.createElement('option');
        option.value = ward;
        option.textContent = ward;
        districtSelect.appendChild(option);
        // Set the value
        districtSelect.value = ward;
        // Close popup
        closeWardPopup();
    }

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

        // Prepare form data
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        try {
            // Make API call to register supplier
            const response = await fetch('/api/register/supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Supplier registration submitted successfully! Your account is pending admin approval.');
                // Redirect to success page
                window.location.href = './success.html';
            } else {
                alert(`Registration failed: ${result.message || 'An unexpected error occurred.'}`);
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