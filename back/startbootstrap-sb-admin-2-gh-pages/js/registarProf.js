document.getElementById("myButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    const form = document.getElementById('inscricaoForm');
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const region = form.querySelector('#region').value.trim();
    const professionChecked = form.querySelector('input[name="profession"]:checked');

    // Validate required fields
    if (!name || !email || !phone || !region || !professionChecked) {
        document.getElementById('errorMessage').classList.remove('d-none');
        document.getElementById('successMessage').classList.add('d-none');
    } else {
        document.getElementById('errorMessage').classList.add('d-none');
        document.getElementById('successMessage').classList.remove('d-none');

        // Form data as an object
        const profs = {
            name: name,
            email: email,
            phone: phone,
            region: region,
            profession: professionChecked ? professionChecked.value : ''
        };

        // Retrieve the existing array of form data from local storage or initialize it if not present
        const profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
        profissionais.push(profs); // Add the new form data to the array
        localStorage.setItem('profissionais', JSON.stringify(profissionais)); // Save the updated array back to local storage

        // Additionally, add to general users array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            email: email,
            password: "password",
            profession: professionChecked.value
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // Save updated users array in local storage

        // Clear all inputs
        form.querySelectorAll('input').forEach(input => {
            input.value = '';
            if (input.type === 'radio') input.checked = false;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name && storedUser.role) {
        const displayName = `${storedUser.name} (${storedUser.role})`;
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = displayName;
    }
});

// Function to load data from local storage when the page loads
/* window.onload = function loadData() {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
        document.querySelector('#name').value = storedData.name;
        document.querySelector('#email').value = storedData.email;
        document.querySelector('#phone').value = storedData.phone;
        document.querySelector('#region').value = storedData.region;
        var profession = storedData.profession;
        document.querySelector('input[name="profession"][value="' + profession + '"]').checked = true;
    }
}; */