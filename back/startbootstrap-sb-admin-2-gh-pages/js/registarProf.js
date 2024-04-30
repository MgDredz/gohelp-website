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
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.remove('d-none');
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('d-none');
    } else {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.add('d-none');
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('d-none');

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

        // Add the new form data to the array
        profissionais.push(profs);

        // Save the updated array back to local storage
        localStorage.setItem('profissionais', JSON.stringify(profissionais));

        // Clear all inputs
        form.querySelectorAll('input[type=text], input[type=email], input[type=tel], input[type=reg], input[type=file]').forEach(input => {
            input.value = '';
        });
        form.querySelectorAll('input[type=radio]').forEach(radio => {
            radio.checked = false;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name) {
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = storedUser.name;
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