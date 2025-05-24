export function renderTreatmentSelectionView() {
    const app = document.getElementById("app");
    app.innerHTML = `
    <section id="treatment-selection-view">
      <h1>Vælg én eller flere behandlinger</h1>
      <div id="treatment-list"></div>
      <button id="continue-btn">Fortsæt</button>
    </section>
  `;

    fetch("http://157.180.73.234:8080/api/v1/treatments")
        .then(res => res.json())
        .then(treatments => {
            const container = document.getElementById("treatment-list");
            treatments.forEach(t => {
                const durationMin = t.timeslotAmount * 30;
                container.innerHTML += `
        <label>
          <input type="checkbox" value="${t.id}">
          ${t.title} - ${t.price} kr (${durationMin} min)
        </label><br>
      `;
            });
        });


    document.getElementById("continue-btn").addEventListener("click", () => {
        const selected = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
            .map(cb => Number(cb.value));

        if (selected.length === 0) {
            alert("Vælg mindst én behandling.");
            return;
        }

        localStorage.setItem("treatments", JSON.stringify(selected));


        window.history.pushState(null, null, "/calendar");
        dispatchEvent(new PopStateEvent("popstate"));
    });
}
