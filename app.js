import book from "./booking/book.js";
import {renderLoginForm, setupLoginFormEvents} from "./auth/login.js";
import home from "./home.js"
import treatments from "./booking/treatments.js"
import contact from "./contact.js"
import {renderRegisterForm, setupRegisterFormEvents} from "./auth/registration.js"
import renderAddNewTreatment from "./booking/addNewTreatment.js";

const routes = {
    "/": {title: "Home", render: home},
    "/book": {title: "Book", render: book},
    "/login": {
        title: "Login", render: () => {
            const html = renderLoginForm()
            setTimeout(() => setupLoginFormEvents(), 0) //sikrer at DOM'en er klar
            return html
        }
    },
    "/behandlinger": {title: "behandlinger", render: treatments},
    "/kontakt": {title: "Kontakt", render: contact},
    "/opret": {
        title: "Opret bruger", render: () => {
            const role = sessionStorage.getItem("role") //rolle tages fra session storage
            const currentUserRole = role ? role : "ROLE_CUSTOMER" //hvis bruger endnu ikke er logget ind, dvs. ingen rolle er gemt, så er default rolle "customer"
            console.log("currentUser: ", currentUserRole)
            const html = renderRegisterForm(currentUserRole);
            setTimeout(() => setupRegisterFormEvents(currentUserRole), 0);//sikrer at DOM'en er klar
            return html;
        }
    },
    "/treatments/add": {
        title: "Add treatment", render: () => {
            renderAddNewTreatment();
            return ""
        }
    }
};

const app = document.getElementById("app")

function updateMenu() {
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");
    const isAdmin = role === "ROLE_ADMIN";

    const adminMenu = document.getElementById("adminMenu");
    const loginLink = document.getElementById("loginLink");

    if (adminMenu) adminMenu.style.display = isAdmin ? "inline" : "none";
    if (loginLink) loginLink.textContent = token ? "Log ud" : "Login";

    if (token && loginLink) {
        loginLink.onclick = (e) => {
            e.preventDefault();
            sessionStorage.clear();
            alert("Du er nu logget ud.");
            history.pushState("", "", "/");
            router();
        };
    }
}

function router() {
    let view = routes[location.pathname];

    if (view) {

        // Adgangskontrol
        if (view.requiresAuth) {
            const token = sessionStorage.getItem("token");
            const role = sessionStorage.getItem("role");

            if (!token || (view.requiredRole && role !== view.requiredRole)) {
                alert("Du har ikke adgang til denne side.");
                history.pushState("", "", "/login");
                router();
                return;
            }
        }

        document.title = view.title;
        // Her indsættes det dynamiske indhold
        const result = view.render();
        if (typeof result === "string" && result.trim()) {
            app.innerHTML = result; // only set innerHTML if something is returned
        }
    } else {
        history.replaceState("", "", "/");
        router();
    }
}

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", () => {
    updateMenu();
    router();
})