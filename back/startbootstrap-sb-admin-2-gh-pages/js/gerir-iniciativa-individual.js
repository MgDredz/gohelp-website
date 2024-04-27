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