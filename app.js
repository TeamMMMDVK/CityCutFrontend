import book from "./booking/book.js";
import login from "./auth/login.js";
import home from "./home.js"
import treatments from "./booking/treatments.js"
import contact from "./contact.js"

const routes = {
    "/": { title: "Home", render: home },
    "/book": { title: "Book", render: book },
    "/login": { title: "Login", render: login },
    "/behandlinger": { title: "behandlinger", render: treatments },
    "/kontakt": { title: "Kontakt", render: contact },
};

const app = document.getElementById("app")

function router() {
    let view = routes[location.pathname];

    if (view) {
        document.title = view.title;
        // Her indsættes det dynamiske indhold
        app.innerHTML = view.render();
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