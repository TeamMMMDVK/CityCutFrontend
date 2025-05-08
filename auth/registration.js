console.log("Her er vi i register.js")

export function renderRegisterForm(currentUserRole = "ROLE_CUSTOMER") {
    const app = document.getElementById("app");
    app.innerHTML = ""; //renser app feltet

    const form = document.createElement("form");
    form.id = "registerForm";

    const title = document.createElement("h2");
    title.innerText = "Opret Bruger";

    // Navn
    const nameLabel = document.createElement("label"); //opretter HTML label tag mæntet på
    //brugervenlighed / tilgængelighed (så skærmlæsere og brugere ved, hvad de skal udfylde)
    nameLabel.setAttribute("for", "name"); // Sætter 'for="name"' (refererer til inputfeltet med id="name")
    nameLabel.innerText = "Navn:"; // Det tekstindhold, som vises ved siden af feltet
    const nameInput = document.createElement("input"); //opretter HTML input feltet
    nameInput.type = "text";
    nameInput.id = "name"; // id = "name" (så det matcher labelens 'for')
    nameInput.name = "name"; // name = "name" (brugt ved form submission, fx i FormData)
    nameInput.required = true; // Gør feltet påkrævet i browseren

    // Email
    const emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.innerText = "Email:";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "email";
    emailInput.name = "email";
    emailInput.required = true;

    // Password
    const passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "password");
    passwordLabel.innerText = "Adgangskode:";
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password";
    passwordInput.name = "password";
    passwordInput.required = true;

    // Rolle (vises kun hvis admin)
    let roleInput = null;
    if (currentUserRole === "ROLE_ADMIN") {
        const roleLabel = document.createElement("label");
        roleLabel.setAttribute("for", "role");
        roleLabel.innerText = "Rolle:";
        roleInput = document.createElement("select");
        roleInput.id = "role";
        roleInput.name = "role";

        const customerOption = new Option("Kunde", "ROLE_CUSTOMER");
        const adminOption = new Option("Admin", "ROLE_ADMIN");

        roleInput.append(customerOption, adminOption);

        form.appendChild(roleLabel);
        form.appendChild(roleInput);
        form.appendChild(document.createElement("br"));
    }

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.innerText = "Registrer";

    const messageDiv = document.createElement("div");
    messageDiv.id = "message";

    form.append(
        title,
        nameLabel, nameInput, document.createElement("br"),
        emailLabel, emailInput, document.createElement("br"),
        passwordLabel, passwordInput, document.createElement("br"),
        submitBtn,
        messageDiv
    );

    app.appendChild(form);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            role: currentUserRole === "ROLE_ADMIN" && roleInput ? roleInput.value : "ROLE_CUSTOMER"
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const message = await response.text();
            const msgBox = document.getElementById("message");

            if(response.status === 201) {
                msgBox.innerText = "Bruger oprettet!";
                msgBox.style.color = "green";
                form.reset();
            } else {
                msgBox.innerText = "Fejl: " + message;
                msgBox.style.color = "red";
            }
        } catch (error) {
            document.getElementById("message").innerText = "Netværksfejl: " + error.message;
        }
    });
}
