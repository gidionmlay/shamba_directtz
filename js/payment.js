document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selections ---
    const customerDetailsForm = document.getElementById('customerDetailsForm');
    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phone');
    const deliveryVillageInput = document.getElementById('deliveryVillage');
    const deliveryWardInput = document.getElementById('deliveryWard');
    const deliveryDistrictInput = document.getElementById('deliveryDistrict');
    const alternateContactInput = document.getElementById('alternateContact');

    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const paymentDetailsArea = document.getElementById('paymentDetailsArea');

    const promoCodeInput = document.getElementById('promoCodeInput');
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const promoError = document.getElementById('promo-error');

    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const placeOrderBtnText = placeOrderBtn.querySelector('.btn-text');
    const loadingSpinner = placeOrderBtn.querySelector('.loading-spinner');

    const confirmationScreen = document.getElementById('confirmationScreen');
    const orderReferenceSpan = document.getElementById('orderReference');

    const langEn = document.getElementById('lang-en');
    const langSw = document.getElementById('lang-sw');

    // --- Product Data Population ---
    let productData = {
        name: "Default Product", // Fallback if no data is passed
        price: 0,
        quantity: 1,
        image: "./assets/images/product-placeholder.jpg" // Default placeholder image
    };

    // Attempt to get product data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('productName')) {
        productData.name = urlParams.get('productName');
        productData.price = parseFloat(urlParams.get('productPrice')) || 0;
        productData.quantity = parseInt(urlParams.get('quantity')) || 1;
        productData.image = urlParams.get('productImage') || "./assets/images/product-placeholder.jpg";
    }

    // Update Product Summary Card with pre-populated data
    const productSummaryCard = document.querySelector('.product-summary-card');
    if (productSummaryCard) {
        const productItemDiv = productSummaryCard.querySelector('.product-item');
        if (productItemDiv) {
            const imgElement = productItemDiv.querySelector('img');
            if (imgElement) imgElement.src = productData.image;

            const nameElement = productItemDiv.querySelector('.product-info h3');
            if (nameElement) nameElement.textContent = productData.name;

            const priceElement = productItemDiv.querySelector('.product-info p:nth-of-type(1)');
            if (priceElement) priceElement.textContent = `Price: TZS ${productData.price.toLocaleString()}`;

            const quantityElement = productItemDiv.querySelector('.product-info p:nth-of-type(2)');
            if (quantityElement) quantityElement.textContent = `Quantity: ${productData.quantity} bag(s)`;

            const totalElement = productItemDiv.querySelector('.product-total p');
            if (totalElement) totalElement.textContent = `TZS ${(productData.price * productData.quantity).toLocaleString()}`;
        }
    }

    // --- State Variables (using dynamically loaded productData for initial values) ---
    let productTotal = productData.price * productData.quantity; // TZS
    let deliveryFee = 5000; // TZS - This would ideally be dynamic based on location/product
    let totalPayable = productTotal + deliveryFee;
    let promoDiscount = 0;

    // --- Update Order Summary Function ---
    const updateOrderSummary = () => {
        document.getElementById('summaryProductTotal').textContent = `TZS ${productTotal.toLocaleString()}`;
        document.getElementById('summaryDeliveryFee').textContent = `TZS ${deliveryFee.toLocaleString()}`;
        document.getElementById('summaryTotalPayable').textContent = `TZS ${(totalPayable - promoDiscount).toLocaleString()}`;
    };

    // --- Form Validation Function ---
    const validateField = (inputElement, errorMessageElement) => {
        let isValid = true;
        inputElement.classList.remove('invalid');
        if (errorMessageElement) errorMessageElement.textContent = '';

        if (inputElement.hasAttribute('required') && !inputElement.value.trim()) {
            isValid = false;
            inputElement.classList.add('invalid');
            if (errorMessageElement) errorMessageElement.textContent = translations[currentLanguage].requiredField;
        } else if (inputElement.id === 'phone' && inputElement.value.trim() && !/^\+?[0-9]{7,15}$/.test(inputElement.value.trim())) {
            isValid = false;
            inputElement.classList.add('invalid');
            if (errorMessageElement) errorMessageElement.textContent = translations[currentLanguage].invalidPhone;
        }
        return isValid;
    };

    const validateAllCustomerDetails = () => {
        let allValid = true;
        allValid = validateField(fullNameInput, document.getElementById('fullName-error')) && allValid;
        allValid = validateField(phoneInput, document.getElementById('phone-error')) && allValid;
        allValid = validateField(deliveryVillageInput, document.getElementById('deliveryVillage-error')) && allValid;
        allValid = validateField(deliveryWardInput, document.getElementById('deliveryWard-error')) && allValid;
        allValid = validateField(deliveryDistrictInput, document.getElementById('deliveryDistrict-error')) && allValid;
        // Alternate contact is optional, no required validation
        return allValid;
    };

    const checkFormValidityAndEnableButton = () => {
        const customerDetailsValid = validateAllCustomerDetails();
        const paymentMethodSelected = document.querySelector('input[name="paymentMethod"]:checked');
        const paymentDetailsValid = validatePaymentDetails(); // Validate dynamic payment inputs

        if (customerDetailsValid && paymentMethodSelected && paymentDetailsValid) {
            placeOrderBtn.disabled = false;
        } else {
            placeOrderBtn.disabled = true;
        }
    };

    // --- Dynamic Payment Details Display ---
    const renderPaymentDetails = (method) => {
        let html = '';
        promoError.textContent = ''; // Clear promo error when payment method changes

        switch (method) {
            case 'mobileMoney':
                html = `
                    <p>${translations[currentLanguage].mobileMoneyHint}</p>
                    <div class="form-group">
                        <label for="mobileMoneyNumber">${translations[currentLanguage].mobileMoneyNumber} <span class="required">*</span></label>
                        <input type="tel" id="mobileMoneyNumber" name="mobileMoneyNumber" placeholder="e.g., +2557XXXXXXXX" required>
                        <div class="error-message" id="mobileMoneyNumber-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="otpCode">${translations[currentLanguage].otpCode} <span class="required">*</span></label>
                        <input type="text" id="otpCode" name="otpCode" placeholder="Enter OTP" required>
                        <div class="error-message" id="otpCode-error"></div>
                    </div>
                    <p class="hint">${translations[currentLanguage].mobileMoneyFundsHint}</p>
                `;
                break;
            case 'cardPayment':
                html = `
                    <p>${translations[currentLanguage].cardPaymentRedirect}</p>
                    <div class="form-group">
                        <label for="cardNumber">${translations[currentLanguage].cardNumber} <span class="required">*</span></label>
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="XXXX XXXX XXXX XXXX" required>
                        <div class="error-message" id="cardNumber-error"></div>
                    </div>
                    <div class="form-group" style="display: flex; gap: 10px;">
                        <div style="flex: 1;">
                            <label for="expiryDate">${translations[currentLanguage].expiryDate} <span class="required">*</span></label>
                            <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required>
                            <div class="error-message" id="expiryDate-error"></div>
                        </div>
                        <div style="flex: 1;">
                            <label for="cvv">${translations[currentLanguage].cvv} <span class="required">*</span></label>
                            <input type="text" id="cvv" name="cvv" placeholder="XXX" required>
                            <div class="error-message" id="cvv-error"></div>
                        </div>
                    </div>
                `;
                break;
            case 'cashOnDelivery':
                html = `
                    <p>${translations[currentLanguage].cashOnDeliveryInfo}</p>
                    <p class="hint"><strong>${translations[currentLanguage].totalPayable}: TZS ${(totalPayable - promoDiscount).toLocaleString()}</strong></p>
                `;
                break;
            case 'creditFinance':
                html = `
                    <p>${translations[currentLanguage].creditFinanceInfo}</p>
                    <p class="hint">${translations[currentLanguage].creditFinanceHint}</p>
                `;
                break;
        }
        paymentDetailsArea.innerHTML = html;
        // Re-attach event listeners for newly created elements
        attachPaymentDetailsValidationListeners();
        checkFormValidityAndEnableButton(); // Re-check validity after rendering new inputs
    };

    const attachPaymentDetailsValidationListeners = () => {
        const currentInputs = paymentDetailsArea.querySelectorAll('input[required]');
        currentInputs.forEach(input => {
            input.addEventListener('input', () => validateField(input, document.getElementById(`${input.id}-error`)));
            input.addEventListener('change', checkFormValidityAndEnableButton); // For radio/checkbox if any
        });
    };

    const validatePaymentDetails = () => {
        let isValid = true;
        const currentInputs = paymentDetailsArea.querySelectorAll('input[required]');
        currentInputs.forEach(input => {
            if (input.id === 'cardNumber' && input.value.trim() && !/^[0-9]{13,19}$/.test(input.value.trim().replace(/\s/g, ''))) {
                isValid = false;
                input.classList.add('invalid');
                document.getElementById(`${input.id}-error`).textContent = translations[currentLanguage].invalidCardNumber;
            } else if (input.id === 'expiryDate' && input.value.trim() && !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(input.value.trim())) {
                isValid = false;
                input.classList.add('invalid');
                document.getElementById(`${input.id}-error`).textContent = translations[currentLanguage].invalidExpiry;
            } else if (input.id === 'cvv' && input.value.trim() && !/^[0-9]{3,4}$/.test(input.value.trim())) {
                isValid = false;
                input.classList.add('invalid');
                document.getElementById(`${input.id}-error`).textContent = translations[currentLanguage].invalidCvv;
            } else if (input.id === 'mobileMoneyNumber' && input.value.trim() && !/^\+?[0-9]{7,15}$/.test(input.value.trim())) {
                isValid = false;
                input.classList.add('invalid');
                document.getElementById(`${input.id}-error`).textContent = translations[currentLanguage].invalidPhone;
            }
            else {
                isValid = validateField(input, document.getElementById(`${input.id}-error`)) && isValid;
            }
        });
        return isValid;
    };

    // --- Dynamic Delivery Fee Calculation ---
    function fetchDeliveryFee() {
        // BACKEND: Fetch delivery fee based on selected district
        const district = deliveryDistrictInput.value.trim();
        if (!district) return;
        fetch(`/api/delivery-fee?district=${encodeURIComponent(district)}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && typeof data.fee === 'number') {
                    deliveryFee = data.fee;
                    totalPayable = productTotal + deliveryFee;
                    updateOrderSummary();
                }
            })
            .catch(err => {
                console.warn('Delivery fee fetch failed:', err);
            });
    }
    deliveryDistrictInput.addEventListener('change', fetchDeliveryFee);

    // --- Promo Code Validation via Backend ---
    applyPromoBtn.addEventListener('click', () => {
        const promoCode = promoCodeInput.value.trim();
        promoError.textContent = '';
        if (!promoCode) {
            promoDiscount = 0;
            promoError.textContent = translations[currentLanguage].pleaseEnterPromo;
            updateOrderSummary();
            return;
        }
        // BACKEND: Validate promo code via API
        fetch(`/api/promo/validate?code=${encodeURIComponent(promoCode)}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data && data.valid) {
                    promoDiscount = data.discountAmount || 0;
                    alert(`Promo code applied! You saved TZS ${promoDiscount.toLocaleString()}.`);
                } else {
                    promoDiscount = 0;
                    promoError.textContent = translations[currentLanguage].invalidPromo;
                }
                updateOrderSummary();
            })
            .catch(err => {
                promoDiscount = 0;
                promoError.textContent = 'Error validating promo code.';
                updateOrderSummary();
                console.warn('Promo code validation failed:', err);
            });
    });

    // --- Event Listeners ---

    // Customer details form validation on input
    customerDetailsForm.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('input', () => {
            validateField(input, document.getElementById(`${input.id}-error`));
            checkFormValidityAndEnableButton();
        });
    });

    // Initial check for button state
    customerDetailsForm.addEventListener('change', checkFormValidityAndEnableButton);


    // Payment method radio change
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            renderPaymentDetails(event.target.value);
        });
    });

    // Place Order & Pay Button Click
    placeOrderBtn.addEventListener('click', async () => {
        if (!validateAllCustomerDetails() || !validatePaymentDetails()) {
            alert(translations[currentLanguage].fillAllFields);
            return;
        }

        placeOrderBtnText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        placeOrderBtn.disabled = true;

        try {
            const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
            const customerData = {
                fullName: fullNameInput.value.trim(),
                phone: phoneInput.value.trim(),
                deliveryAddress: {
                    village: deliveryVillageInput.value.trim(),
                    ward: deliveryWardInput.value.trim(),
                    district: deliveryDistrictInput.value.trim()
                },
                alternateContact: alternateContactInput.value.trim(),
                paymentMethod: selectedPaymentMethod,
                // Add payment method specific data here (e.g., mobileMoneyNumber, cardNumber, etc.)
                // For a real app, you'd collect these from the dynamic inputs.
            };

            // BACKEND: Submit order and payment details to /api/checkout
            // Expected request: { customerData, productData, promoCode, totalPayable }
            // Expected response: { success: boolean, orderRef?: string, message?: string }
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerData,
                    productData,
                    promoCode: promoCodeInput.value.trim(),
                    totalPayable: totalPayable - promoDiscount
                })
            });
            const data = await response.json();

            if (data.success) {
                orderReferenceSpan.textContent = data.orderRef || 'SHD' + Date.now();
                confirmationScreen.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert(translations[currentLanguage].paymentFailed + (data.message ? (': ' + data.message) : ''));
            }
        } catch (error) {
            console.error('Payment process error:', error);
            alert(translations[currentLanguage].errorOccurred);
        } finally {
            placeOrderBtnText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
            placeOrderBtn.disabled = false;
        }
    });

    // Language Toggle
    const translations = {
        en: {
            pageTitle: "Payment & Checkout",
            orderDetailTitle: "Order Details",
            productPrice: "Price:",
            quantity: "Quantity:",
            estimatedDelivery: "Estimated Delivery:",
            editOrder: "Edit Order",
            customerDetailsTitle: "Customer & Delivery Details",
            fullName: "Full Name",
            phoneNumber: "Phone Number",
            deliveryVillage: "Delivery Village",
            deliveryWard: "Delivery Ward",
            deliveryDistrict: "Delivery District",
            alternateContact: "Alternate Contact (Optional)",
            selectPaymentMethod: "Select Payment Method",
            mobileMoney: "Mobile Money",
            cardPayment: "Card Payment",
            cashOnDelivery: "Cash on Delivery",
            creditViaPartner: "Credit via Partner Finance",
            mobileMoneyHint: "Enter your Mobile Money number to receive an OTP for payment confirmation.",
            mobileMoneyNumber: "Mobile Money Number",
            otpCode: "OTP Code (Will be sent to your number)",
            mobileMoneyFundsHint: "Ensure your mobile money account has sufficient funds.",
            cardPaymentRedirect: "You will be redirected to a secure payment gateway to complete your card transaction.",
            cardNumber: "Card Number",
            expiryDate: "Expiry Date",
            cvv: "CVV",
            cashOnDeliveryInfo: "You will pay cash when your order is delivered. Please have the exact amount ready.",
            creditFinanceInfo: "Your credit application will be processed by our partner finance institution.",
            creditFinanceHint: "This option requires a pre-approved credit limit with Shamba Direct's finance partner.",
            orderSummary: "Order Summary",
            productTotal: "Product Total",
            deliveryFee: "Delivery Fee",
            totalPayable: "Total Payable",
            enterPromoCode: "Enter promo code",
            apply: "Apply",
            placeOrderPay: "Place Order & Pay",
            orderPlacedSuccess: "Order Placed Successfully!",
            orderConfirmed: "Your order has been confirmed.",
            orderReference: "Order Reference:",
            trackMyOrder: "Track My Order",
            returnToDashboard: "Return to Dashboard",
            requiredField: "This field is required.",
            invalidPhone: "Invalid phone number format.",
            invalidPromo: "Invalid promo code.",
            pleaseEnterPromo: "Please enter a promo code.",
            paymentFailed: "Payment failed. Please try again or choose a different method.",
            errorOccurred: "An error occurred during payment. Please try again.",
            invalidCardNumber: "Invalid card number.",
            invalidExpiry: "Format MM/YY.",
            invalidCvv: "Invalid CVV.",
            fillAllFields: "Please fill in all required fields and correct any errors before placing your order."
        },
        sw: {
            pageTitle: "Malipo & Kuagiza",
            orderDetailTitle: "Maelezo ya Agizo",
            productPrice: "Bei:",
            quantity: "Idadi:",
            estimatedDelivery: "Muda wa Makadirio wa Kuletewa:",
            editOrder: "Hariri Agizo",
            customerDetailsTitle: "Maelezo ya Mteja & Usafirishaji",
            fullName: "Jina Kamili",
            phoneNumber: "Namba ya Simu",
            deliveryVillage: "Kijiji cha Usafirishaji",
            deliveryWard: "Wodi ya Usafirishaji",
            deliveryDistrict: "Wilaya ya Usafirishaji",
            alternateContact: "Mawasiliano Mbadala (Si lazima)",
            selectPaymentMethod: "Chagua Njia ya Malipo",
            mobileMoney: "Simu ya Mkononi (Mobile Money)",
            cardPayment: "Malipo kwa Kadi",
            cashOnDelivery: "Malipo Taslimu Wakati wa Kuletewa",
            creditViaPartner: "Mkopo Kupitia Mshirika wa Fedha",
            mobileMoneyHint: "Weka namba yako ya Mobile Money kupokea OTP kwa uthibitisho wa malipo.",
            mobileMoneyNumber: "Namba ya Simu ya Mkononi",
            otpCode: "Msimbo wa OTP (Utatumwa kwa namba yako)",
            mobileMoneyFundsHint: "Hakikisha akaunti yako ya mobile money ina salio la kutosha.",
            cardPaymentRedirect: "Utaelekezwa kwenye lango salama la malipo kukamilisha malipo yako ya kadi.",
            cardNumber: "Namba ya Kadi",
            expiryDate: "Tarehe ya Kumalizika Muda",
            cvv: "CVV",
            cashOnDeliveryInfo: "Utalipa taslimu agizo lako litakapofika. Tafadhali kuwa na kiasi kamili cha fedha tayari.",
            creditFinanceInfo: "Maombi yako ya mkopo yatachakatwa na taasisi yetu ya fedha mshirika.",
            creditFinanceHint: "Chaguo hili linahitaji kikomo cha mkopo kilichoidhinishwa awali na mshirika wa fedha wa Shamba Direct.",
            orderSummary: "Muhtasari wa Agizo",
            productTotal: "Jumla ya Bidhaa",
            deliveryFee: "Ada ya Usafirishaji",
            totalPayable: "Jumla ya Kulipwa",
            enterPromoCode: "Weka msimbo wa ofa",
            apply: "Tumia",
            placeOrderPay: "Agiza & Lipa",
            orderPlacedSuccess: "Agizo Limewekwa kwa Mafanikio!",
            orderConfirmed: "Agizo lako limethibitishwa.",
            orderReference: "Namba ya Marejeleo ya Agizo:",
            trackMyOrder: "Fuatilia Agizo Langu",
            returnToDashboard: "Rudi Kwenye Dashibodi",
            requiredField: "Sehemu hii inahitajika.",
            invalidPhone: "Namba ya simu si sahihi.",
            invalidPromo: "Msimbo wa ofa si sahihi.",
            pleaseEnterPromo: "Tafadhali weka msimbo wa ofa.",
            paymentFailed: "Malipo yameshindwa. Tafadhali jaribu tena au chagua njia nyingine.",
            errorOccurred: "Hitilafu imetokea wakati wa malipo. Tafadhali jaribu tena.",
            invalidCardNumber: "Namba ya kadi si sahihi.",
            invalidExpiry: "Umbizo MM/YY.",
            invalidCvv: "CVV si sahihi.",
            fillAllFields: "Tafadhali jaza sehemu zote zinazohitajika na urekebishe makosa yoyote kabla ya kuweka agizo lako."
        }
    };

    let currentLanguage = 'en'; // Default language

    const setLanguage = (lang) => {
        currentLanguage = lang;
        // Update active class for language toggle buttons
        langEn.classList.toggle('active', lang === 'en');
        langSw.classList.toggle('active', lang === 'sw');

        // Update text content based on selected language
        document.querySelector('.app-header .page-title h1').textContent = translations[lang].pageTitle;
        document.querySelector('.product-summary-card h2').innerHTML = `<i class="ri-shopping-cart-line"></i> ${translations[lang].orderDetailTitle}`;
        document.querySelector('.delivery-info p').innerHTML = `<i class="ri-truck-line"></i> ${translations[lang].estimatedDelivery} <strong>2-3 Business Days</strong>`;
        document.querySelector('.edit-order-btn').innerHTML = `<i class="ri-edit-line"></i> ${translations[lang].editOrder}`;
        document.querySelector('.customer-details-card h2').innerHTML = `<i class="ri-user-line"></i> ${translations[lang].customerDetailsTitle}`;

        document.querySelector('label[for="fullName"]').innerHTML = `${translations[lang].fullName} <span class="required">*</span>`;
        document.getElementById('fullName').placeholder = translations[lang].fullName;

        document.querySelector('label[for="phone"]').innerHTML = `${translations[lang].phoneNumber} <span class="required">*</span>`;
        document.getElementById('phone').placeholder = "e.g., +2557XXXXXXXX";

        document.querySelector('label[for="deliveryVillage"]').innerHTML = `${translations[lang].deliveryVillage} <span class="required">*</span>`;
        document.getElementById('deliveryVillage').placeholder = "e.g., Kijitonyama";

        document.querySelector('label[for="deliveryWard"]').innerHTML = `${translations[lang].deliveryWard} <span class="required">*</span>`;
        document.getElementById('deliveryWard').placeholder = "e.g., Manzese";

        document.querySelector('label[for="deliveryDistrict"]').innerHTML = `${translations[lang].deliveryDistrict} <span class="required">*</span>`;
        document.getElementById('deliveryDistrict').placeholder = "e.g., Kinondoni";

        document.querySelector('label[for="alternateContact"]').textContent = translations[lang].alternateContact;

        document.querySelector('.payment-method-card h2').innerHTML = `<i class="ri-secure-payment-line"></i> ${translations[lang].selectPaymentMethod}`;
        document.querySelector('input[value="mobileMoney"]').nextElementSibling.querySelector('.option-content').childNodes[1].textContent = translations[lang].mobileMoney;
        document.querySelector('input[value="cardPayment"]').nextElementSibling.querySelector('.option-content').childNodes[1].textContent = translations[lang].cardPayment;
        document.querySelector('input[value="cashOnDelivery"]').nextElementSibling.querySelector('.option-content').childNodes[1].textContent = translations[lang].cashOnDelivery;
        document.querySelector('input[value="creditFinance"]').nextElementSibling.querySelector('.option-content').childNodes[1].textContent = translations[lang].creditViaPartner;

        // Re-render payment details to update their text
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        renderPaymentDetails(selectedPaymentMethod);


        document.querySelector('.order-summary-card h2').innerHTML = `<i class="ri-file-list-line"></i> ${translations[lang].orderSummary}`;
        document.querySelector('#summaryProductTotal').previousElementSibling.textContent = translations[lang].productTotal;
        document.querySelector('#summaryDeliveryFee').previousElementSibling.textContent = translations[lang].deliveryFee;
        document.querySelector('#summaryTotalPayable').previousElementSibling.textContent = translations[lang].totalPayable;
        document.getElementById('promoCodeInput').placeholder = translations[lang].enterPromoCode;
        document.getElementById('applyPromoBtn').textContent = translations[lang].apply;
        placeOrderBtnText.innerHTML = `<i class="ri-lock-line"></i> ${translations[lang].placeOrderPay}`;

        // Update confirmation screen text if visible
        if (confirmationScreen.classList.contains('active')) {
            document.querySelector('.confirmation-content h2').textContent = translations[lang].orderPlacedSuccess;
            document.querySelector('.confirmation-content p').textContent = translations[lang].orderConfirmed;
            document.querySelector('#orderReference').previousSibling.textContent = translations[lang].orderReference;
            document.querySelector('.confirmation-actions .btn-primary').innerHTML = `<i class="ri-truck-line"></i> ${translations[lang].trackMyOrder}`;
            document.querySelector('.confirmation-actions .btn-secondary').innerHTML = `<i class="ri-dashboard-line"></i> ${translations[lang].returnToDashboard}`;
        }
        // Update error messages if any are visible - re-run validation to update messages
        validateAllCustomerDetails();
        validatePaymentDetails();
        if (promoError.textContent) { // If promo error is currently displayed
            if (promoCodeInput.value.trim() && promoDiscount === 0) {
                promoError.textContent = translations[lang].invalidPromo;
            } else if (!promoCodeInput.value.trim()) {
                promoError.textContent = translations[lang].pleaseEnterPromo;
            }
        }
    };


    langEn.addEventListener('click', () => setLanguage('en'));
    langSw.addEventListener('click', () => setLanguage('sw'));


    // --- Initialization ---
    // These calls should happen after all functions and variables are defined
    updateOrderSummary(); // Set initial total based on productData
    renderPaymentDetails('mobileMoney'); // Render default payment method
    checkFormValidityAndEnableButton(); // Initial check for button state
    setLanguage('en'); // Set default language on load
});