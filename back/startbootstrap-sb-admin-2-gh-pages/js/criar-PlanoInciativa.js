document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inscricaoForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form elements
        const localidade = document.getElementById('localidade').value.trim();
        const data = document.getElementById('data').value;
        const titulo = document.getElementById('titulo').value.trim();
        const duracao = document.getElementById('duracao').value.trim();
        const imagem = document.getElementById('imagem').files[0]; // Handling file input
        const descricao = document.getElementById('descricao').value.trim();

        // Message elements
        const successMessage = document.getElementById('submitSuccessMessage');
        const errorMessage = document.getElementById('submitErrorMessage');

        // Hide previous messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        // Simple validation check
        if (!localidade || !data || !titulo || !duracao || !descricao || !imagem) {
            errorMessage.classList.remove('d-none');
            return;
        }

        // Create initiative object
        const initiative = {
            localidade: localidade,
            data: data,
            titulo: titulo,
            duracao: duracao,
            descricao: descricao,
            imagem: imagem.name // Storing the filename; handle file separately
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
    });
});