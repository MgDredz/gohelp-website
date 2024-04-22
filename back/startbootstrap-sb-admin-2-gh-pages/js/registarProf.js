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
        // Show error message
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.remove('d-none');
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('d-none');
    } else {
        // Hide error message
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.add('d-none');

        // Display success message
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('d-none');

        // Save data to local storage
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('region', region);
        localStorage.setItem('profession', professionChecked.value);

        // Clear all text inputs and file input
        form.querySelectorAll('input[type=text], input[type=email], input[type=tel], input[type=reg], input[type=file]').forEach(input => {
            input.value = '';
        });

        // Reset radio buttons
        form.querySelectorAll('input[type=radio]').forEach(radio => {
            radio.checked = false;
        });
    }
});

// Function to load data from local storage when the page loads
window.onload = function loadData() {
    if (localStorage.getItem('name')) {
        document.querySelector('#name').value = localStorage.getItem('name');
    }
    if (localStorage.getItem('email')) {
        document.querySelector('#email').value = localStorage.getItem('email');
    }
    if (localStorage.getItem('phone')) {
        document.querySelector('#phone').value = localStorage.getItem('phone');
    }
    if (localStorage.getItem('region')) {
        document.querySelector('#region').value = localStorage.getItem('region');
    }
    if (localStorage.getItem('profession')) {
        var profession = localStorage.getItem('profession');
        document.querySelector('input[name="profession"][value="' + profession + '"]').checked = true;
    }
};