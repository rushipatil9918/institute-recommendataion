const loginForm = document.getElementById('login-form');


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPsw = document.getElementById('loginPsw').value;

    const backendUrl = 'http://localhost:5500/api/student';
    const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentEmail: loginEmail, password: loginPsw }),
        credentials: 'include' 
    });
    
    const data = await response.json();
    
    if (data.message === 'Login successful!') {
        alert('Login successful!');
        // Save the token to local storage
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
    } else {
        alert(`Login failed: ${data.message}`);
    }
    
});