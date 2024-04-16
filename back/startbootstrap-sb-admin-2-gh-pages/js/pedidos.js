document.addEventListener('DOMContentLoaded', (event) => {
    // Assuming you have 4 items per page
    const itemsPerPage = 4;
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