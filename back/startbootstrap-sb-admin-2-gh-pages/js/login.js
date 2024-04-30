document.addEventListener('DOMContentLoaded', () => {
    ensureAdminExists(); // Check and add admin on page load
    preloadProfiles(); // Preload professional profiles

    const loginButton = document.querySelector('.btn-user.btn-block');
    if (loginButton) {
        loginButton.addEventListener("click", function(event) {
            event.preventDefault();

            const email = document.getElementById("exampleInputEmail").value.trim();
            const password = document.getElementById("exampleInputPassword").value.trim();

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert("Login successful!");
                const fullName = user.firstName + ' ' + user.lastName;
                localStorage.setItem('loggedInUser', JSON.stringify({ name: fullName, email: user.email }));

                // Prepopulate professional profiles if not already done
                preloadProfiles();

                // Redirect to a specific page
                window.location.href = 'index.html'; // This code will stop execution following the redirect
            } else {
                alert("Invalid credentials!");
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