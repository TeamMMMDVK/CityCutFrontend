
export function populateNavBar (role) {
    const navbar = document.getElementById("linkbar");
    let loggedInBool = localStorage.getItem("loggedInBool") === "true"
    //Konverter storage variabel til boolean. .getItem returnerer en streng,
    // hvorfor det er nødvendigt at compare med 'true' for at få den til at køre ordentligt.

/*
    let html ="";
    html += `<li><a href="/testme" data-link>TEST</a></li>`
 */

    const newItem = document.createElement('li')
    newItem.innerHTML = `<a href="/testme" data-link>TEST</a>`
    navbar.appendChild(newItem)

    if (loggedInBool) {

        //Book Flow
        //Logout
        const logOutEle = document.createElement("li")
        logOutEle.innerHTML = `<li><a href="#" id="logout-link">LOG UD</a></li>`
        navbar.appendChild(logOutEle)


        if (role === "ROLE_ADMIN") {
            //Admin ( Skal bruge admin path og Opret Bruger
        }
    } else {
        //!Opret Bruger

        //!Login
        const logInEle = document.createElement("li")
        logInEle.innerHTML = `<a href="/login" data-link>LOG IN</a>`
        navbar.appendChild(logInEle)


    }
    //Behandlinger

    //Calendar









}