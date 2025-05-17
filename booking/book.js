import {getAvailableTimeslots} from "./timeslots.js";
export default () => {
    setTimeout(renderTimeslotSelection, 0)
    return `
    <h1>Book en tid</h1>
    <p>Consectetur in vitae totam nulla reprehenderit est earum debitis quam laboriosam.</p>
    <div id="bookingContainer"></div>
`};
async function renderTimeslotSelection() {
    const timeslotArr = await getAvailableTimeslots()
    const bookingContainer = document.getElementById("bookingContainer")
    let selectedTimeslots = JSON.parse(localStorage.getItem("selectedTimeSlots")) || []

    timeslotArr.forEach(t => {
        let timeslotDiv = document.createElement("div")
        timeslotDiv.id = t.id
        timeslotDiv.innerHTML = t.time
        timeslotDiv.classList.add("timeslot")
        bookingContainer.appendChild(timeslotDiv)

        if (selectedTimeslots.some(slot => slot.id === t.id)) {
            timeslotDiv.classList.add("selected")
        }

        timeslotDiv.addEventListener('click', function() {
            const index = selectedTimeslots.findIndex(slot => slot.id === t.id)

            if (index > -1 ) {
                selectedTimeslots.splice(index, 1)
                timeslotDiv.classList.remove("selected")
            } else {
                selectedTimeslots.push(t)
                timeslotDiv.classList.add("selected")
            }
            localStorage.setItem("selectedTimeslot", JSON.stringify(selectedTimeslots))
        })
    })


}