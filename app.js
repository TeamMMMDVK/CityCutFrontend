import book from "./booking/book.js";
import login from "./auth/login.js";
import home from "./home.js"
import treatments from "./booking/treatments.js"
import contact from "./contact.js"
import {renderRegisterForm, setupRegisterFormEvents} from "./auth/registration.js"

const routes = {
    "/": { title: "Home", render: home },
    "/book": { title: "Book", render: book },
    "/login": { title: "Login", render: login },
    "/behandlinger": { title: "behandlinger", render: treatments },
    "/kontakt": { title: "Kontakt", render: contact },
    "/opret": {
        title: "Opret bruger", render: () => {
            const html = renderRegisterForm();
            setTimeout(() => setupRegisterFormEvents(), 0);//sikrer at DOM'en er klar
            return html;
        }
    },

};

const app = document.getElementById("app")

function router() {
    let view = routes[location.pathname];

    if (view) {
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
};

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
window.addEventListener("DOMContentLoaded", router);