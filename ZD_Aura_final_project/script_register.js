document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('multiStepForm');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const formSteps = document.querySelectorAll('.form-step');

    let currentStep = 0;

    // Helper: Create or update error messages
    function showError(input, message) {
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            input.insertAdjacentElement('afterend', errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.color = 'red';  // Red color for error message
    }

    function clearError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }

    // Validation Functions
    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            showError(input, 'Please enter a valid email address.');
            return false;
        }

        // Check if email already exists
        const existingData = JSON.parse(localStorage.getItem('registrations')) || [];
        const emailExists = existingData.some(registration => registration.email === input.value);

        if (emailExists) {
            showError(input, 'An account with this email already exists.');
            return false;
        }

        clearError(input);
        return true;
    }

    function validateCity(input) {
        if (!input.value.trim()) {
            showError(input, 'City is required.');
            return false;
        }
        clearError(input);
        return true;
    }

    function validatePhoneNumber(input) {
        const phoneRegex = /^\d{11,}$/; // Minimum 11 digits
        if (!phoneRegex.test(input.value)) {
            showError(input, 'Phone number must be at least 11 digits long.');
            return false;
        }
        clearError(input);
        return true;
    }

    function validateRequired(input) {
        if (!input.value.trim()) {
            showError(input, 'This field is required.');
            return false;
        }
        clearError(input);
        return true;
    }

    function validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            showError(document.getElementById('confirmPassword'), 'Passwords do not match.');
            return false;
        }
        clearError(document.getElementById('confirmPassword'));
        return true;
    }

    function validateStep(stepIndex) {
        const currentInputs = formSteps[stepIndex].querySelectorAll('input, textarea');
        let allValid = true;

        currentInputs.forEach(input => {
            if (input.required) {
                if (!validateRequired(input)) allValid = false;
            }
            if (input.type === 'email') {
                if (!validateEmail(input)) allValid = false;
            }
            if (input.name === 'phone') {
                if (!validatePhoneNumber(input)) allValid = false;
            }
            if (input.name === 'city') {
                if (!validateCity(input)) allValid = false;
            }
            if (input.name === 'confirmPassword') {
                if (!validatePasswordMatch()) allValid = false;
            }
        });

        return allValid;
    }

    // Display the appropriate step
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });

        prevBtn.disabled = stepIndex === 0;
        nextBtn.style.display = stepIndex === formSteps.length - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = stepIndex === formSteps.length - 1 ? 'inline-block' : 'none';

        // Show login prompt in step 1
        const loginPrompt = document.getElementById('loginPrompt');
        if (stepIndex === 0 && loginPrompt) {
            loginPrompt.style.display = 'block';
        } else if (loginPrompt) {
            loginPrompt.style.display = 'none';
        }
    }

    // Go to the next step
    nextBtn.addEventListener('click', () => {
        // First, validate password match before proceeding
        if (!validatePasswordMatch()) {
            return; // If passwords don't match, prevent moving to the next step
        }

        // Now, validate the rest of the step
        if (validateStep(currentStep) && currentStep < formSteps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });

    // Go to the previous step
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validate the final step before submitting the form
        if (!validateStep(currentStep)) {
            return;
        }

        // Collect form data
        const formData = Object.fromEntries(new FormData(form));
        formData.isLoggedIn = true;  // Set user as logged in

        // Retrieve existing registrations
        const existingData = JSON.parse(localStorage.getItem('registrations')) || [];

        // Check for duplicate email (final check at submission)
        const emailExists = existingData.some(registration => registration.email === formData.email);
        if (emailExists) {
            const emailInput = form.querySelector('input[name="email"]');
            showError(emailInput, 'An account with this email already exists.');
            return;
        }

        // Add new registration data
        existingData.push(formData);

        // Save updated data back to localStorage
        localStorage.setItem('registrations', JSON.stringify(existingData));

        // Set isLoggedIn to true in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to profile page
        window.location.href = "profile.html"; // Ensure this is the correct page for the user's profile
    });

    // Handle login button click
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Initialize
    showStep(currentStep);
});
