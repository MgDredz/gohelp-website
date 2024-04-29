document.addEventListener('DOMContentLoaded', (event) => {
    const itemsPerPage = 5;
    let currentPage = 1;
    const listItems = document.querySelectorAll('.list-group-item');
    const totalPages = Math.ceil(listItems.length / itemsPerPage);
  
    function showPage(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      listItems.forEach((item, index) => {
        if (index >= start && index < end) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  
    // Add event listeners for each page link
    document.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = Number(this.textContent);
        if (!isNaN(page)) {
          currentPage = page;
          showPage(currentPage);
        }
      });
    });
  
    // Add event listener for the "Previous" button
    const prevButton = document.querySelector('.page-link-previous');
    if (prevButton) {
      prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
        }
      });
    } else {
      console.log('Previous button not found');
    }
  
    // Add event listener for the "Next" button
    const nextButton = document.querySelector('.page-link-next');
    if (nextButton) {
      nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          showPage(currentPage);
        }
      });
    } else {
      console.log('Next button not found');
    }
  
    // Initially display the first page
    showPage(currentPage);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Get all the list-group-item elements
    var activities = document.querySelectorAll('.list-group-item');
    
    // Count the number of these elements
    var count = activities.length;

    // Find the paragraph element that contains the text "x Pedidos em Aberto"
    var headerText = document.querySelector('.h3.mb-2.text-gray-800');
    
    // Update the text with the actual number of activities
    if (headerText) {
        headerText.textContent = count + ' Pedidos em Aberto';
    }
});

function showDetails() {
  // Here you would get the details from somewhere. 
  // For demonstration, we'll hardcode an example entry:
  var eventDetails = {
    localidade: "Mire de Tibães, Braga",
    data: "12/04/2024",
    titulo: "Corrida do Mosteiro",
    duracao: "5 horas",
    nome: "Junta Freguesia de Mire de Tibães",
    email: "juntamiretibaes@gmail.com",
    telemovel: "969999999",
    descricao: "Junte-se a nós numa corrida noturna pelas históricas ruas de Mire de Tibães, iluminando caminhos com esperança e união pela caridade.",
    imagem: "path/to/image.jpg" // You'll replace this with the actual path to your image.
  };

  var modalBody = document.querySelector('#detailsModal .modal-body');
  modalBody.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <!-- Event Details -->
        <p><strong>Localidade:</strong> ${eventDetails.localidade}</p>
        <p><strong>Data:</strong> ${eventDetails.data}</p>
        <p><strong>Título:</strong> ${eventDetails.titulo}</p>
        <p><strong>Duração:</strong> ${eventDetails.duracao}</p>
        <p><strong>Nome:</strong> ${eventDetails.nome}</p>
        <p><strong>Email:</strong> ${eventDetails.email}</p>
        <p><strong>Nº Telemóvel:</strong> ${eventDetails.telemovel}</p>
        <p><strong>Descrição:</strong> ${eventDetails.descricao}</p>
      </div>
      <div class="col-md-6">
        <!-- Event Image -->
        <img src="${eventDetails.imagem}" class="img-fluid" alt="Evento">
      </div>
    </div>
  `;

  // Show the modal
  $('#detailsModal').modal('show');
}