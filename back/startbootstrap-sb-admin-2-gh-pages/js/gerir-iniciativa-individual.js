function openTab(tabName) {
    // Esconde todos os conteúdos de abas
    var tabcontents = document.querySelectorAll(".tab-content");
    tabcontents.forEach(function(tabcontent) {
      tabcontent.style.display = "none";
    });
  
    // Remove 'active' de todos os botões
    var tabbuttons = document.querySelectorAll(".tab-button");
    tabbuttons.forEach(function(tabbutton) {
      tabbutton.classList.remove("active");
    });
  
    // Mostra a aba específica e adiciona 'active' ao botão correspondente
    document.getElementById(tabName).style.display = "block";
    document.querySelector(".tab-button[data-tab='" + tabName + "']").classList.add("active");
}
  
  // Garante que o script rode após o carregamento completo do DOM
  window.onload = function() {
    openTab('Dados');
  };

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
  ids.forEach(function(itemId) {
    var quantidade = localStorage.getItem(itemId) || "0"; // Pega o valor do local storage ou 0 se não houver nada salvo
    document.getElementById('quantidade-' + itemId).textContent = quantidade;
  });
}

// Chama a função carregarQuantidades quando a janela é carregada
window.onload = carregarQuantidades;