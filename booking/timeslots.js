export default () => {
    setTimeout(fetchAndRenderTimeslots, 0)
    return `
    <h1>Timeslots</h1>
    <div id="timeslot-container">Loading treatments...</div>`;
};

async function fetchAndRenderTimeslots() {
    console.log("Fetching timeslots...");
    const container = document.getElementById("timeslot-container");

    try {
        const timeslots = await getAvailableTimeslots();
        console.log("Timeslots:", timeslots);

        if (!timeslots || timeslots.length === 0) {
            container.innerHTML = `<p>No available timeslots for chosen date and treatments.</p>`;
            return;
        }

        container.innerHTML = `
            ${timeslots.map(t => `<button class="timeslot-button">${t.time}</button>`).join("\n")}
        `;
    } catch (err) {
        container.innerHTML = `<p>Something went wrong fetching the timeslots.</p>`;
        console.error(err);
    }
}
export async function getAvailableTimeslots(){


    let treatments = JSON.parse(localStorage.getItem("treatments"));
    console.log(treatments)
    let date = localStorage.getItem("date")
    const params = new URLSearchParams();
    treatments.forEach(t => params.append("treatments", t));
    params.append("date", date);
    params.append("stylist", "1");

    const url = `http://157.180.73.234:8080/api/v1/timeslots?${params.toString()}`;

    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }catch (err){
        console.log(err);
    }
}