document.getElementById("myButton").addEventListener("click", function(event) {
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
        };

        // Retrieve the existing array of form data from local storage or initialize it if not present
        const gestores = JSON.parse(localStorage.getItem('gestores_terreno')) || [];

        // Add the new gestor data to the array
        gestores.push(gestor);

        // Save the updated array back to local storage
        localStorage.setItem('gestores_terreno', JSON.stringify(gestores));

        // Optionally clear all inputs after successful registration
        form.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    }
});

// Load user information on DOMContentLoaded if available
document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name) {
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = storedUser.name;
    }
});