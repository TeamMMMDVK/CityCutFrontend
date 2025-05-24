export default function renderAddNewTreatment() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <h2>Tilføj Ny Behandling</h2>
    <form id="treatmentForm">
      <label for="title">Titel:</label>
      <input type="text" id="title" required>

      <label for="description">Beskrivelse:</label>
      <textarea id="description" rows="3" required></textarea>

      <label for="timeslotAmount">Antal Tidsblokke:</label>
      <input type="number" id="timeslotAmount" min="1" required>

      <label for="price">Pris (DKK):</label>
      <input type="number" id="price" step="0.01" min="0" required>

      <button type="submit">Tilføj Behandling</button>
    </form>
  `;

    document.getElementById('treatmentForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const treatment = {
            title: document.getElementById('title').value.trim(),
            description: document.getElementById('description').value.trim(),
            timeslotAmount: parseInt(document.getElementById('timeslotAmount').value, 10),
            price: parseFloat(document.getElementById('price').value),
        };

        try {
            const response = await fetch('http://157.180.73.234:8080/api/v1/treatments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(treatment)
            });

            if (!response.ok) throw new Error('Kunne ikke oprette behandlingen');
            alert('Behandling oprettet!');
            document.getElementById('treatmentForm').reset();
        } catch (error) {
            alert(error.message);
        }
    });
}