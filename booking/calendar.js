export default function calendar() {
    const html = `<div id="calendar"></div>`;

    setTimeout(() => {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;

        if (window.FullCalendar) {
            renderCalendar(calendarEl);
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.17/index.global.min.js';
            script.onload = () => renderCalendar(calendarEl);
            document.head.appendChild(script);
        }
    }, 0);

    return html;
}

function renderCalendar(calendarEl) {
    const data = [
        {date: '2025-05-10', available: true},
        {date: '2025-05-12', available: false},
        {date: '2025-05-15', available: true},
        {date: '2025-05-18', available: false}
    ];

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 'auto',
        contentHeight: 'auto',
        expandRows: false,
        headerToolbar: {left: 'prev,next today', center: 'title', right: ''},
        events: data.map(d => ({
            start: d.date,
            display: 'background',
            backgroundColor: d.available ? 'green' : 'red',
            allDay: true
        })),
        dateClick: info => alert(`You clicked on ${info.dateStr}`)
    });

    calendar.render();
}