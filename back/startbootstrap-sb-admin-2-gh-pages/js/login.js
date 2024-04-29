document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.btn-user.btn-block');
    loginButton.addEventListener("click", function(event) {
        event.preventDefault();

        const email = document.getElementById("exampleInputEmail").value.trim();
        const password = document.getElementById("exampleInputPassword").value.trim();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful!");
            // Combine first name and last name and save in local storage
            const fullName = user.firstName + ' ' + user.lastName;
            localStorage.setItem('loggedInUser', JSON.stringify({ name: fullName, email: user.email }));
            window.location.href = 'index.html'; // Redirect to a specific page

            const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name) {
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = storedUser.name;
    }
        } else {
            alert("Invalid credentials!");
        }
    });
});