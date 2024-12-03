document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            
            const response = await fetch('http://15.206.133.74/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

           
            if (response.ok) {
                alert(`Login successful! Welcome, ${result.data.name}`);
                console.log('Token:', result.data.token);
                console.log('User ID:', result.data.id);

                
                localStorage.setItem('authToken', result.data.token);
                localStorage.setItem('userName', result.data.name);
                localStorage.setItem('userId', result.data.id);

            
            } else {
                alert("result.message || 'Login failed. Please try again."');
                console.error('Error response:', result);
            }
        } catch (error) {
            console.error('Network or server error:', error);
            alert(`CORS Issue:
                Requests to the API (http://15.206.133.74/user/login) are currently blocked due to a CORS policy issue. The backend server must include the Access-Control-Allow-Origin header in its responses to resolve this issue.
                `);
        }
    });
});
