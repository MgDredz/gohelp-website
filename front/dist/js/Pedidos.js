document.addEventListener('DOMContentLoaded', function() {
    // Initially display the "FUTURAS" tab
    // changeTab('future', document.querySelector('.tab-button[data-tab="future"]'));

    // Load Pedidos from local storage
    loadPedidos();
});

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const email = loggedInUser ? loggedInUser.email : '';

function createPedidoElement(Pedido) {
    // Só criar elemento se o email do usuário logado for o mesmo da iniciativa
    //if (initiative.email === email) {
        const container = document.createElement('div');
        container.className = 'event-container';


        

        container.innerHTML = `
            <h3>${Pedido.titulo}</h3>
        `;

        // Adicionar o botão "INSCREVER" apenas para as iniciativas futuras
        
        return container;
    //}
    //return null; // Retorna null se o email não corresponder
}





function changeTab(tabId, element) {
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    applyFilters();
}
