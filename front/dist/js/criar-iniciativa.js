function storeFormData() {
    const form = document.getElementById('inscricaoForm');
    
    const localidade = form.querySelector('#localidade').value.trim();
    const data = form.querySelector('#data').value.trim();
    const titulo = form.querySelector('#titulo').value.trim();
    const duracao = form.querySelector('#duracao').value.trim();
    const descricao = form.querySelector('#descricao').value.trim();

    // Storing file data is tricky because Local Storage cannot directly store files.
    // Instead, you can convert the file to a Base64 string and store it, but this has limits.
    const fileInput = form.querySelector('#imagem');
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileData = e.target.result; // Base64 string
            localStorage.setItem('imagem', fileData);
        };
        reader.readAsDataURL(fileInput.files[0]); // Convert file to Base64
    }

    localStorage.setItem('localidade', localidade);
    localStorage.setItem('data', data);
    localStorage.setItem('titulo', titulo);
    localStorage.setItem('duracao', duracao);
    localStorage.setItem('descricao', descricao);

    // Display success or error message
    const successMessage = document.getElementById('submitSuccessMessage');
    const errorMessage = document.getElementById('submitErrorMessage');
    if (localidade && data && titulo && duracao && descricao) {
        successMessage.classList.remove('d-none');
        errorMessage.classList.add('d-none');
    } else {
        successMessage.classList.add('d-none');
        errorMessage.classList.remove('d-none');
    }
}