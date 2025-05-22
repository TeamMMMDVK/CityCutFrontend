export function populateNavBar(role) {
    const navbar = document.getElementById("linkbar");
    navbar.innerHTML = ""
    let loggedInBool = localStorage.getItem("loggedInBool") === "true"
    //Konverter storage variabel til boolean. .getItem returnerer en streng,
    // hvorfor det er nødvendigt at compare med 'true' for at få den til at køre ordentligt.

    if (loggedInBool) {
        //Home button
        createHomeJSHTML(navbar)

        //Book Flow
        const bookingStartEle = document.createElement("li")
        bookingStartEle.innerHTML = `<a href="/select-treatments" data-link>BOOKING</a>`
        navbar.appendChild(bookingStartEle)

        if (role === "ROLE_ADMIN") {
            //Admin ( Skal bruge admin path og Opret Bruger
            const adminEle = document.createElement("li")
            adminEle.innerHTML = `<a href="/admin" data-link>ADMIN</a>`
            navbar.appendChild(adminEle)

            navbar.removeChild(bookingStartEle) //TODO:Admin skal ikke kunne booke en tid - de skal være i stand til at redigere eller slette bookinger. Kræver et anderledes kald eller flow her.

            //!Opret Bruger ifAdmin => Opret Bruger har udvidet funktionalitet.
            createUserJSHTML(navbar)
        }
        //TODO: KONTAKT OM OS BLA BLA BLA
        createContactJSHTML(navbar)

        //Logout
        const logOutEle = document.createElement("li")
        logOutEle.innerHTML = `<a href="#" id="logout-link">LOG UD</a>`
        navbar.appendChild(logOutEle)

    } else {
        //Home button
        createHomeJSHTML(navbar)

        //Behandlinger - Hvis vi ikke vil have det her så fjerner vi bare de her linjer kode.
        const treatmentsEle = document.createElement("li")
        treatmentsEle.innerHTML = `<a href="/behandlinger" data-link>SE BEHANDLINGER</a>`
        navbar.appendChild(treatmentsEle)



        //!Login
        const logInEle = document.createElement("li")
        logInEle.innerHTML = `<a href="/login" data-link>LOG IN</a>`
        navbar.appendChild(logInEle)

        //!Opret Bruger
        //Udskilt til metode, da det bruges mere end ét sted.
        /*
        const createUserEle = document.createElement('li')
        createUserEle.innerHTML = `<a href="/opret" data-link>OPRET BRUGER</a>`
        navbar.appendChild(createUserEle)
         */
        createUserJSHTML(navbar)

        //Contact us
        createContactJSHTML(navbar)

    }

}

function createUserJSHTML(navbar) {
    const createUserEle = document.createElement('li')
    createUserEle.innerHTML = `<a href="/opret" data-link>OPRET BRUGER</a>`
    navbar.appendChild(createUserEle)
}

function createHomeJSHTML(navbar) {
    const homeEle = document.createElement("li")
    homeEle.innerHTML = `<a href="/" data-link>HOME</a>`
    navbar.appendChild(homeEle)
}
function createContactJSHTML(navbar) {
    const contactEle = document.createElement("li")
    contactEle.innerHTML = `<a href="/kontakt" data-link>KONTAKT</a>`
    navbar.appendChild(contactEle)
}