document.addEventListener('DOMContentLoaded', () => {
    ensureAdminExists(); // Check and add admin on page load
    preloadProfiles(); // Preload professional profiles
    preloadInitiatives();
    preloadDonations();

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

function preloadDonations() {
    // Predefined initiatives
    const predefinedDonations = [
        //online donations
        { data:"2024-05-01", montante:38030 ,type: "Online" },
        { data:"2024-04-25", montante:24000 ,type: "Online" },
        { data:"2024-03-25", montante:14500 ,type: "Online" },
        { data:"2024-02-25", montante:12554 ,type: "Online" },
        { data:"2024-01-25", montante:14040 ,type: "Online" },
        { data:"2023-12-25", montante:29050 ,type: "Online" },
        { data:"2023-11-25", montante:9345 ,type: "Online" },
        { data:"2023-10-25", montante:9775 ,type: "Online" },
        { data:"2023-09-25", montante:11040 ,type: "Online" },
        { data:"2023-08-25", montante:22495 ,type: "Online" },
        { data:"2023-07-25", montante:36050 ,type: "Online" },
        { data:"2023-06-25", montante:40775 ,type: "Online" },
        //field donations
        { data:"2024-05-25", montante:3800 ,type: "Field" },
        { data:"2024-04-25", montante:2400 ,type: "Field" },
        { data:"2024-03-25", montante:1400 ,type: "Field" },
        { data:"2024-02-25", montante:1254 ,type: "Field" },
        { data:"2024-01-25", montante:1440 ,type: "Field" },
        { data:"2023-12-25", montante:2950 ,type: "Field" },
        { data:"2023-11-25", montante:935 ,type: "Field" },
        { data:"2023-10-25", montante:975 ,type: "Field" },
        { data:"2023-09-25", montante:1140 ,type: "Field" },
        { data:"2023-08-25", montante:2245 ,type: "Field" },
        { data:"2023-07-25", montante:3050 ,type: "Field" },
        { data:"2023-06-25", montante:4075 ,type: "Field" },
        //sponsor donations
        { data:"2024-05-25", montante:24000 ,type: "Sponsor" },
        { data:"2024-04-25", montante:14000 ,type: "Sponsor" },
        { data:"2023-07-25", montante:40000 ,type: "Sponsor" },
        { data:"2023-06-25", montante:35000 ,type: "Sponsor" },
    ];

    // Check if initiatives already exist in local storage
    if (!localStorage.getItem('initiatives')) {
        // Store predefined initiatives in local storage
        localStorage.setItem('initiatives', JSON.stringify(predefinedDonations));
        console.log("Initiatives preloaded into local storage.");
    } else {
        console.log("Initiatives already exist in local storage.");
    }
}