document.addEventListener('DOMContentLoaded', function() {
    // Initially display the "FUTURAS" tab
    changeTab('future', document.querySelector('.tab-button[data-tab="future"]'));

    // Load initiatives from local storage
    loadInitiatives();
});

// Load initiatives from local storage
function loadInitiatives() {
    // Example predefined initiatives if not already in local storage
    const predefinedInitiatives = [
        { id: 1, titulo: "Caminhada da Saúde", type: "Corrida/Maratona", localidade: "Parque da Cidade", region: "Norte", data: "2023-06-01", horaInicio: "08:00", horaFim: "10:00", descricao: "Caminhada para promover a saúde e o bem-estar.", imagem: "caminhada.jpg" },
        // Add more initiatives here...
    ];

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

    reversedInitiatives.forEach(initiative => {
        // Combine date and hour for accurate comparison
        const startDate = new Date(`${initiative.data}T${initiative.horaInicio}`);
        const endDate = new Date(`${initiative.data}T${initiative.horaFim}`);
        const initiativeElement = createInitiativeElement(initiative);

        if (endDate < currentDate) {
            pastContainer.appendChild(initiativeElement);
        } else if (startDate <= currentDate && currentDate <= endDate) {
            currentContainer.appendChild(initiativeElement);
        } else {
            futureContainer.appendChild(initiativeElement);
        }
    });

    // Apply filters after loading the initiatives
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
        container.innerHTML += `<br><a href="inscricao.html?evento=${initiative.id}" class="register-button">INSCREVER</a>`;
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
