document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    if (!calendarEl) return;

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 500,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Sample scheduled collections
            { title: '🗑️ General Waste', start: '2024-06-10' },
            { title: '♻️ Recyclables', start: '2024-06-12' },
            { title: '🗑️ General Waste', start: '2024-06-15' },
            { title: '♻️ Recyclables', start: '2024-06-18' },
            { title: '🗑️ General Waste', start: '2024-06-20' },
            // Sample bookings
            { title: 'Booking: Pickup at 123 Main St', start: '2024-06-11', color: '#ff9500' },
            { title: 'Booking: Pickup at 456 Oak Ave', start: '2024-06-14', color: '#ff9500' }
        ],
        dateClick: function(info) {
            openScheduleModal(info.dateStr);
        }
    });

    calendar.render();

    // Modal elements
    var modal = document.getElementById('scheduleModal');
    var modalDate = document.getElementById('modalDate');
    var wasteTypeSelect = document.getElementById('wasteType');
    var saveBtn = document.getElementById('saveSchedule');
    var closeBtn = document.getElementById('closeModal');

    function openScheduleModal(dateStr) {
        modalDate.textContent = dateStr;
        wasteTypeSelect.value = '';
        modal.style.display = 'block';
    }

    function closeScheduleModal() {
        modal.style.display = 'none';
    }

    saveBtn.addEventListener('click', function() {
        var wasteType = wasteTypeSelect.value;
        if (!wasteType) {
            alert('Please select a waste type.');
            return;
        }
        calendar.addEvent({
            title: wasteType === 'general' ? '🗑️ General Waste' : '♻️ Recyclables',
            start: modalDate.textContent
        });
        closeScheduleModal();
    });

    closeBtn.addEventListener('click', closeScheduleModal);

    window.onclick = function(event) {
        if (event.target == modal) {
            closeScheduleModal();
        }
    };
});
