  document.addEventListener('DOMContentLoaded', () => {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const bars = document.getElementById('barPercentage');
  
    // Define the types and initialize counts to zero for each type
    const types = ['Corrida/Maratona', 'Aulas', 'Jogos de Futebol', 'Workshop', 'Outro'];
    const typeCounts = {};
    types.forEach(type => typeCounts[type] = 0);
  
    // Get today's date and the date one month ago
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
  
    // Filter initiatives based on date
    const filteredInitiatives = initiatives.filter(initiative => {
      const initiativeDate = new Date(initiative.data);
      return initiativeDate >= lastMonth && initiativeDate <= today;
    });
  
    // Count each initiative by its type
    filteredInitiatives.forEach(initiative => {
        if (typeCounts.hasOwnProperty(initiative.type)) {
            typeCounts[initiative.type]++;
        }
    });
  
    const totalFilteredInitiatives = filteredInitiatives.length;
  
    // Function to calculate percentage
    function calculatePercentage(count, total) {
        return total > 0 ? (count / total * 100).toFixed(2) : 0;
    }
  
    // Calculate percentages
    const typePercentages = {};
    types.forEach(type => {
        typePercentages[type] = calculatePercentage(typeCounts[type], totalFilteredInitiatives);
    });
  
    // Sort the initiative types by percentage in descending order
    const sortedTypePercentages = Object.entries(typePercentages).sort(([, a], [, b]) => b - a);
  
    // Call your function to create the initiative elements or update the UI
    createInitiativeElement(sortedTypePercentages);
  
    // Function to create the initiative elements
    function createInitiativeElement(sortedTypePercentages) {
        const container = document.createElement('div');
        container.className = 'card shadow mb-4'; // Assuming this class aligns with the intended style
  
        container.innerHTML = `
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Ações - Tipo (no último mês)</h6>
            </div>
            <div class="card-body">
                ${sortedTypePercentages.map(([type, percentage]) => {
                    const colorClass = {
                        'Corrida/Maratona': 'bg-primary',
                        'Aulas': 'bg-success',
                        'Jogos de Futebol': 'bg-info',
                        'Workshop': 'bg-warning',
                        'Outro': 'bg-danger'
                    }[type] || 'bg-secondary';
  
                    return `
                        <h4 class="small font-weight-bold">${type} <span class="float-right">${percentage}%</span></h4>
                        <div class="progress mb-4">
                            <div class="progress-bar ${colorClass}" role="progressbar" style="width: ${percentage}%"></div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
  
        bars.appendChild(container);
    }
  });
  