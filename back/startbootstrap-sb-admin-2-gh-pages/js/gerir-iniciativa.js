document.addEventListener('DOMContentLoaded', () => {
  displayInitiatives();
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (storedUser && storedUser.name) {
      document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = storedUser.name;
  }

  
});

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
    openTab('ADecorrer');
  };

  function displayInitiatives() {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const realizadasContainer = document.getElementById('Realizadas');
    const aDecorrerContainer = document.getElementById('ADecorrer');
    const aRealizarContainer = document.getElementById('ARealizar');

    // Clear existing content
    realizadasContainer.innerHTML = '';
    aDecorrerContainer.innerHTML = '';
    aRealizarContainer.innerHTML = '';

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time part for accurate comparison

    initiatives.forEach(initiative => {
        const eventDate = new Date(initiative.data);
        eventDate.setHours(0, 0, 0, 0); // Reset time part for accurate comparison
        const initiativeElement = createInitiativeElement(initiative);

        if (eventDate < currentDate) {
            realizadasContainer.appendChild(initiativeElement);
        } else if (eventDate.toDateString() === currentDate.toDateString()) {
            aDecorrerContainer.appendChild(initiativeElement);
        } else {
            aRealizarContainer.appendChild(initiativeElement);
        }
    });
}

function createInitiativeElement(initiative) {
  const container = document.createElement('div');
  container.className = 'event-button'; // Assuming this class aligns with the intended style

  const formattedDate = new Date(initiative.data).toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit', month: 'short' });

  container.innerHTML = `
      <a href="Gerir-Iniciativa-Individual.html">
          <div class="event-container">
              <img src="${initiative.imagem}" alt="Event Image" style="width: 100%; height: auto;" /> <!-- Set the src attribute with the image data -->
              <div class="event-date">${formattedDate}</div>
              <div class="event-location">${initiative.localidade}</div>
              <h3 class="event-Titel">${initiative.titulo}</h3>
              <p>${initiative.descricao}</p>
          </div>
      </a>
      <div class="row">
          <div class="event-inscricoes">
              <span class="numero-evento-inscricoes">${initiative.participantes}</span> <!-- Default value, update based on your data -->
              <span class="texto-evento">Inscrições</span>
          </div>
          <div class="event-angariacoes">
              <span class="numero-evento-euros">${initiative.doacoes} €</span> <!-- Default value, update based on your data -->
              <span class="texto-evento">Angariados</span>
          </div>
      </div>
  `;

  return container;
}

