export function renderTreatmentSelectionView() {
    const app = document.getElementById("app");
    app.innerHTML = `
    <section id="treatment-selection-view">
      <h1>Vælg behandlinger</h1>
      <div id="treatment-list"></div>
      <button id="continue-btn">Fortsæt</button>
    </section>
  `;

    fetch("http://localhost:8080/api/v1/treatments") // backend URL
        .then(res => res.json())
        .then(treatments => {
            const container = document.getElementById("treatment-list");
            treatments.forEach(t => {
                container.innerHTML += `
          <label>
            <input type="checkbox" value="${t.id}"> ${t.name} (${t.durationMin} min)
          </label><br>
        `;
            });
        });

    document.getElementById("continue-btn").addEventListener("click", () => {
        const selected = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
            .map(cb => cb.value);

        if (selected.length === 0) {
            alert("Vælg mindst én behandling.");
            return;
        }

        localStorage.setItem("selectedTreatments", JSON.stringify(selected));

        // Programmatically switch to calendar view
        window.history.pushState(null, null, "/calendar");
        dispatchEvent(new PopStateEvent("popstate")); // trigger SPA reload
    });
}
