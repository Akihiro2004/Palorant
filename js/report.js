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
        showError('username', 'Username must be filled.');
        isValid = false;
    } else if (username.value.length < 3) {
        showError('username', 'Username must be at least 3 characters long');
        isValid = false;
    } else {
        let isValidUsername = true;
        const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
        for (let char of username.value) {
            if (!validChars.includes(char)) {
                isValidUsername = false;
                break;
            }
        }
        if (!isValidUsername) {
            showError('username', 'Username can only contain letters, numbers, and underscores');
            isValid = false;
        }
    }

    const email = document.getElementById('email');
    if (!email.value.trim()) {
        showError('email', 'Email must be filled.');
        isValid = false;
    } else {
        const atIndex = email.value.indexOf('@');
        const dotIndex = email.value.lastIndexOf('.');
        const hasSpace = email.value.includes(' ');
        
        if (atIndex === -1 ||
            dotIndex === -1 ||
            atIndex === 0 ||
            dotIndex <= atIndex + 1 ||
            dotIndex === email.value.length - 1 ||
            hasSpace) { // No spaces allowed
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
    }

    const server = document.getElementById('server');
    if (!server.value) {
        showError('server', 'Choose a server.');
        isValid = false;
    }

    const description = document.getElementById('description');
    if (!description.value.trim()) {
        showError('description', 'Description must be filled.');
        isValid = false;
    } else if (description.value.length < 30) {
        showError('description', 'Please provide a detailed description (minimum 30 characters)');
        isValid = false;
    }

    const permission = document.getElementById('permission');
    if (!permission.checked) {
        showError('permission', 'You must agree to receive follow-up emails.');
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

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const field = document.getElementById(fieldId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    if (field) {
        field.classList.add('error-active');
    }
}

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
        showError(field.id, `${field.id.charAt(0).toUpperCase() + field.id.slice(1)} must be filled.`);
    }
}