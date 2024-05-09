document.addEventListener('DOMContentLoaded', function() {
    // Initially display the "FUTURAS" tab
    changeTab('future', document.querySelector('.tab-button[data-tab="future"]'));

    // Load initiatives from local storage
    loadInitiatives();
});

function loadInitiatives() {
    if (!localStorage.getItem('initiatives')) {
        localStorage.setItem('initiatives', JSON.stringify(predefinedInitiatives));
    }

    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const reversedInitiatives = initiatives.reverse();
    const pastContainer = document.getElementById('past').querySelector('#eventos');
    const currentContainer = document.getElementById('current').querySelector('#eventos');
    const futureContainer = document.getElementById('future').querySelector('#eventos');

    pastContainer.innerHTML = '';
    currentContainer.innerHTML = '';
    futureContainer.innerHTML = '';

    const currentDate = new Date();
    let currentHasInitiatives = false;

    reversedInitiatives.forEach(initiative => {
        const startDate = new Date(`${initiative.data}T${initiative.horaInicio}`);
        const endDate = new Date(`${initiative.data}T${initiative.horaFim}`);
        const initiativeElement = createInitiativeElement(initiative);

        if (endDate < currentDate) {
            pastContainer.appendChild(initiativeElement);
        } else if (startDate <= currentDate && currentDate <= endDate) {
            currentContainer.appendChild(initiativeElement);
            currentHasInitiatives = true;
        } else {
            futureContainer.appendChild(initiativeElement);
        }
    });

    if (!currentHasInitiatives) {
        currentContainer.innerHTML = '<br><br/><p class="no-initiatives">Nenhuma iniciativa a decorrer neste momento.</p><br><br/>';
    }

    applyFilters();
}

function createInitiativeElement(initiative) {
    const container = document.createElement('div');
    container.className = 'event-container';
    container.setAttribute('data-region', initiative.region);

    const formattedDate = new Date(initiative.data).toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit', month: 'short' });

    container.innerHTML = `
        <img src="${initiative.imagem}" alt="Event Image">
        <div class="event-date">${formattedDate}</div>
        <div class="event-location">${initiative.localidade}</div>
        <h3>${initiative.titulo}</h3>
        <p>${initiative.descricao}</p>
    `;

    // Adicionar o botão "INSCREVER" apenas para as iniciativas futuras
    const currentDate = new Date();
    const startDate = new Date(`${initiative.data}T${initiative.horaInicio}`);
    if (startDate > currentDate) {
        let detailsUrl = `inscricao.html?titulo=${encodeURIComponent(initiative.titulo)}&localidade=${encodeURIComponent(initiative.localidade)}&data=${encodeURIComponent(initiative.data)}&descricao=${encodeURIComponent(initiative.descricao)}&imagem=${encodeURIComponent(initiative.imagem)}&participantes=${encodeURIComponent(initiative.participantes)}&participantesMax=${encodeURIComponent(initiative.participantesmax)}`;
        container.innerHTML += `<br><a href="${detailsUrl}" class="register-button">INSCREVER</a>`;
    }
    
    return container;
}


let activeRegions = [];

function filterRegion(region, element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        activeRegions = activeRegions.filter(r => r !== region);
    } else {
        element.classList.add('active');
        activeRegions.push(region);
    }
    applyFilters();
}

function applyFilters() {
    const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
    const allContainers = document.querySelectorAll(`#${activeTab} .event-container`);

    allContainers.forEach(container => {
        const eventRegion = container.getAttribute('data-region');
        const matchesRegion = activeRegions.length === 0 || activeRegions.includes(eventRegion);
        container.style.display = matchesRegion ? '' : 'none';
    });
}

function changeTab(tabId, element) {
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    applyFilters();
}
