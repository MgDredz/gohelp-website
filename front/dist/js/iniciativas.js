// Lista para armazenar regiões ativas
let activeRegions = [];

// Função para filtrar por região
function filterRegion(region, element) {
    // Alternar classe ativa para o botão da região
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        activeRegions = activeRegions.filter(r => r !== region);
    } else {
        element.classList.add('active');
        activeRegions.push(region);
    }
    // Aplicar filtragem
    applyFilters();
}

// Função para aplicar filtros por região e aba
function applyFilters() {
    // Verificar qual aba está ativa
    const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
    const allContainers = document.querySelectorAll(`#${activeTab} .event-container`);

    allContainers.forEach(container => {
        const eventRegion = container.getAttribute('data-region');
        const matchesRegion = activeRegions.length === 0 || activeRegions.includes(eventRegion);

        // Mostrar ou esconder o container dependendo dos filtros
        container.style.display = matchesRegion ? '' : 'none';
    });
}

// Função para mudar de aba
function changeTab(tabId, element) {
    // Limpar estado de botão de aba ativa
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    element.classList.add('active');

    // Esconder todas as seções e mostrar a selecionada
    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    // Aplicar os filtros com base na aba selecionada
    applyFilters();
}

// Função para iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar inicialmente a aba "A DECORRER"
    changeTab('current', document.querySelector('.tab-button[data-tab="current"]'));
});
