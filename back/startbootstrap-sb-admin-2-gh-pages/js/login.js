document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.btn-user.btn-block'); // Assuming the login button has these classes
    loginButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default submission of form

        const email = document.getElementById("exampleInputEmail").value.trim();
        const password = document.getElementById("exampleInputPassword").value.trim();

        // Retrieve users data from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Validate credentials
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Login success
            alert("Login successful!");
            // Here you can redirect the user to another page or perform other actions on successful login
            window.location.href = 'index.html'; // Redirect to a specific page
        } else {
            // Login failed
            alert("Invalid credentials!");
        }
    });
});