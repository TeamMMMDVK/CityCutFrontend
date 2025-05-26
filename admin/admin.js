export default function admin() {
    return `
    <section class="admin-section">
      <h2>Admin Panel</h2>
      <button id="add-treatment-btn">TILFØJ BEHANDLING</button>
      <button id="go-to-timeslot-btn">TILFØJ ARBEJDSTIDER</button>
    </section>
  `;
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "add-treatment-btn") {
        history.pushState("", "", "/treatments/add");
        dispatchEvent(new PopStateEvent("popstate"));
    }

    if (e.target && e.target.id === "go-to-timeslot-btn") {
        history.pushState("", "", "/admin/timeslots");
        dispatchEvent(new PopStateEvent("popstate"));
    }
});