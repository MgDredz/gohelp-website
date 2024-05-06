document.addEventListener('DOMContentLoaded', () => {
    displayInitiatives();
    displayOpenRequestsCount();

    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name) {
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = storedUser.name;
    }
});

function displayInitiatives(page = 1) {
    const itemsPerPage = 5;
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const listGroup = document.querySelector('.list-group');

    // Calculate pagination
    const totalPages = Math.ceil(initiatives.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Clear existing content
    listGroup.innerHTML = '';

    initiatives.slice(start, end).forEach(initiative => {
        const initiativeElement = createInitiativeElement(initiative);
        listGroup.appendChild(initiativeElement);
    });

    updatePagination(totalPages, page);
}

function createInitiativeElement(initiative) {
    const listItem = document.createElement('div');
    listItem.className = 'list-group-item list-group-item-action flex-column align-items-start mb-2';
    listItem.setAttribute('data-id', initiative.id);

    listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${initiative.titulo}</h5>
            <small class="text-muted">
                <a href="#" class="details-link2" data-toggle="modal" onclick="showDetails(${initiative.id})">Mais Detalhes</a>
            </small>
        </div>
        <p class="mb-2"></p>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-dark">Em Análise</button>
        </div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-success">Aprovar</button>
        </div>
        <div class="btn-group" role="group">    
            <button type="button" class="btn btn-danger">Rejeitar</button>
        </div>
    `;

    return listItem;
}

function showDetails(id) {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(item => item.id === id);

    if (!initiative) return;

    const modalBody = document.querySelector('#detailsModal .modal-body');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <p><strong>Localidade:</strong> ${initiative.localidade}</p>
                <p><strong>Data:</strong> ${initiative.data}</p>
                <p><strong>Título:</strong> ${initiative.titulo}</p>
                <p><strong>Hora Início:</strong> ${initiative.horaInicio}</p>
                <p><strong>Hora Fim:</strong> ${initiative.horaFim}</p>
                <p><strong>Descrição:</strong> ${initiative.descricao}</p>
            </div>
            <div class="col-md-6">
                <img src="${initiative.imagem}" class="img-fluid" alt="Evento">
            </div>
        </div>
    `;

    $('#detailsModal').modal('show');
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
        if (currentPage > 1) displayInitiatives(currentPage - 1);
    });
    pagination.appendChild(prevItem);

    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            displayInitiatives(i);
        });
        pagination.appendChild(pageItem);
    }

    // Add "Next" button
    const nextItem = document.createElement('li');
    nextItem.className = 'page-item';
    nextItem.innerHTML = `<a class="page-link page-link-next" href="#">Next</a>`;
    nextItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) displayInitiatives(currentPage + 1);
    });
    pagination.appendChild(nextItem);
}

function displayOpenRequestsCount() {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const headerText = document.querySelector('.h3.mb-2.text-gray-800');
    if (headerText) {
        headerText.textContent = `${initiatives.length} Pedidos em Aberto`;
    }
}
