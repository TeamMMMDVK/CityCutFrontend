export default function admin() {
    return `
        <section class="admin-section">
            <h2>Admin Panel</h2>
            <button id="add-treatment-btn">TILFØJ BEHANDLING</button>
        </section>
    `;
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "add-treatment-btn") {
        history.pushState("", "", "/treatments/add");
        const navEvent = new PopStateEvent("popstate");
        dispatchEvent(navEvent);
    }
});