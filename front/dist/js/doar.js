document.getElementById('donationForm').onsubmit = function(e) {
    e.preventDefault(); // Prevent actual form submission
    var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {
        keyboard: false
    });
    myModal.show();
};
