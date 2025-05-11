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
                    
        </form>
    `;
}

export function setupLoginFormEvents() {
    const form = document.getElementById("loginForm")

    form.addEventListener("submit", async function (event) {
            event.preventDefault()

            const loginRequest = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            }
            try {
                const response = await fetch('http://localhost:8081/api/v1/user/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password})
                });
                if (response.ok) {
                    const data = await response.json();
                    sessionStorage.setItem('token', data.token);
                    output.textContent = "Login lykkedes. Token gemt.";
                } else {
                    output.textContent = "Login fejlede.";
                }
            } catch (error) {
                alert("Databasefejl: " + error.message);
            }
        }
    )
}

