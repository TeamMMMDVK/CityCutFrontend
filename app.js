import book from "./booking/book.js";
import {renderLoginForm, setupLoginFormEvents} from "./auth/login.js";
import renderAuthChoice from "./auth/authChoice.js";
import home from "./misc/home.js"
import treatments from "./booking/treatments.js"
import contact from "./misc/contact.js"
import {renderRegisterForm, setupRegisterFormEvents} from "./auth/registration.js"
import admin from "./admin/admin.js";
import calendar from "./booking/calendar.js";
import privacyPolicy from "./misc/privacyPolicy.js";
import cookiePolicy from "./misc/cookiePolicy.js";
import renderTimeslots from "./booking/timeslots.js";
import {renderTreatmentSelectionView} from "./booking/selectTreatments.js";
import {populateNavBar} from "./misc/linkbarRendering.js";


const routes = {
    "/": {title: "Home", render: home},
    "/timeslots": {title: "Book timeslot", render: renderTimeslots},
    "/book": {title: "Book", render: book}, //3
    "/select-treatments": {title: "Vælg behandlinger", render: renderTreatmentSelectionView}, //1
    "/login": {
        title: "Login",
        render: () => {
            const html = renderLoginForm();
            setTimeout(() => setupLoginFormEvents(), 0);
            return html;
        }
    },
    "/auth-choice": {title: "Login eller opret bruger", render: renderAuthChoice},
    "/behandlinger": {title: "behandlinger", render: treatments}, //Bare info panel
    "/calendar": {title: "calendar", render: calendar}, //2
    "/kontakt": {title: "Kontakt", render: contact},
    "/opret": {
        title: "Opret bruger",
        render: () => {
            const role = getRoleFromToken();
            const currentUserRole = role ? role : "ROLE_CUSTOMER";
            console.log("currentUser: ", currentUserRole);
            const html = renderRegisterForm(currentUserRole);
            setTimeout(() => setupRegisterFormEvents(currentUserRole), 0);
            return html;
        }
    },
    "/admin": { //needs to be hidden
        title: "Admin",
        render: () => {
            return admin();
        }
    },
    "/privatlivspolitik": {title: "privatlivspolitik", render: privacyPolicy},
    "/cookie-politik": {title: "cookie-politik", render: cookiePolicy}
};


const app = document.getElementById("app")


function router() {
    const path = location.pathname;
    const view = routes[path];

    const token = sessionStorage.getItem("token");
    const role = getRoleFromToken()

    // Beskyttede ruter med rollekrav
    const protectedRoutes = {
        "/admin": ["ROLE_ADMIN"]
        // Tilføj evt. flere beskyttede ruter her
    };

    if (protectedRoutes[path]) {
        if (!token) {
            history.replaceState("", "", "/login");
            populateNavBar(role)
            router(); // Kald router igen for at vise login-siden

            return;
        }
        if (!protectedRoutes[path].includes(role)) {
            alert("Du har ikke adgang til denne side.");
            history.replaceState("", "", "/");
            populateNavBar(role)
            router();

            return;
        }
    }

    if (view) {
        document.title = view.title;
        const result = view.render();
        populateNavBar(role)
        if (typeof result === "string" && result.trim()) {
            app.innerHTML = result;
        }
    } else {
        history.replaceState("", "", "/");
        populateNavBar(role)
        router();

    }
}

window.spaRouter = router //gør routeren global, så vi kan bruge den til at omdirigere korrekt i de andre js filer

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});

// LogOut
function logout() {
    sessionStorage.clear()
    localStorage.clear()

    alert("Du er nu logget ud.");
    history.pushState("", "", "/");
    router(); // Opdater visningen
}

//få rolle fra token
function getRoleFromToken() {
    const token = sessionStorage.getItem("token");
    if (!token) return null;

    const payload = token.split('.')[1];
    try {
        const decoded = JSON.parse(atob(payload));
        return decoded.role;
    } catch (e) {
        console.error("Token decoding failed", e);
        return null;
    }
}

// Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);

document.addEventListener("DOMContentLoaded", () => {
    let loggedInBool = false;
    localStorage.setItem("loggedInBool", loggedInBool)
    populateNavBar(getRoleFromToken())
    /*
        const logoutLink = document.getElementById("logout-link");
        if (logoutLink) {
            logoutLink.addEventListener("click", (e) => {
                e.preventDefault();
                logout();
            });
        }

     */
});
document.getElementById("linkbar").addEventListener('click', (e) => {
    if (e.target && e.target.id === "logout-link") {
        e.preventDefault()
        logout()
    }
})


