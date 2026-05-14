document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const course = document.getElementById('course');
    const successMessage = document.getElementById('successMessage');

    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    function showError(input, errorElementId, message) {
        const errorElement = document.getElementById(errorElementId);
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
    }

    function showSuccess(input, errorElementId) {
        const errorElement = document.getElementById(errorElementId);
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
    }

    function validateField(input, errorElementId, validationFn, errorMessage) {
        if (!validationFn(input.value.trim())) {
            showError(input, errorElementId, errorMessage);
            return false;
        } else {
            showSuccess(input, errorElementId);
            return true;
        }
    }

    // Validation functions
    const isNotEmpty = value => value !== '';
    const isValidEmail = value => emailPattern.test(value);
    const isValidPhone = value => phonePattern.test(value);

    // Real-time validation
    fullName.addEventListener('input', () => validateField(fullName, 'nameError', isNotEmpty, 'Full name is required.'));
    email.addEventListener('input', () => {
        if (!isNotEmpty(email.value.trim())) {
            showError(email, 'emailError', 'Email address is required.');
        } else {
            validateField(email, 'emailError', isValidEmail, 'Please enter a valid email address.');
        }
    });
    phone.addEventListener('input', () => {
        if (!isNotEmpty(phone.value.trim())) {
            showError(phone, 'phoneError', 'Phone number is required.');
        } else {
            validateField(phone, 'phoneError', isValidPhone, 'Please enter a valid 10-digit phone number.');
        }
    });
    course.addEventListener('change', () => validateField(course, 'courseError', isNotEmpty, 'Please select a course.'));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields on submit
        const isNameValid = validateField(fullName, 'nameError', isNotEmpty, 'Full name is required.');
        
        let isEmailValid = false;
        if (!isNotEmpty(email.value.trim())) {
            showError(email, 'emailError', 'Email address is required.');
        } else {
            isEmailValid = validateField(email, 'emailError', isValidEmail, 'Please enter a valid email address.');
        }

        let isPhoneValid = false;
        if (!isNotEmpty(phone.value.trim())) {
            showError(phone, 'phoneError', 'Phone number is required.');
        } else {
            isPhoneValid = validateField(phone, 'phoneError', isValidPhone, 'Please enter a valid 10-digit phone number.');
        }

        const isCourseValid = validateField(course, 'courseError', isNotEmpty, 'Please select a course.');

        if (isNameValid && isEmailValid && isPhoneValid && isCourseValid) {
            // Simulate form submission
            successMessage.classList.remove('hidden');
            form.reset();
            
            // Remove success classes
            [fullName, email, phone, course].forEach(input => {
                input.classList.remove('success');
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }
    });
});
