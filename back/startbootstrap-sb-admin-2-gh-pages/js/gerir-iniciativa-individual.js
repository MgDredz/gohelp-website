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

  const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const initiative = initiatives.find(i => i.id == id);

  if (initiative) {
    document.getElementById('titulo').value = initiative.titulo;
    document.getElementById('type').value = initiative.type;
    document.getElementById('localidade').value = initiative.localidade;
    document.getElementById('region').value = initiative.region;
    document.getElementById('data').value = initiative.data;
    document.getElementById('horaInicio').value = initiative.horaInicio;
    document.getElementById('horaFim').value = initiative.horaFim;
    document.getElementById('descricao').value = initiative.descricao;
    document.getElementById('gestor').value = initiative.gestor;
    document.getElementById('doacoes').value = initiative.doacoes;
    
    const imagem = document.getElementById('imagem');
    const displayImage = document.getElementById('displayImage');
    if (initiative.imagem) {
      displayImage.src = initiative.imagem;
    }
  }

    if (initiative && initiative.materiais) {
        const tableBody = document.getElementById('materiaisTableBody');
        initiative.materiais.forEach(item => {
            let row = tableBody.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            cell1.textContent = item.material;
            cell2.textContent = item.qtd;
            cell3.textContent = '';
            cell4.textContent = '';
            cell5.textContent = '';
        });
    }
});

function openTab(tabName) {
  // Esconde todos os conteúdos de abas
  var tabcontents = document.querySelectorAll(".tab-content");
  tabcontents.forEach(function (tabcontent) {
    tabcontent.style.display = "none";
  });

  // Remove 'active' de todos os botões
  var tabbuttons = document.querySelectorAll(".tab-button");
  tabbuttons.forEach(function (tabbutton) {
    tabbutton.classList.remove("active");
  });

  // Mostra a aba específica e adiciona 'active' ao botão correspondente
  document.getElementById(tabName).style.display = "block";
  document.querySelector(".tab-button[data-tab='" + tabName + "']").classList.add("active");
}

// Garante que o script rode após o carregamento completo do DOM
window.onload = function () {
  openTab('Dados');
  window.onclick = carregarQuantidades;
};

// Get the `id` parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const initiativeId = parseInt(urlParams.get('id'));

// Retrieve initiatives from local storage
const initiatives = JSON.parse(localStorage.getItem('initiatives'));

// Find the initiative by ID
const initiative = initiatives.find(init => init.id === initiativeId);

//escrever
const localidade = document.getElementById('localidade');
localidade.innerHTML = `
  ${initiative.localidade}
  `;

const data = document.getElementById('data');
data.innerHTML = `
  ${initiative.data}
  `;

const titulo = document.getElementById('titulo');
titulo.innerHTML = `
  ${initiative.titulo}
  `;

const tituloB = document.getElementById('tituloBold');
tituloB.innerHTML = `
  ${initiative.titulo}
  `;

const doacoes = document.getElementById('doacoes');
doacoes.innerHTML = `
  ${initiative.doacoes}
  `;

const participantes = document.getElementById('participantes');
participantes.innerHTML = `
  ${initiative.participantes}
  `;

const descricao = document.getElementById('descricao');
descricao.innerHTML = `
  ${initiative.descricao}
  `;

const horaInicio = document.getElementById('horaInicio');
horaInicio.innerHTML = `
  ${initiative.horaInicio}
  `;

const horaFim = document.getElementById('horaFim');
horaFim.innerHTML = `
  ${initiative.horaFim}
  `;

const tipo = document.getElementById('tipo');
tipo.innerHTML = `
  ${initiative.type}
  `;

const region = document.getElementById('region');
region.innerHTML = `
  ${initiative.region}
  `;

const gestor = document.getElementById('gestor');
gestor.innerHTML = `
  ${initiative.gestor}
  `;

const imagem = document.getElementById('imagem');
imagem.innerHTML = `
  <img src="${initiative.imagem}">
  `;

/*
// Seleciona todos os botões de adição e subtração
const plusButtons = document.querySelectorAll('.plus-btn');
const minusButtons = document.querySelectorAll('.minus-btn');

// Adiciona um ouvinte de evento para cada botão de adição
plusButtons.forEach(button => {
 button.addEventListener('click', function() {
   const quantitySpan = button.previousElementSibling;
   let quantity = parseInt(quantitySpan.textContent);
   quantity++;
   quantitySpan.textContent = quantity;
 });
});

// Adiciona um ouvinte de evento para cada botão de subtração
minusButtons.forEach(button => {
 button.addEventListener('click', function() {
   const quantitySpan = button.nextElementSibling;
   let quantity = parseInt(quantitySpan.textContent);
   if (quantity > 0) {
     quantity--;
     quantitySpan.textContent = quantity;
   }
 });
});
*/
function incrementar(itemId) {
  var quantidade = parseInt(localStorage.getItem(itemId) || "0") + 1;
  localStorage.setItem(itemId, quantidade);
  document.getElementById('quantidade-' + itemId).textContent = quantidade;
}

// Função para decrementar a quantidade
function decrementar(itemId) {
  var quantidade = parseInt(localStorage.getItem(itemId) || "0") - 1;
  if (quantidade < 0) quantidade = 0; // Evita números negativos
  localStorage.setItem(itemId, quantidade);
  document.getElementById('quantidade-' + itemId).textContent = quantidade;
}

// Função para carregar as quantidades salvadas ao abrir a página
function carregarQuantidades() {
  // Substitua 'item1' pelo ID de seus itens
  var ids = ['item1', 'item2', 'item3']; // Adicione todos os IDs dos seus itens aqui
  ids.forEach(function (itemId) {
    var quantidade = localStorage.getItem(itemId) || "0"; // Pega o valor do local storage ou 0 se não houver nada salvo
    document.getElementById('quantidade-' + itemId).textContent = quantidade;
  });
}

function toggleTableBody() {
  var tableBody = document.getElementById("tableBody");
  var arrow = document.getElementById("arrow");
  if (tableBody.style.display === "none") {
    tableBody.style.display = "block";
    arrow.textContent = "▼";  // Muda a seta para baixo quando expandido
  } else {
    tableBody.style.display = "none";
    arrow.textContent = "▲";  // Muda a seta para cima quando minimizado
  }
}


