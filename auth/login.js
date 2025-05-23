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

            const loginRequest = {email, password}

            try {
                const response = await fetch('http://localhost:8081/api/v1/user/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(loginRequest)
                });

                if (response.ok) {
                    const data = await response.json();
                    sessionStorage.setItem('token', data.token); //Her gemmes token og rolle i session storage
                    localStorage.setItem('token', data.token);
                    sessionStorage.setItem('userID', data.userID)
                    console.log(data.id)
                    console.log("Saved token:", data.token);
                    //sessionStorage.setItem("role",data.role)

                    let loggedInBool = true; //Upon succesful login set boolean flag to true for rendering navbar.
                    localStorage.setItem("loggedInBool", loggedInBool)

                    // Efter login - tjek om der er en pending booking
                    const pendingBooking = JSON.parse(localStorage.getItem("pendingBooking"));
                    const userID = sessionStorage.getItem("userID");

                    if (pendingBooking && userID) {
                        pendingBooking.userID = parseInt(userID);

                        try {
                            const response = await fetch("http://localhost:8081/api/v1/booking/", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                                },
                                body: JSON.stringify(pendingBooking)
                            });

                            if (!response.ok) throw new Error("Fejl ved oprettelse af booking");

                            alert("Booking gennemført "+ localStorage.getItem("pendingBooking"));

                            localStorage.removeItem("pendingBooking");
                            history.pushState("", "", "/");
                            window.spaRouter();

                        } catch (error) {
                            alert(error.message);
                        }

                    } else {
                        // Hvis ikke der er gemt en igangværende booking, så redirectes til forsiden
                        alert("Velkommen du er nu logget ind")
                        history.pushState("", "", "/");
                        window.spaRouter();
                    }

                } else {
                    output.textContent = "Login fejlede.";
                }
            } catch (error) {
                output.textContent = "Databasefejl: " + error.message;
            }
        }
    )
}

