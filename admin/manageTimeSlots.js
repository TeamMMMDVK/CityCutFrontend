export function renderTimeSlotManager() {
    const app = document.getElementById("app");
    app.innerHTML = `
    <section id="time-slot-manager">
      <h2>Tilføj arbejdstid (tidsrum)</h2>

      <label for="day-select">Dag:</label>
      <select id="day-select">
        <option value="MONDAY">Mandag</option>
        <option value="TUESDAY">Tirsdag</option>
        <option value="WEDNESDAY">Onsdag</option>
        <option value="THURSDAY">Torsdag</option>
        <option value="FRIDAY">Fredag</option>
        <option value="SATURDAY">Lørdag</option>
      </select><br><br>

      <label for="start-time">Starttid:</label>
      <input type="time" id="start-time" /><br><br>

      <label for="end-time">Sluttid:</label>
      <input type="time" id="end-time" /><br><br>

      <button id="add-slot-btn">Tilføj tidsrum</button>
      <button id="add-default-btn">Tilføj standard 9-16</button>

      <div id="slot-result-msg" style="margin-top: 1rem;"></div>
    </section>
  `;

    const stylistId = 1;

    document.getElementById("add-slot-btn").addEventListener("click", () => {
        const day = document.getElementById("day-select").value;
        const start = document.getElementById("start-time").value;
        const end = document.getElementById("end-time").value;

        if (!start || !end) {
            alert("Vælg både start- og sluttid.");
            return;
        }

        const payload = {
            stylistId,
            dayOfWeek: day,
            startTime: start,
            endTime: end
        };

        fetch("http://localhost:8081/api/v1/timeslots", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    document.getElementById("slot-result-msg").innerText = "Tidsrum tilføjet.";
                } else {
                    throw new Error("Fejl ved oprettelse");
                }
            })
            .catch(err => {
                document.getElementById("slot-result-msg").innerText = "Fejl: " + err.message;
            });
    });

    document.getElementById("add-default-btn").addEventListener("click", () => {
        const day = document.getElementById("day-select").value;

        fetch("http://localhost:8081/api/v1/timeslots/default", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({
                stylistId: 1,
                dayOfWeek: day
            })
        })
            .then(res => res.ok ? "Standardtider tilføjet." : Promise.reject("Fejl"))
            .then(msg => document.getElementById("slot-result-msg").innerText = msg)
            .catch(() => document.getElementById("slot-result-msg").innerText = "Fejl ved standard-oprettelse.");
    });
}
