export default function calendar() {
    const html = `<div id="calendar"></div>`;

    setTimeout(() => {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return console.warn('Calendar element not found');

        const init = () => renderCalendar(calendarEl);

        if (window.FullCalendar) init();
        else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.17/index.global.min.js';
            script.onload = init;
            document.head.appendChild(script);
        }
    }, 0);

    return html;
}

async function fetchAvailability(dates) {
    const stylistId = localStorage.getItem('stylistId') || 1;
    console.log("stylistId", stylistId)
    const treatmentIds = JSON.parse(localStorage.getItem('treatments') || '[1,2]');

    try {
        const res = await fetch(`http://localhost:8081/v1/calendar/availability?stylist=${stylistId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dates, treatmentIds}),
        });
        const data = await res.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch {
        return [];
    }
}

function getDateRange(start, end) {
    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().slice(0, 10));
    }
    return dates;
}

function onDateSelected(info) {
    localStorage.setItem('date', info.dateStr);
    history.pushState(null, null, "/book");
    window.spaRouter()
}

function renderCalendar(calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 'auto',
        headerToolbar: {left: 'prev,next today', center: 'title', right: ''},
        dateClick: onDateSelected,
        datesSet: async (info) => {
            const dates = getDateRange(info.start, info.end);
            const availability = await fetchAvailability(dates);

            calendar.removeAllEvents();
            availability.forEach(date => {
                const color = date.status === 'FULL' ? 'red' : date.status === 'PARTIAL' ? 'orange' : date.status === 'AVAILABLE' ? 'green' : 'gray';
                calendar.addEvent({start: date.date, display: 'background', color, allDay: true});
            });
        }
    });
    calendar.render();
}