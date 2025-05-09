console.log("Her er vi i register.js")

// registration.js
export function renderRegisterForm(currentUserRole = "ROLE_CUSTOMER") {
    const isAdmin = currentUserRole === "ROLE_ADMIN";

    return `
        <form id="registerForm">
            <h2>Opret Bruger</h2>

            <label for="name">Navn:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>

            <label for="password">Adgangskode:</label>
            <input type="password" id="password" name="password" required><br>

            ${isAdmin ? `
                <label for="role">Rolle:</label>
                <select id="role" name="role">
                    <option value="ROLE_CUSTOMER">Kunde</option>
                    <option value="ROLE_ADMIN">Admin</option>
                </select><br>
            ` : ""}

            <button type="submit">Registrer</button>
            <div id="message"></div>
        </form>
    `;
}

export function setupRegisterFormEvents(currentUserRole = "ROLE_CUSTOMER") {
    const form = document.getElementById("registerForm");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const roleInput = document.getElementById("role");

        const user = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: currentUserRole === "ROLE_ADMIN" && roleInput ? roleInput.value : "ROLE_CUSTOMER"
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const message = await response.text();

            if (response.status === 201) {
                messageDiv.innerText = "Bruger oprettet!";
                messageDiv.style.color = "green";
                form.reset();
            } else {
                messageDiv.innerText = "Fejl: " + message;
                messageDiv.style.color = "red";
            }
        } catch (error) {
            messageDiv.innerText = "Netværksfejl: " + error.message;
        }
    });
}
