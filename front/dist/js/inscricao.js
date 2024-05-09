document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const titulo = decodeURIComponent(urlParams.get('titulo') || '');
    const localidade = decodeURIComponent(urlParams.get('localidade') || '');
    const data = decodeURIComponent(urlParams.get('data') || '');
    const descricao = decodeURIComponent(urlParams.get('descricao') || '');
    const imagem = decodeURIComponent(urlParams.get('imagem') || '');
    const participantes = decodeURIComponent(urlParams.get('participantes') || '0');
    const participantesMax = decodeURIComponent(urlParams.get('participantesMax') || '0');

    const eventoContainer = document.querySelector('.event-container');
    eventoContainer.innerHTML = `
        <img src="${imagem}" alt="Event Image">
        <div class="event-date">${data}</div>
        <div class="event-location">${localidade}</div>
        <h3>${titulo}</h3>
        <p>${descricao}</p>
        <p><strong>Participantes: </strong>${participantes}/${participantesMax}</p>
    `;
});


document.addEventListener('DOMContentLoaded', function() {
    loadInitiativeDetails(); // Chamada da função renomeada
});

function loadInitiativeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('evento');
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(init => init.id.toString() === eventoId);

    if (initiative) {
        const eventoContainer = document.querySelector('.event-container');
        eventoContainer.innerHTML = `
            <img src="${initiative.imagem}" alt="Event Image">
            <div class="event-date">${new Date(initiative.data).toLocaleDateString('pt-PT')}</div>
            <div class="event-location">${initiative.localidade}</div>
            <h3>${initiative.titulo}</h3>
            <p>${initiative.descricao}</p>
            <div><strong>Participantes: </strong>${initiative.participantes}/${initiative.participantesmax}</div>

        `;
    } else {
        console.log("Iniciativa não encontrada.");
    }
}

