console.log("Her er vi i login.js")

export function renderLoginForm() {

    return `
        <form id="loginForm">
            <h2>Log In</h2>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>
            <label for="password">Adgangskode:</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Log ind</button>
            <div id="output"></div>
                    
        </form>
    `;
}

export function setupLoginFormEvents() {
    const form = document.getElementById("loginForm")

    form.addEventListener("submit", async function (event) {
            event.preventDefault()

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const output = document.getElementById("output")

            const loginRequest = { email , password }

            try {
                const response = await fetch('http://localhost:8081/api/v1/user/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(loginRequest)
                });

                if (response.ok) {
                    const data = await response.json();
                    sessionStorage.setItem('token', data.token); //Her gemmes token og rolle i session storage
                    //sessionStorage.setItem("role",data.role)
                    alert("Velkommen du er nu logget ind")
                    history.pushState("", "", "/"); // Skift til HOME
                    window.spaRouter(); // Kalder routeren i app.js, som opdaterer visningen
                    console.log("Login lykkedes. Token er gemt")
                } else {
                    output.textContent = "Login fejlede.";
                }
            } catch (error) {
                output.textContent = "Databasefejl: " + error.message;
            }
        }
    )
}

