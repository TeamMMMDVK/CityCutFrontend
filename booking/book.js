import {getAvailableTimeslots} from "./timeslots.js";
export default () => {
    setTimeout(renderTimeslotSelection, 0)
    return `
    <h1>Book en tid</h1>
    <p>Consectetur in vitae totam nulla reprehenderit est earum debitis quam laboriosam.</p>
    <div id="bookingContainer"></div>
`};
const stylistIDHC = 1; //Refactor this when scaling up for more stylists

async function renderTimeslotSelection() {
    const timeslotArr = await getAvailableTimeslots()
    const bookingContainer = document.getElementById("bookingContainer")
    let selectedTimeslots = JSON.parse(localStorage.getItem("selectedTimeSlots")) || []
    //TODO: Need to add logic if timeslots are unavailable.
    let treatments = JSON.parse(localStorage.getItem("treatments")) //Defined earlier
    //console.log("treatments",treatments)

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
                console.log(selectedTimeslots)
                timeslotDiv.classList.add("selected")
            }
            localStorage.setItem("selectedTimeslot", JSON.stringify(selectedTimeslots))
        })
    })
    let checkboxInp = document.createElement("input")
    checkboxInp.type="checkbox"
    checkboxInp.id="consentCheckbox"
    checkboxInp.required = true;
    bookingContainer.appendChild(checkboxInp)
    let checkboxLabelInp = document.createElement("label")

    checkboxLabelInp.htmlFor="consentCheckbox"
    checkboxLabelInp.textContent="Confirm your booking selection. You also consent to our privacy and cookie policies."
    bookingContainer.appendChild(checkboxLabelInp)

    let button = document.createElement("button")
    button.innerHTML="Submit booking"
    button.type="submit"
    button.disabled = true;
    button.style.opacity =0.5;
    bookingContainer.appendChild(button)

    checkboxInp.addEventListener('change', function() {
        button.disabled=!this.checked;
        button.style.opacity=this.checked ? 1 : 0.5
    } )

    button.addEventListener('click', async () => {
        //alert("Click")
        const timeslotIds = selectedTimeslots.map(slot => slot.id);
        //console.log(timeslotIds, "ids")
        let uID = sessionStorage.getItem("userID")
        let bookingObject = {
            stylistID : stylistIDHC,
            userID : uID,
            comment : "",
            treatmentIds : treatments,
            timeslotIds : timeslotIds

        }
        console.log(bookingObject)
        try {
            const response = await fetch("http://localhost:8081/api/v1/booking/", {
                method: 'POST',
                headers : { 'Content-Type' : 'application/json'},
                body : JSON.stringify(bookingObject)
            })
            if (!response.ok) throw new Error('Fejl ved oprettelse af booking')
            alert('Booking oprettet')

        }catch(error) {
            alert(error.message)
        }
    })





}