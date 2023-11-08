// const token = localStorage.getItem('token');

// const response = await fetch(`${backendUrl}/some-endpoint`, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//     },
//     credentials: 'include' 
// });

// const responseData = await response.json();


//code to pass token with request




const percentileForm = document.getElementById('percentile-input-form');


percentileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const percentile = document.getElementById('percentile').value;

    const backendUrl = 'http://localhost:5500/api/find';
    const response = await fetch(`${backendUrl}/college`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ marks: percentile }),
        credentials: 'include' 
    });
    
    const data = await response.json();
    console.log(data)
    if (response.status === 200) {

        document.writeln(JSON.stringify(data))
    } else {
        alert(`Sorry some error: ${data.message}`);
    }
    
});