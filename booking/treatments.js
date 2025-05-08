export default () => {
    setTimeout(fetchAndRenderTreatmentsFromDB, 0)
    return `
    <h1>Behandlinger</h1>
    <p>Vita formosa est, et ad plenissimam meretur fruendum..</p>
    <div id="treatmentsContainer">Loading treatments...</div>`;
};
const urlGetAllTreatmentsFromDB = "http://localhost:8080/api/v1/treatment/treatments"

async function fetchAndRenderTreatmentsFromDB() {
    const container = document.getElementById("treatmentsContainer")

    try {
        const response = await fetch(urlGetAllTreatmentsFromDB)
        const data = await response.json();
        console.log(data, "Data.json")
        console.log(response, "response")
        container.innerHTML =
        `
        <table>
            <thead>
                <tr>
                    <th>Treatment Title</th>
                    <th>Treatment Description</th>
                    <th>Treatment Price</th>
                </tr>
            </thead>
            <tbody>
                ${data.forEach(t => `
                    <tr>
                        <td>${t.title}</td>
                        <td>${t.description}</td>
                        <td>${t.price}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        `;
    } catch(err) {
        container.innerHTML= `<p>Something went wrong fetching the treatments.</p>`
        console.log(err)
    }

}