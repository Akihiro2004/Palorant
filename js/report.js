document.getElementById('bugReportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('input, select, textarea');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
    inputElements.forEach(element => {
        element.classList.remove('error-active');
    });

    let isValid = true;

    const username = document.getElementById('username');
    if (!username.value.trim()) {
        document.getElementById('usernameError').textContent = 'Username must be filled.';
        document.getElementById('usernameError').style.display = 'block';
        username.classList.add('error-active');
        isValid = false;
    } else if (username.value.length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long';
        document.getElementById('usernameError').style.display = 'block';
        username.classList.add('error-active');
        isValid = false;
    } else {
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username.value)) {
            document.getElementById('usernameError').textContent = 'Username can only contain letters, numbers, and underscores';
            document.getElementById('usernameError').style.display = 'block';
            username.classList.add('error-active');
            isValid = false;
        }
    }

    const email = document.getElementById('email');
    if (!email.value.trim()) {
        document.getElementById('emailError').textContent = 'Email must be filled.';
        document.getElementById('emailError').style.display = 'block';
        email.classList.add('error-active');
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            document.getElementById('emailError').style.display = 'block';
            email.classList.add('error-active');
            isValid = false;
        }
    }

    const server = document.getElementById('server');
    if (!server.value) {
        document.getElementById('serverError').textContent = 'Choose a server.';
        document.getElementById('serverError').style.display = 'block';
        server.classList.add('error-active');
        isValid = false;
    }

    const description = document.getElementById('description');
    if (!description.value.trim()) {
        document.getElementById('descriptionError').textContent = 'Description must be filled.';
        document.getElementById('descriptionError').style.display = 'block';
        description.classList.add('error-active');
        isValid = false;
    } else if (description.value.length < 30) {
        document.getElementById('descriptionError').textContent = 'Please provide a detailed description (minimum 30 characters)';
        document.getElementById('descriptionError').style.display = 'block';
        description.classList.add('error-active');
        isValid = false;
    }

    const permission = document.getElementById('permission');
    if (!permission.checked) {
        document.getElementById('permissionError').textContent = 'You must agree to receive follow-up emails.';
        document.getElementById('permissionError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('bugReportForm').reset();
        document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }
});

const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('error-active')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    field.classList.remove('error-active');
    errorElement.style.display = 'none';
    
    if (field.value.trim() === '' && field.type !== 'checkbox') {
        errorElement.textContent = `${field.id.charAt(0).toUpperCase() + field.id.slice(1)} must be filled.`;
        errorElement.style.display = 'block';
        field.classList.add('error-active');
    }
}