document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    const form = document.getElementById('inscricaoForm');
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const region = form.querySelector('#region').value.trim();

    // Validate required fields
    if (!name || !email || !phone || !region) {
        document.getElementById('errorMessage').classList.remove('d-none');
        document.getElementById('successMessage').classList.add('d-none');
    } else {
        document.getElementById('errorMessage').classList.add('d-none');
        document.getElementById('successMessage').classList.remove('d-none');

        // Form data as an object with role set to "gestor_terreno"
        const gestor = {
            name: name,
            email: email,
            phone: phone,
            region: region,
            profession: "Gestor_Terreno" // Explicitly setting the role for clarity
        };

        // Retrieve the existing array of gestor data from local storage or initialize it if not present
        const gestores = JSON.parse(localStorage.getItem('gestores')) || [];
        gestores.push(gestor);
        localStorage.setItem('gestores', JSON.stringify(gestores));
        // Additionally, add to general users array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            email: email,
            password: "password", // Note: Storing passwords in local storage is not recommended
            profession: "Gestor_Terreno"
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // Save updated users array in local storage

        // Optionally clear all inputs after successful registration
        form.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    }
});

// Load user information on DOMContentLoaded if available
document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name && storedUser.role) {
        const displayName = `${storedUser.name} (${storedUser.role})`;
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = displayName;
    }
});

