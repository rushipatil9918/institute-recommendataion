const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentEmail = document.getElementById('email').value;
    const password = document.getElementById('psw').value;
    const passwordRepeat = document.getElementById('psw-repeat').value;

    if (password !== passwordRepeat) {
        alert('Passwords do not match');
        return;
    }

    const backendUrl = 'http://localhost:5500/api/student';
    const response = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentName, studentEmail, password }),
        credentials: 'include' 
    });

    const data = await response.json();

    if (data.message === 'Account created') {
        alert('Registration successful!');
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
    } else {
        alert(`Registration failed: ${data.message}`);
    }
});





