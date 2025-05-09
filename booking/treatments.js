export default () => {
    setTimeout(fetchAndRenderTreatmentsFromDB, 0)
    return `
    <h1>Behandlinger</h1>
    <p>Vita formosa est, et ad plenissimam meretur fruendum..</p>
    <div id="treatmentsContainer">Loading treatments...</div>`;
};
const urlGetAllTreatmentsFromDB = "http://localhost:8081/api/v1/treatments"

async function fetchAndRenderTreatmentsFromDB() {
    const container = document.getElementById("treatmentsContainer")

    try {
        const response = await fetch(urlGetAllTreatmentsFromDB)
        const data = await response.json();
        console.log(data, "data")

        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Behandling</th>
                        <th>Beskrivelse</th>
                        <th>Pris</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(t => `
                        <tr>
                            <td>${t.title}</td>
                            <td>${t.description}</td>
                            <td>${t.price} DKK</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;

    } catch(err) {
        container.innerHTML= `<p>Something went wrong fetching the treatments.</p>`
        console.log(err, "Error")
    }

}