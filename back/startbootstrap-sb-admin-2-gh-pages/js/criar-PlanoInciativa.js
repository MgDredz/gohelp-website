document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name) {
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = storedUser.name;
    }

    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const id = getQueryParameter('id');

    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedido = pedidos.find(p => p.id == id);

    if (pedido) {
        document.getElementById('titulo').value = pedido.titulo;
        document.getElementById('type').value = pedido.type;
        document.getElementById('localidade').value = pedido.localidade;
        document.getElementById('region').value = pedido.region;
        document.getElementById('data').value = pedido.data;
        document.getElementById('horaInicio').value = pedido.horaInicio;
        document.getElementById('horaFim').value = pedido.horaFim;
        document.getElementById('descricao').value = pedido.descricao;
    }

    const form = document.getElementById('inscricaoForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value.trim();
        const type = document.getElementById('type').value.trim();
        const localidade = document.getElementById('localidade').value.trim();
        const region = document.getElementById('region').value.trim();
        const data = document.getElementById('data').value;
        const horaInicio = document.getElementById('horaInicio').value;
        const horaFim = document.getElementById('horaFim').value;
        const descricao = document.getElementById('descricao').value.trim();
        const imagemFile = document.getElementById('imagem').files[0];

        const successMessage = document.getElementById('submitSuccessMessage');
        const errorMessage = document.getElementById('submitErrorMessage');

        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        if (!titulo || !type || !localidade || !region || !data || !horaInicio || !horaFim || !descricao || !imagemFile) {
            errorMessage.classList.remove('d-none');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imagem = e.target.result;

            const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];

            let newId = 1;
            if (initiatives.length > 0) {
                const maxId = Math.max(...initiatives.map(i => i.id || 0));
                newId = maxId + 1;
            }

            const initiative = {
                id: newId,
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
                materiais: [],
                profissionais: []
            };

            initiatives.push(initiative);
            localStorage.setItem('initiatives', JSON.stringify(initiatives));

            const index = pedidos.findIndex(p => p.id == id);
            if (index !== -1) {
                pedidos[index].estado = 'aceite';
                localStorage.setItem('pedidos', JSON.stringify(pedidos));
            }

            successMessage.classList.remove('d-none');
            errorMessage.classList.add('d-none');
            form.reset();
        };

        reader.readAsDataURL(imagemFile);
    });
});