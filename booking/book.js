import {getAvailableTimeslots} from "./timeslots.js";

export default () => {
    setTimeout(renderTimeslotSelection, 0)
    return `
<section id="treatment-selection-view">
<div id="bookingRubrik">
    <h1>Book en tid</h1>
    <p>Hvilket tidspunkt passer dig bedst?</p>
    </div>
    <div id="bookingContainer"></div>
    </section>
`
};
const stylistIDHC = 1; //Refactor this when scaling up for more stylists

function bookingSuccesful(timeslots) {
    console.log("Her er jeg i metoden bookingSuccesful")
    const bookingContainer = document.getElementById("bookingContainer")
    const bookingRubrik = document.getElementById("bookingRubrik")
    bookingRubrik.innerHTML = " "
    bookingContainer.innerHTML = " ";

    bookingContainer.innerHTML = `
        <div class="success-message">
            <h2>Booking gennemført!</h2>
            <p>Tak for din booking. Du vil modtage en bekræftelse snarest.</p>
            <button id="backHome">Til forsiden</button>
        </div>
    `;
    document.getElementById("backHome").addEventListener("click", () => {
        history.pushState("", "", "/");
        window.spaRouter();
    });
}

async function renderTimeslotSelection() {

    const timeslotArr = await getAvailableTimeslots()
    const bookingContainer = document.getElementById("bookingContainer")
    let selectedTimeslots = JSON.parse(localStorage.getItem("selectedTimeSlots")) || []
    //TODO: Need to add logic if timeslots are unavailable.
    let treatments = JSON.parse(localStorage.getItem("treatments")) //Defined earlier
    //console.log("treatments",treatments)
    //console.log(timeslotArr)
    //console.log(timeslotArr.length)

    if (!timeslotArr || timeslotArr.length > 0) {

        timeslotArr.forEach(t => {
            let timeslotDiv = document.createElement("div")
            timeslotDiv.id = t.id
            timeslotDiv.innerHTML = t.time
            timeslotDiv.classList.add("timeslot")
            bookingContainer.appendChild(timeslotDiv)

            if (selectedTimeslots.some(slot => slot.id === t.id)) {
                timeslotDiv.classList.add("selected")
            }

            timeslotDiv.addEventListener('click', function () {
                const index = selectedTimeslots.findIndex(slot => slot.id === t.id)

                if (index > -1) {
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
        checkboxInp.type = "checkbox"
        checkboxInp.id = "consentCheckbox"
        checkboxInp.required = true;
        bookingContainer.appendChild(checkboxInp)
        let checkboxLabelInp = document.createElement("label")

        checkboxLabelInp.htmlFor = "consentCheckbox"
        checkboxLabelInp.textContent = "Venligst bekræft, at du med denne reservation accepterer" +
            " vores privatlivspolitik og cookie-politik"
        bookingContainer.appendChild(checkboxLabelInp)

        let button = document.createElement("button")
        button.id = "continue-btn"
        button.innerHTML = "Bekræft booking"
        button.type = "submit"
        button.disabled = true;
        button.style.opacity = 0.5;
        bookingContainer.appendChild(button)

        checkboxInp.addEventListener('change', function () {
            button.disabled = !this.checked;
            button.style.opacity = this.checked ? 1 : 0.5
        })

        button.addEventListener('click', async () => {
            //alert("Click")
            const timeslotIds = selectedTimeslots.map(slot => slot.id);
            //console.log(timeslotIds, "ids")
            let uID = sessionStorage.getItem("userID")

            const bookingObject = {
                stylistID: stylistIDHC,
                userID: uID ? parseInt(uID) : null,
                comment: "",
                treatmentIds: treatments,
                timeslotIds: timeslotIds
            }

            if (!uID || !localStorage.getItem("token")) {
                localStorage.setItem("pendingBooking", JSON.stringify(bookingObject));
                history.pushState("", "", "/auth-choice");
                window.spaRouter();
                return;
            }

            // Gennemfør bookingen
            await submitBooking(bookingObject);
        });

        async function submitBooking(bookingObject) {
            try {
                const response = await fetch("http://157.180.73.234:8080/api/v1/booking/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(bookingObject)
                })
                if (!response.ok) throw new Error('Fejl ved oprettelse af booking')
                alert('Booking oprettet')
                localStorage.removeItem("pendingBooking");
                bookingSuccesful(timeslotArr)

            } catch (error) {
                alert(error.message)
            }
        }
    } else {
        console.log("No timeslots in else block")
        bookingContainer.innerHTML = "No timeslots available."
    }
}