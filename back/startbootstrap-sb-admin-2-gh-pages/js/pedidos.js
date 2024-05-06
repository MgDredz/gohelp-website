document.addEventListener('DOMContentLoaded', () => {
    displayRequests();
    displayOpenRequestsCount();

    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name) {
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = storedUser.name;
    }
});

function displayRequests(page = 1) {
    const itemsPerPage = 5;
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    // Filter only "pendente" requests
    const filteredPedidos = pedidos.filter(pedido => pedido.estado === 'pendente');

    const listGroup = document.querySelector('.list-group');

    // Calculate pagination
    const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Clear existing content
    listGroup.innerHTML = '';

    filteredPedidos.slice(start, end).forEach(pedido => {
        const requestElement = createRequestElement(pedido);
        listGroup.appendChild(requestElement);
    });

    updatePagination(totalPages, page);
}

function createRequestElement(pedido) {
    const listItem = document.createElement('div');
    listItem.className = 'list-group-item list-group-item-action flex-column align-items-start mb-2';
    listItem.setAttribute('data-id', pedido.id);

    listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${pedido.titulo}</h5>
            <small class="text-muted">
                <a href="#" class="details-link2" data-toggle="modal" onclick="showDetails(${pedido.id})">Mais Detalhes</a>
            </small>
        </div>
        <p class="mb-2"></p>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-success" onclick="approveRequest(${pedido.id})">Aprovar</button>
        </div>
        <div class="btn-group" role="group">    
            <button type="button" class="btn btn-danger" onclick="rejectRequest(${pedido.id})">Rejeitar</button>
        </div>
    `;

    return listItem;
}

function showDetails(id) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedido = pedidos.find(item => item.id === id);

    if (!pedido) return;

    const modalBody = document.querySelector('#detailsModal .modal-body');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <p><strong>Localidade:</strong> ${pedido.localidade}</p>
                <p><strong>Data:</strong> ${pedido.data}</p>
                <p><strong>Título:</strong> ${pedido.titulo}</p>
                <p><strong>Hora Início:</strong> ${pedido.horaInicio}</p>
                <p><strong>Hora Fim:</strong> ${pedido.horaFim}</p>
                <p><strong>Email:</strong> ${pedido.email}</p>
                <p><strong>Descrição:</strong> ${pedido.descricao}</p>
            </div>
            <div class="col-md-6">
                <img src="${pedido.imagem}" class="img-fluid" alt="Evento">
            </div>
        </div>
    `;

    $('#detailsModal').modal('show');
}

function approveRequest(id) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const index = pedidos.findIndex(item => item.id === id);

    if (index !== -1) {
        pedidos[index].estado = 'aceite'; // Set status to "aceite"
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        displayRequests(); // Refresh the requests display
        displayOpenRequestsCount(); // Update the count of open requests
    }
}

function rejectRequest(id) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const index = pedidos.findIndex(item => item.id === id);

    if (index !== -1) {
        pedidos[index].estado = 'recusado'; // Set status to "rejeitado"
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        displayRequests(); // Refresh the requests display
        displayOpenRequestsCount(); // Update the count of open requests
    }
}

function updatePagination(totalPages, currentPage) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    // Add "Previous" button
    const prevItem = document.createElement('li');
    prevItem.className = 'page-item';
    prevItem.innerHTML = `<a class="page-link page-link-previous" href="#">Previous</a>`;
    prevItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) displayRequests(currentPage - 1);
    });
    pagination.appendChild(prevItem);

    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            displayRequests(i);
        });
        pagination.appendChild(pageItem);
    }

    // Add "Next" button
    const nextItem = document.createElement('li');
    nextItem.className = 'page-item';
    nextItem.innerHTML = `<a class="page-link page-link-next" href="#">Next</a>`;
    nextItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) displayRequests(currentPage + 1);
    });
    pagination.appendChild(nextItem);
}

function displayOpenRequestsCount() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const filteredPedidos = pedidos.filter(pedido => pedido.estado === 'pendente');
    const headerText = document.querySelector('.h3.mb-2.text-gray-800');
    if (headerText) {
        headerText.textContent = `${filteredPedidos.length} Pedidos em Aberto`;
    }
}