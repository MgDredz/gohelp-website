document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name) {
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = storedUser.name;
    }

    const form = document.getElementById('inscricaoForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form elements
        const titulo = document.getElementById('titulo').value.trim();
        const type = document.getElementById('type').value.trim();
        const localidade = document.getElementById('localidade').value.trim();
        const region = document.getElementById('region').value.trim();
        const data = document.getElementById('data').value;
        const horaInicio = document.getElementById('horaInicio').value;
        const horaFim = document.getElementById('horaFim').value;
        const descricao = document.getElementById('descricao').value.trim();
        const imagemFile = document.getElementById('imagem').files[0];

        // Message elements
        const successMessage = document.getElementById('submitSuccessMessage');
        const errorMessage = document.getElementById('submitErrorMessage');

        // Hide previous messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        // Simple validation check
        if (!titulo || !type || !localidade || !region || !data || !horaInicio || !horaFim || !descricao || !imagemFile) {
            errorMessage.classList.remove('d-none');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imagem = e.target.result;

            // Create initiative object
            const initiative = {
                titulo: titulo,
                type: type,
                localidade: localidade,
                region: region,
                data: data,
                horaInicio: horaInicio,
                horaFim: horaFim,
                descricao: descricao,
                imagem: imagem,
                participantes: 0,
                doacoes: 0,
            };

            // Retrieve the existing initiatives array from local storage or initialize it if not present
            const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];

            // Add the new initiative to the array
            initiatives.push(initiative);

            // Save the updated array back to local storage
            localStorage.setItem('initiatives', JSON.stringify(initiatives));

            // Show success message and hide error message
            successMessage.classList.remove('d-none');
            errorMessage.classList.add('d-none');

            // Optionally, reset the form after a successful submission
            form.reset(); // Resets the form after submission
        };

        reader.readAsDataURL(imagemFile);
    });
});
