document.addEventListener('DOMContentLoaded', () => {
    ensureAdminExists(); // Check and add admin on page load
    preloadProfiles(); // Preload professional profiles
    preloadInitiatives();

    const loginButton = document.querySelector('.btn-user.btn-block');
    if (loginButton) {
        loginButton.addEventListener("click", function(event) {
            event.preventDefault();

            const email = document.getElementById("exampleInputEmail").value.trim();
            const password = document.getElementById("exampleInputPassword").value.trim();

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                const fullName = user.firstName + ' ' + user.lastName;
                localStorage.setItem('loggedInUser', JSON.stringify({ name: fullName, email: user.email }));

                // Prepopulate professional profiles if not already done
                preloadProfiles();

                // Redirect to a specific page
                window.location.href = 'index.html'; // This code will stop execution following the redirect
            } else {
            }
        });
    } else {
        console.log("Login button not found.");
    }
});

function ensureAdminExists() {
    const defaultAdmin = {
        firstName: "Admin",
        lastName: "",
        email: "admin@gmail.com",
        password: "adminpass", // Storing passwords in local storage is insecure
        isAdmin: true
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!users.some(user => user.email === defaultAdmin.email && user.isAdmin)) {
        users.push(defaultAdmin);
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Admin named 'Admin' added to local storage.");
    } else {
        console.log("Admin named 'Admin' already exists in local storage.");
    }
}

function preloadProfiles() {
    // Predefined professional profiles
    const predefinedProfiles = [
        { name: "John Doe", email: "john.doe@example.com", phone: "1234567890", region: "North", profession: "Ajudante" },
        { name: "Jane Smith", email: "jane.smith@example.com", phone: "0987654321", region: "South", profession: "Advogado" },
        { name: "Alice Johnson", email: "alice.johnson@example.com", phone: "1122334455", region: "East", profession: "Gestor_de_Seguros" },
        { name: "Bob Brown", email: "bob.brown@example.com", phone: "5544332211", region: "West", profession: "Ajudante" }
    ];

    // Check if profiles already exist in local storage
    if (!localStorage.getItem('profissionais')) {
        // Store predefined profiles in local storage
        localStorage.setItem('profissionais', JSON.stringify(predefinedProfiles));
        console.log("Professional profiles preloaded into local storage.");
    } else {
        console.log("Professional profiles already exist in local storage.");
    }
}

function preloadInitiatives() {
    // Predefined initiatives
    const predefinedInitiatives = [
        { titulo: "Corrida da Cidade", type: "Corrida/Maratona", localidade: "Centro da Cidade", region: "Centro", data: "2024-04-10", horaInicio: "09:00", horaFim: "11:00", descricao: "Uma maratona urbana para todos os níveis de corredores.", imagem: "maratona.jpg", participantes: 24, doacoes: 535.00, materiais: [], profissionais: [] },
        { titulo: "Aulas de Yoga", type: "Aulas", localidade: "Parque das Águas", region: "Lisboa", data: "2024-04-12", horaInicio: "08:00", horaFim: "10:00", descricao: "Sessão de yoga ao ar livre para promover a saúde e o bem-estar.", imagem: "yoga.jpg", participantes: 14, doacoes: 245.00, materiais: [], profissionais: [] },
        { titulo: "Jogo de Futebol Beneficente", type: "Jogos de Futebol", localidade: "Estádio Municipal", region: "Norte", data: "2024-04-15", horaInicio: "15:00", horaFim: "17:00", descricao: "Jogo de futebol para arrecadar fundos para a caridade local.", imagem: "futebol.jpg", participantes: 34, doacoes: 245.42, materiais: [], profissionais: [] },
        { titulo: "Workshop de Fotografia", type: "Workshop", localidade: "Centro Cultural", region: "Alentejo", data: "2024-04-18", horaInicio: "10:00", horaFim: "12:00", descricao: "Workshop introdutório sobre técnicas de fotografia digital.", imagem: "fotografia.jpg", participantes: 121, doacoes: 1345.50, materiais: [], profissionais: [] },
        { titulo: "Aula de Pilates", type: "Aulas", localidade: "Parque da Avenida", region: "Norte", data: "2024-04-24", horaInicio: "15:00", horaFim: "17:00", descricao: "Sessão de pilates ao ar livre para promover a saúde e o bem-estar.", imagem: "pilates.jpg", participantes: 24, doacoes: 45.00, materiais: [], profissionais: [] },
        { titulo: "Festa Solidária do Campeonato", type: "Outro", localidade: "Marquês de Pombal", region: "Centro", data: "2024-05-1", horaInicio: "17:00", horaFim: "22:00", descricao: "Venha festejar o campeonato numa comunhão desportiva e solidária", imagem: "sporting.jpg", participantes: 521, doacoes: 3285.50, materiais: [], profissionais: [] }
    ];

    // Check if initiatives already exist in local storage
    if (!localStorage.getItem('initiatives')) {
        // Store predefined initiatives in local storage
        localStorage.setItem('initiatives', JSON.stringify(predefinedInitiatives));
        console.log("Initiatives preloaded into local storage.");
    } else {
        console.log("Initiatives already exist in local storage.");
    }
}