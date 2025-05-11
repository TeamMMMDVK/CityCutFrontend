console.log("Her er vi i login.js")

export function renderLoginForm() {

    return `
        <form id="loginForm">
            <h2>Login</h2>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>
            <label for="password">Adgangskode:</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Log ind</button>
                    
        </form>
    `;
}

