document.getElementById('bugReportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });

    let isValid = true;

    const username = document.getElementById('username').value;
    if (username.length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long';
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    } else {
        let hasSpecialChars = false;
        for (let char of username) {
            if (!(char >= 'a' && char <= 'z') && 
                !(char >= 'A' && char <= 'Z') && 
                !(char >= '0' && char <= '9') && 
                char !== '_') {
                hasSpecialChars = true;
                break;
            }
        }
        if (hasSpecialChars) {
            document.getElementById('usernameError').textContent = 'Username can only contain letters, numbers, and underscores';
            document.getElementById('usernameError').style.display = 'block';
            isValid = false;
        }
    }

    const email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.') || email.indexOf('@') > email.lastIndexOf('.')) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    const server = document.getElementById('server').value;
    if (!server) {
        document.getElementById('serverError').textContent = 'Please select a server';
        document.getElementById('serverError').style.display = 'block';
        isValid = false;
    }

    const description = document.getElementById('description').value;
    if (description.length < 30) {
        document.getElementById('descriptionError').textContent = 'Please provide a detailed description (minimum 30 characters)';
        document.getElementById('descriptionError').style.display = 'block';
        isValid = false;
    }

    const permission = document.getElementById('permission');
    if (!permission.checked) {
        document.getElementById('permissionError').textContent = 'Please agree to receive follow-up emails';
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