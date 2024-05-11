document.addEventListener('DOMContentLoaded', function() {
    loadPedidos(); // Certifique-se de que esta chamada está aqui
    ensureAdminExists();
    preloadProfiles();
    preloadInitiatives();
    preloadDonations();
    preloadPedidos();
    preloadGestores();
    

    // Defina a aba inicial ativa e exiba seus conteúdos
    changeTab('em_espera', document.querySelector('.tab-button[data-tab="em_espera"]'));
});

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const email = loggedInUser ? loggedInUser.email : '';

function loadPedidos() {
    if (!localStorage.getItem('pedidos')) {
        localStorage.setItem('pedidos', JSON.stringify(predefinedPedidos));
    }

    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const email = loggedInUser ? loggedInUser.email : '';
    const containerTodosPedidos = document.getElementById('eventosTodosPedidos');
    const containerRecusadas = document.getElementById('eventosRecusadas');
    const containerEmEspera = document.getElementById('eventosEmEspera');
    const containerAceites = document.getElementById('eventosAceites');

    containerRecusadas.innerHTML = '';  // Limpa conteúdo anterior
    containerEmEspera.innerHTML = '';   // Limpa conteúdo anterior
    containerAceites.innerHTML = '';    // Limpa conteúdo anterior
    containerTodosPedidos.innerHTML = '';  // Limpa conteúdo anterior

    pedidos.filter(pedido => pedido.email === email).forEach(pedido => {
        containerTodosPedidos.appendChild(createPedidoElement(pedido));
        if (pedido.estado === "recusado") {
            containerRecusadas.appendChild(createPedidoElement(pedido));
        } else if (pedido.estado === "pendente") {
            containerEmEspera.appendChild(createPedidoElement(pedido));
        } else if (pedido.estado === "aceite") {
            containerAceites.appendChild(createPedidoElement(pedido));
        }
    });
}


function createPedidoElement(pedido) {
    const element = document.createElement('div');
    element.className = 'pedido';
    element.innerHTML = `
        <h3 style="margin-bottom: 0;">${pedido.titulo}</h3>
        <div class="pedido-estado ${pedido.estado}">${pedido.estado}</div>`;  // Classe adicional baseada no estado
    return element;
}







function changeTab(tabId, element) {
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}
