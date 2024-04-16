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
                /*!document.querySelector("#imagem").addEventListener("change", function() {
            console.log(this.files);
        }) */
        localStorage.setItem('ls_full_name',name);
        localStorage.setItem('ls_email',email);
        localStorage.setItem('ls_phone',phone);
        localStorage.setItem('ls_region',region);
        localStorage.setItem('ls_profession',profession);


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