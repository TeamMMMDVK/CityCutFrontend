export async function getAvailableTimeslots(){
    let treatments = JSON.parse(localStorage.getItem("treatments"));
    console.log(treatments)
    let date = localStorage.getItem("date")
    const params = new URLSearchParams();
    treatments.forEach(t => params.append("treatments", t));
    params.append("date", date);

    const url = `http://localhost:8081/api/v1/timeslots?${params.toString()}`;

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