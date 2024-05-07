document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name && storedUser.role) {
        const displayName = `${storedUser.name} (${storedUser.role})`;
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = displayName;
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

    // Update the Profissionais table with predefined professions
    function updateProfissionaisTable() {
        const professions = ["Ajudante", "Advogado", "Gestor de Seguros"];
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = ''; // Clear existing rows
    
        professions.forEach(prof => {
            const row = document.createElement('tr');
    
            const funcaoCell = document.createElement('td');
            funcaoCell.textContent = prof; // Use profession directly from the array
            row.appendChild(funcaoCell);
    
            const qtdCell = document.createElement('td');
            const qtdInput = document.createElement('input');
            qtdInput.type = 'number';
            qtdInput.value = 0; // Default value, modify as necessary
            qtdInput.min = 0;
            qtdInput.classList.add('qtd-input'); // Add custom class here
            qtdInput.addEventListener('input', () => {
                // Handle quantity input change, e.g., update local storage or other logic
            });
            qtdCell.appendChild(qtdInput);
            row.appendChild(qtdCell);
    
            tableBody.appendChild(row);
        });
    }

    updateProfissionaisTable(); // Call the function to update the table

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
        const dateInput = document.getElementById('data');
        const horaInicioInput = document.getElementById('horaInicio');
        const horaFimInput = document.getElementById('horaFim');

        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
        dateInput.setCustomValidity('');
        horaInicioInput.setCustomValidity('');
        horaFimInput.setCustomValidity('');

        // Date validation: Ensure the date is at least one day in the future
        const selectedDate = new Date(data);
        const today = new Date();
        today.setDate(today.getDate() + 1); // Add one day

        if (!titulo || !type || !localidade || !region || !data || !horaInicio || !horaFim || !descricao || !imagemFile) {
            errorMessage.classList.remove('d-none');
            return;
        }

        if (selectedDate < today) {
            dateInput.setCustomValidity('Data já ultrapassada');
            dateInput.reportValidity();
            return;
        }

        // Time validation: Ensure horaFim is after horaInicio
        const horaInicioDate = new Date(`1970-01-01T${horaInicio}:00`);
        const horaFimDate = new Date(`1970-01-01T${horaFim}:00`);

        if (horaFimDate <= horaInicioDate) {
            horaFimInput.setCustomValidity('Hora de Fim deve ser depois de Hora de Início');
            horaFimInput.reportValidity(); // Show validation message
            return;
        }

        // Validate based on region-specific rules
        const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
        const sameDayInitiatives = initiatives.filter(initiative => initiative.data === data && initiative.region === region);

        if (region === 'Norte' || region === 'Lisboa') {
            if (sameDayInitiatives.length >= 3 || sameDayInitiatives.some(initiative => initiative.type === type)) {
                errorMessage.textContent = 'Não pode haver mais de 3 iniciativas na mesma data ou já existe uma iniciativa com o mesmo tipo.';
                errorMessage.classList.remove('d-none');
                return;
            }
        } else if (region === 'Centro' || region === 'Algarve') {
            if (sameDayInitiatives.length >= 2 || sameDayInitiatives.some(initiative => initiative.type === type)) {
                errorMessage.textContent = 'Não pode haver mais de 2 iniciativas na mesma data ou já existe uma iniciativa com o mesmo tipo.';
                errorMessage.classList.remove('d-none');
                return;
            }
        } else if (region === 'Alentejo') {
            if (sameDayInitiatives.length >= 1) {
                errorMessage.textContent = 'Não pode haver mais de 1 iniciativa na mesma data no Alentejo.';
                errorMessage.classList.remove('d-none');
                return;
            }
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imagem = e.target.result;

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



