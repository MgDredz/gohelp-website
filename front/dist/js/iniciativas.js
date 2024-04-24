// JavaScript to handle tab click and maintain yellow background on active tab - INICIATIVAS
function changeTab(tab, element) {
    // Clear all active classes
    var buttons = document.getElementsByClassName('tab-button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('active');
    }
    // Add active class to the clicked button
    element.classList.add('active');
    
    // Additional code to filter events based on the tab can go here
  }

function changeTab(tabId) {
    // Esconde todas as seções de conteúdo
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    // Mostra a seção relevante
    document.getElementById(tabId).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicialmente esconde todas as seções exceto a 'current'
    changeTab('current');
});
  
  