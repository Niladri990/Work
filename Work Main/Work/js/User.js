// User.js
  const wasteTypes = [
    {id:'wet', name:'Wet Waste', icon:'https://img.icons8.com/ios-filled/50/004085/wet.png', category:'biodegradable'},
    {id:'dry', name:'Dry Waste', icon:'https://img.icons8.com/ios-filled/50/004085/empty-box.png', category:'non-biodegradable'},
    {id:'plastic', name:'Plastic Waste', icon:'https://img.icons8.com/ios-filled/50/004085/plastic.png', category:'non-biodegradable'},
    {id:'ewaste', name:'E-Waste', icon:'https://img.icons8.com/ios-filled/50/004085/electronics.png', category:'non-biodegradable'},
    {id:'nonveg', name:'Non-Veg Waste', icon:'https://freesvg.org/img/1531813245.png', category:'biodegradable'},
    {id:'hazardous', name:'Hazardous Waste', icon:'https://tse1.mm.bing.net/th/id/OIP.2oCpxXrQyDdgQhe0AWNRhgAAAA?r=0&w=416&h=416&rs=1&pid=ImgDetMain&o=7&rm=3', category:'non-biodegradable'},
  ];

  const recyclingCenters = [
    {name: "Sunrise Recycling Center", lat: 28.6448, lng: 77.2167},
    {name: "GreenEarth Waste Processing", lat: 28.5355, lng: 77.3910},
    {name: "EcoCycle Hub", lat: 28.4089, lng: 77.3178},
  ];

  const polyFuelCenters = [
    {name: "PolyFuel Plant A", lat: 28.7041, lng: 77.1025},
    {name: "PolyFuel Plant B", lat: 28.6139, lng: 77.2090},
  ];

  let complaints = [];
  let scheduledCollections = [];
  let bookings = [];
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let selectedWasteType = null;

  // Render Report page
  function renderReport(){
    const wasteOptionsHtml = wasteTypes.map(wt => `
      <div class="dropdown-item" data-id="${wt.id}">
        <img src="${wt.icon}" alt="${wt.name} icon" style="width:24px; height:24px; vertical-align: middle; margin-right: 8px;"/><span>${wt.name}</span>
      </div>
    `).join('');

    const html = `
      <h2>Report an Issue</h2>
      <form id="reportForm" novalidate>
        <div class="form-group">
          <label>Location Type</label>
          <div class="location-type-container">
            <label><input type="radio" name="locationType" value="House" required /> House</label>
            <label><input type="radio" name="locationType" value="Flat" /> Flat</label>
            <label><input type="radio" name="locationType" value="Society" /> Society</label>
            <label><input type="radio" name="locationType" value="Locality" /> Locality</label>
            <label><input type="radio" name="locationType" value="Panchayat" /> Panchayat</label>
          </div>
        </div>
        <div class="form-group">
          <label for="wasteTypeDropdown"></label>
          <div class="dropdown" id="wasteTypeDropdown">
            <div class="dropdown-toggle" tabindex="0" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="dropdownLabel">
              <span class="selection">Select Waste Type</span>
              <svg style="width:18px; height:18px;" fill="#000000" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>
            </div>
            <div class="dropdown-menu" role="listbox" tabindex="-1" aria-activedescendant="">
              ${wasteOptionsHtml}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Material Types</label>
          <div id="materialTypesContainer">
            <!-- Checkboxes will be populated dynamically -->
          </div>
        </div>

        <div class="form-group" style="display: flex; align-items: center; gap: 1rem;">
          <label for="description" style="margin: 0;">Description</label>
          <textarea id="description" placeholder="Describe the issue briefly" required rows="4" style="flex: 1;"></textarea>
        </div>
        <div class="form-group">
          <label for="location">Location or Landmark</label>
          <input type="text" id="location" placeholder="Enter location" style="min-height: 2.5rem; font-size: 1.1rem;"/>
        </div>
        <div class="btn-container">
          <button type="button" class="btn submit-btn" id="uploadBtn">
            <label for="photoInput" style="display:flex; align-items:center; cursor:pointer; gap:0.4rem; margin:0;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M12 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z"/></svg>
              Upload Photo
            </label>
          </button>
          <button type="button" class="btn gps-btn" onclick="getCurrentLocationReport()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            Use My Location
          </button>
          <button type="button" class="btn submit-btn" id="submitComplaintBtn" onclick="submitComplaint()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M2 21L23 12 2 3V10L17 12L2 14V21Z"/></svg>
            Submit
          </button>
          <input id="photoInput" type="file" accept="image/*" multiple style="display:none;" />
        </div>
        <div id="gpsInfoReport" style="color: var(--accent-color); font-size: 0.85rem; margin-top: 0.3rem;"></div>

        <div class="nearest-center" id="nearestCenter" aria-live="polite" style="display:none;"></div>
      </form>

      <!-- Leaderboard Table Section -->
      <h3 style="color: var(--gov-blue); border-bottom: 3px solid var(--accent-orange); padding-bottom: 0.3rem; margin-top: 2rem;">Leaderboard</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; box-shadow: var(--box-shadow); border-radius: var(--border-radius); overflow: hidden;">
        <thead>
          <tr style="background-color: var(--gov-blue); color: white;">
            <th style="padding: 0.75rem; text-align: left; font-weight: 700;">Rank</th>
            <th style="padding: 0.75rem; text-align: left; font-weight: 700;">Name</th>
            <th style="padding: 0.75rem; text-align: left; font-weight: 700;">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">1</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">House 1</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">150</td>
          </tr>
          <tr style="background-color: white;">
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">2</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">House 2</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">120</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">3</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">House 3</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">100</td>
          </tr>
          <tr style="background-color: white;">
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">4</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">House 4</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">80</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">5</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">House 5</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-weight: 600;">60</td>
          </tr>
        </tbody>
      </table>
    `;
    document.getElementById('pageContent').innerHTML = html;
    setupReportForm();
    setupMaterialTypesSelect();
  }

  function setupReportForm(){
    const dropdown = document.getElementById('wasteTypeDropdown');
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const selectionSpan = toggle.querySelector('.selection');
    const uploadBtn = document.querySelector('#uploadBtn');
    const photoInput = document.getElementById('photoInput');

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
      toggle.setAttribute('aria-expanded', expanded);
      menu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        selectedWasteType = item.getAttribute('data-id');
        const waste = wasteTypes.find(w => w.id === selectedWasteType);
        selectionSpan.innerHTML = `<img src="${waste.icon}" alt="${waste.name} icon" style="width:24px; height:24px; vertical-align: middle; margin-right: 8px;"/> ${waste.name}`;
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        populateMaterialTypes(selectedWasteType);
        validateForm();
      });
    });

    photoInput.addEventListener('change', () => {
      if(photoInput.files.length > 0){
        uploadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M12 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z"/></svg> Upload (${photoInput.files.length} photo${photoInput.files.length>1?'s':''})`;
      } else {
        uploadBtn.innerHTML = `<label for="photoInput" style="display:flex; align-items:center; cursor:pointer; gap:0.4rem; margin:0;"><svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M12 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z"/></svg> Upload Photo</label>`;
      }
      validateForm();
    });

    document.getElementById('description').addEventListener('input', validateForm);
    document.getElementById('location').addEventListener('input', () => {
      validateForm();
      updateNearestCenter();
    });
    document.querySelectorAll('input[name="locationType"]').forEach(radio => radio.addEventListener('change', validateForm));

    document.getElementById('reportForm').addEventListener('submit', e => {
      e.preventDefault();
      submitComplaint();
    });
  }

  function submitComplaint(){
    const descVal = document.getElementById('description').value.trim();
    const locVal = document.getElementById('location').value.trim();
    const photoInput = document.getElementById('photoInput');
    const locType = document.querySelector('input[name="locationType"]:checked');
    const selectedMaterials = Array.from(document.querySelectorAll('input[name="materialTypes"]:checked')).map(cb => cb.value);

    if(!selectedWasteType || !descVal || !locVal || !locType){
      alert("Please fill all mandatory fields.");
      return;
    }
    if(selectedMaterials.length === 0){
      alert("Please select at least one material type.");
      return;
    }

    const photoNames = Array.from(photoInput.files).map(f => f.name).join(', ');

    const complaint = {
      id: Date.now(),
      type: selectedWasteType,
      materials: selectedMaterials,
      locationType: locType.value,
      description: descVal,
      location: locVal,
      photo: photoNames || null,
      status: 'Pending',
      date: new Date().toLocaleString()
    };
    complaints.push(complaint);

    alert("Complaint submitted successfully.");
    selectedWasteType = null;

    // Offer to schedule a collection for the reported waste type
    if (confirm("Would you like to schedule a collection for this waste type?")) {
      navigateTo('schedule');
      // Open modal for today's date and pre-select the waste type
      const today = new Date().toISOString().split('T')[0];
      openScheduleModal(today);
      // Pre-select the waste type after a short delay to ensure modal is rendered
      setTimeout(() => {
        const cb = document.querySelector(`input[name="scheduleWasteTypes"][value="${complaint.type}"]`);
        if (cb) cb.checked = true;
      }, 100);
    } else {
      navigateTo('complaints');
    }
  }

  function renderComplaints(){
    let html = `<h2>My Complaints</h2>`;
    if(complaints.length === 0){
      html += `<p>No complaints submitted yet.</p>`;
    } else {
      html += '<ul style="list-style:none; padding-left:0;">';
      complaints.forEach(c => {
        const waste = wasteTypes.find(w => w.id === c.type);
        const materialsList = c.materials ? c.materials.join(', ') : '';
        html += `<li style="margin-bottom: 1rem; padding:1rem; border:1px solid var(--border-color); border-radius: var(--border-radius); background:#f9f9f9; box-shadow: var(--shadow);">
          <img src="${waste.icon}" alt="${waste.name} icon" style="width:24px; height:24px; vertical-align: middle"/>
          <strong> ${waste.name}</strong> (${c.locationType})<br/>
          <strong>Materials:</strong> ${materialsList}<br/>
          <strong>Description:</strong> ${c.description}<br/>
          <strong>Location:</strong> ${c.location}<br/>
          <strong>Date:</strong> ${c.date}<br/>
        <strong>Status:</strong> ${c.status}
        ${c.photo ? `<br/><strong>Photo(s):</strong> ${c.photo}` : ''}
        ${c.status === 'Pending' ? `<br/><em>Expected resolution date/time: ${c.date}</em>` : ''}
      </li>`;
      });
      html += '</ul>';
    }
    document.getElementById('pageContent').innerHTML = html;
  }

  function renderDashboard(){
    document.getElementById('pageContent').innerHTML = `
      <h2>Dashboard Overview</h2>
      <p>Total Complaints Submitted: <strong>${complaints.length}</strong></p>
      <p>Pending: <strong>${complaints.filter(c => c.status === 'Pending').length}</strong></p>
      <p>Resolved: <strong>${complaints.filter(c => c.status === 'Resolved').length}</strong></p>
      <p>Rejected: <strong>${complaints.filter(c => c.status === 'Rejected').length}</strong></p>
      <p>This dashboard can be expanded with charts and city statistics.</p>
    `;
  }

  function renderBooking(){
    const wasteTypeCheckboxes = wasteTypes.map(wt => `
      <label style="flex:1 1 45%; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.6rem; cursor:pointer;">
        <input type="checkbox" name="bookingWasteTypes" value="${wt.id}" />
        <img src="${wt.icon}" alt="${wt.name} icon" style="width:24px; height:24px;" />
        <span>${wt.name}</span>
      </label>
    `).join('');

    document.getElementById('pageContent').innerHTML = `
      <h2>Schedule Conservancy Service</h2>
      <form id="bookingForm" novalidate>
        <div class="form-group">
          <label for="locationTypeBooking">Location Type</label>
          <div class="location-type-container">
            <label><input type="radio" name="locationTypeBooking" value="House" required /> House</label>
            <label><input type="radio" name="locationTypeBooking" value="Flat" /> Flat</label>
            <label><input type="radio" name="locationTypeBooking" value="Society" /> Society</label>
            <label><input type="radio" name="locationTypeBooking" value="Locality" /> Locality</label>
            <label><input type="radio" name="locationTypeBooking" value="Panchayat" /> Panchayat</label>
          </div>
        </div>

        <div class="form-group">
          <label for="pickupLocation">Pickup Location</label>
          <input type="text" id="pickupLocation" placeholder="Enter pickup location manually"/>
        </div>

        <div class="form-group">
          <label for="startDate">Start Date</label>
          <input type="date" id="startDate" name="startDate" required />
        </div>
        
        <div class="form-group">
          <label for="endDate">End Date</label>
          <input type="date" id="endDate" name="endDate" required />
        </div>

        <div class="form-group">
          <label for="frequency">Frequency</label>
          <select id="frequency" name="frequency" required>
            <option value="" disabled selected>Select Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:1rem; margin-top:1rem; margin-bottom:1rem;">
          ${wasteTypeCheckboxes}
        </div>

        <div class="form-group">
          <label for="remarks">Additional Remarks</label>
          <textarea id="remarks" name="remarks" rows="3" placeholder="Optional instructions or notes"></textarea>
        </div>

        <div class="btn-container">
          <button type="submit" class="submit-btn" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M17 17H7V15H17V17M17 13H7V11H17V13M14 9H7V7H14V9Z"/></svg>
            Book Service
          </button>
        </div>
      </form>
    `;

    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = bookingForm.querySelector('button.submit-btn');

    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const todayStr = new Date().toISOString().split('T')[0];
    startDateInput.min = todayStr;
    endDateInput.min = todayStr;

    startDateInput.addEventListener('change', () => {
      endDateInput.min = startDateInput.value || todayStr;
      if(endDateInput.value < endDateInput.min){
        endDateInput.value = '';
      }
      validateBookingForm();
    });
    endDateInput.addEventListener('change', validateBookingForm);
    bookingForm.frequency.addEventListener('change', validateBookingForm);
    bookingForm.querySelectorAll('input[name="locationTypeBooking"]').forEach(radio => radio.addEventListener('change', validateBookingForm));
    bookingForm.querySelectorAll('input[name="bookingWasteTypes"]').forEach(cb => cb.addEventListener('change', validateBookingForm));
    document.getElementById('pickupLocation').addEventListener('input', validateBookingForm);

    function validateBookingForm() {
      const locTypeChecked = Boolean(bookingForm.querySelector('input[name="locationTypeBooking"]:checked'));
      const sd = startDateInput.value;
      const ed = endDateInput.value;
      const freq = bookingForm.frequency.value;
      const wasteTypesChecked = Array.from(bookingForm.querySelectorAll('input[name="bookingWasteTypes"]:checked')).length > 0;
      const pickupLocation = document.getElementById('pickupLocation').value.trim();
      submitBtn.disabled = !(locTypeChecked && sd && ed && freq && (ed >= sd) && wasteTypesChecked && pickupLocation);
    }

    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const bookingData = {
        id: Date.now(),
        locationType: bookingForm.querySelector('input[name="locationTypeBooking"]:checked').value,
        pickupLocation: document.getElementById('pickupLocation').value.trim(),
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        frequency: bookingForm.frequency.value,
        wasteTypes: Array.from(bookingForm.querySelectorAll('input[name="bookingWasteTypes"]:checked')).map(cb => cb.value),
        remarks: document.getElementById('remarks').value.trim(),
        date: new Date().toLocaleString()
      };
      bookings.push(bookingData);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      alert("Conservancy service booked successfully!");
      bookingForm.reset();
      submitBtn.disabled = true;
      document.getElementById('pickupLocation').value = '';
      // Optionally, update schedule calendar if visible
      if (document.querySelector('#calendar')) {
        renderSchedule();
      }
    });
  }

  function renderSchedule(){
    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const storedSchedules = localStorage.getItem('scheduledCollections');
    if(storedSchedules){
      scheduledCollections = JSON.parse(storedSchedules);
    }

    const storedBookings = localStorage.getItem('bookings');
    if(storedBookings){
      bookings = JSON.parse(storedBookings);
    }

console.log('renderSchedule called for', monthName, currentYear);

    let calendarHtml = `<h2>Waste Collection Schedule</h2>
    <div id="calendar" style="max-width: 900px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <button onclick="prevMonth()"><</button>
        <h3>${monthName} ${currentYear}</h3>
        <button onclick="nextMonth()">></button>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>`

    let date = 1;
    for (let i = 0; i < 6; i++) {
      calendarHtml += '<tr>';
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          calendarHtml += '<td></td>';
        } else if (date > daysInMonth) {
          calendarHtml += '<td></td>';
        } else {
          const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
          const scheduled = scheduledCollections.find(s => s.date === dateStr);
          const booking = bookings.find(b => b.startDate <= dateStr && b.endDate >= dateStr);
          const typesHtml = scheduled ? scheduled.types.map(wt => {
            const waste = wasteTypes.find(w => w.id === wt);
            const centerType = waste.category === 'biodegradable' ? 'Poly Fuel' : 'Recycling';
            return `<img src="${waste.icon}" alt="${waste.name} - ${centerType}" style="width:16px; height:16px;" title="${waste.name} - ${centerType}"/>`;
          }).join('') : '';
          const bookingHtml = booking ? `<div style="background-color: #e3f2fd; padding: 2px; border-radius: 3px; margin-top: 2px; font-size: 10px;">Booking</div>` : '';

          calendarHtml += `<td style="border: 1px solid #ccc; padding: 0.5rem; text-align: center; cursor: pointer;" onclick="openScheduleModal('${dateStr}')">${date}<br/>${typesHtml}${bookingHtml}</td>`;

          date++;

        }

      }

      calendarHtml += '</tr>';

      if (date > daysInMonth) break;

    }

    calendarHtml += '</tbody></table></div>';

    calendarHtml += `

      <div style="margin-top: 5rem;">

        <h3>Nearest Centers</h3>

        <label for="scheduleLocation">Your Location (latitude,longitude)</label>

        <input type="text" id="scheduleLocation" placeholder="e.g., 28.6139,77.2090" />

        <div class="btn-container" style="margin-top: 1rem;">
          <button onclick="getCurrentLocationSchedule()" class="gps-btn">Use My Location</button>
          <button onclick="showNearestCenters()" class="submit-btn">Get Nearest Centers</button>
        </div>

        <div id="nearestCentersInfo" style="margin-top: 1rem;"></div>

      </div>

      <!-- Schedule Modal -->

        <div id="scheduleModal" style="display:none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; justify-content: center; align-items: center;">

          <div style="background: white; padding: 1.5rem; border-radius: var(--border-radius); max-width: 600px; width: 90%; position: relative;">

          <h3>Schedule Collection for <span id="modalDate"></span></h3>

          <form id="scheduleForm">

            <div id="wasteTypeCheckboxes" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">

              ${wasteTypes.map(wt => `

                <label style="flex: 1 1 45%; display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">

                  <input type="checkbox" name="scheduleWasteTypes" value="${wt.id}" />

                  <img src="${wt.icon}" alt="${wt.name}" style="width: 24px; height: 24px;" />

                  <span>${wt.name}</span>

                </label>

              `).join('')}

            </div>

            <div style="display: flex; justify-content: space-between; gap: 1rem;">

              <button type="submit" class="submit-btn" style="flex: 1;">Save</button>

              <button type="button" class="submit-btn" style="flex: 1; background-color: #dc3545;" onclick="clearSchedule()">Clear</button>

              <button type="button" class="submit-btn cancel-btn" style="flex: 1; background-color: #6c757d;" onclick="closeScheduleModal()">Cancel</button>

            </div>

          </form>

          <button class="cancel-btn" onclick="closeScheduleModal()" aria-label="Close Schedule Modal" style="position: absolute; top: 10px; right: 10px; background: #6c757d; border: none; color: white; border-radius: 50%; width: 30px; height: 30px; font-size: 20px; line-height: 30px; cursor: pointer;">&times;</button>

        </div>

      </div>

    `;

    document.getElementById('pageContent').innerHTML = calendarHtml;

    const scheduleForm = document.getElementById('scheduleForm');

    scheduleForm.addEventListener('submit', e => {

      e.preventDefault();

      saveSchedule();

    });

  }

  function prevMonth() {

    currentMonth--;

    if (currentMonth < 0) {

      currentMonth = 11;

      currentYear--;

    }

    renderSchedule();

  }

  function nextMonth() {

    currentMonth++;

    if (currentMonth > 11) {

      currentMonth = 0;

      currentYear++;

    }

    renderSchedule();

  }

  function getCurrentLocationReport(){
    const gpsInfo = document.getElementById('gpsInfoReport');
    gpsInfo.textContent = "Getting location...";
    if (!navigator.geolocation) {
      gpsInfo.textContent = "Geolocation is not supported by this browser.";
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      gpsInfo.textContent = `Latitude ${lat}, Longitude ${lng}`;
      const locInput = document.getElementById('location');
      if(locInput) locInput.value = `${lat}, ${lng}`;
      updateNearestCenter(lat, lng);
    }, error => {
      gpsInfo.textContent = "";
      alert("Unable to retrieve your location.");
      console.error(error);
    }, {timeout:15000});
  }

  function getCurrentLocationSchedule(){
    const infoDiv = document.getElementById('nearestCentersInfo');
    infoDiv.textContent = "Getting location...";
    if (!navigator.geolocation) {
      infoDiv.textContent = "Geolocation is not supported by this browser.";
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      infoDiv.textContent = `Latitude ${lat}, Longitude ${lng}`;
      const locInput = document.getElementById('scheduleLocation');
      if(locInput) locInput.value = `${lat}, ${lng}`;
      showNearestCenters();
    }, error => {
      infoDiv.textContent = "";
      alert("Unable to retrieve your location.");
      console.error(error);
    }, {timeout:15000});
  }

  function updateNearestCenter(lat, lng){

    let centerContainer = document.getElementById('nearestCenter');

    if(!centerContainer) return;

    if(lat === undefined || lng === undefined){

      const locText = document.getElementById('location')?.value.trim();

      if(!locText){

        centerContainer.style.display = "none";

        return;

      }

      const parts = locText.split(',').map(p => p.trim());

      if(parts.length === 2){

        const l1 = parseFloat(parts[0]);

        const l2 = parseFloat(parts[1]);

        if(!isNaN(l1) && !isNaN(l2)){

          lat = l1; lng = l2;

        }

      }

    }

    if(lat === undefined || lng === undefined){

      centerContainer.style.display = "none";

      return;

    }

    let minDist = Infinity;

    let nearest = null;

    recyclingCenters.forEach(center => {

      const dist = getDistance(lat, lng, center.lat, center.lng);

      if(dist < minDist){

        minDist = dist;

        nearest = center;

      }

    });

    if(nearest){
      centerContainer.innerHTML = `Nearest Recycling Center: <strong>${nearest.name}</strong> (~${minDist.toFixed(1)} km)`;
      centerContainer.style.display = "block";
    } else {
      centerContainer.style.display = "none";
    }
  }

  function getDistance(lat1, lng1, lat2, lng2){
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
  }

  function showNearestCenters(){
    const locText = document.getElementById('scheduleLocation').value.trim();
    if(!locText){
      alert("Please enter your location.");
      return;
    }
    const parts = locText.split(',').map(p => p.trim());
    if(parts.length !== 2){
      alert("Please enter location in format: latitude,longitude");
      return;
    }
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if(isNaN(lat) || isNaN(lng)){
      alert("Invalid coordinates.");
      return;
    }
    let nearestRecycling = null;
    let minDistRecycling = Infinity;
    recyclingCenters.forEach(center => {
      const dist = getDistance(lat, lng, center.lat, center.lng);
      if(dist < minDistRecycling){
        minDistRecycling = dist;
        nearestRecycling = center;
      }
    });
    let nearestPolyFuel = null;
    let minDistPolyFuel = Infinity;
    polyFuelCenters.forEach(center => {
      const dist = getDistance(lat, lng, center.lat, center.lng);
      if(dist < minDistPolyFuel){
        minDistPolyFuel = dist;
        nearestPolyFuel = center;
      }
    });
    const infoDiv = document.getElementById('nearestCentersInfo');
    infoDiv.innerHTML = `
      <p><strong>Nearest Recycling Center:</strong> ${nearestRecycling ? `${nearestRecycling.name} (~${minDistRecycling.toFixed(1)} km)` : 'None found'}</p>
      <p><strong>Nearest PolyFuel Center:</strong> ${nearestPolyFuel ? `${nearestPolyFuel.name} (~${minDistPolyFuel.toFixed(1)} km)` : 'None found'}</p>
    `;
  }

  function openScheduleModal(dateStr){
    document.getElementById('modalDate').textContent = dateStr;
    document.getElementById('scheduleModal').style.display = 'flex';
    const existing = scheduledCollections.find(s => s.date === dateStr);
    if(existing){
      document.querySelectorAll('input[name="scheduleWasteTypes"]').forEach(cb => {
        cb.checked = existing.types.includes(cb.value);
      });
    } else {
      document.querySelectorAll('input[name="scheduleWasteTypes"]').forEach(cb => cb.checked = false);
    }
  }

  function saveSchedule(){
    const dateStr = document.getElementById('modalDate').textContent;
    const selectedTypes = Array.from(document.querySelectorAll('input[name="scheduleWasteTypes"]:checked')).map(cb => cb.value);
    if(selectedTypes.length === 0){
      alert("Please select at least one waste type.");
      return;
    }
    const existingIndex = scheduledCollections.findIndex(s => s.date === dateStr);
    if(existingIndex >= 0){
      scheduledCollections[existingIndex].types = selectedTypes;
    } else {
      scheduledCollections.push({date: dateStr, types: selectedTypes});
    }
    localStorage.setItem('scheduledCollections', JSON.stringify(scheduledCollections));
    closeScheduleModal();
    renderSchedule();
  }

  function clearSchedule(){
    const dateStr = document.getElementById('modalDate').textContent;
    const existingIndex = scheduledCollections.findIndex(s => s.date === dateStr);
    if(existingIndex >= 0){
      scheduledCollections.splice(existingIndex, 1);
      localStorage.setItem('scheduledCollections', JSON.stringify(scheduledCollections));
    }
    closeScheduleModal();
    renderSchedule();
  }

  function closeScheduleModal(){
    document.getElementById('scheduleModal').style.display = 'none';
  }

  function navigateTo(page){
    const pages = {
      'report': renderReport,
      'booking': renderBooking,
      'complaints': renderComplaints,
      'schedule': renderSchedule,
      'dashboard': renderDashboard,
      'ridertracking': renderRiderTracking,
      'about': () => { document.getElementById('pageContent').innerHTML = '<h2>About</h2><p>This is the Eco Driver App for waste management.</p>'; },
      'profile': renderProfile
    };
    if(pages[page]){
      pages[page]();
    }
    // Update active nav button
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`nav button[onclick="navigateTo('${page}')"]`);
    if(activeBtn) activeBtn.classList.add('active');
  }

  // Rider Tracking simulation only
  function renderRiderTracking() {
    const html = `
      <h2>Rider Tracking Simulation</h2>
      <p>Simulate rider movement on the map below.</p>
      <div id="map" style="width: 100%; height: 400px; border-radius: var(--border-radius); box-shadow: var(--box-shadow); margin-top: 1rem;"></div>
      <div id="driverStatus" style="margin-top: 1rem; font-weight: bold; font-size: 1.1rem; color: var(--gov-blue);">
        Driver status: <span id="driverStatusText">Waiting for driver update...</span>
      </div>
      <button onclick="startDriverSimulation()" class="submit-btn" style="margin-top: 1rem;">Start Driver Simulation</button>
      <button onclick="stopDriverSimulation()" class="submit-btn" style="margin-top: 1rem; margin-left: 1rem;">Stop Simulation</button>
    `;
    document.getElementById('pageContent').innerHTML = html;
    initializeMap();
  }

  // Driver tracking simulation code (from Main2.html)
  let map, driverMarker, simulationInterval;
  const driverPath = [
    {lat: 28.6448, lng: 77.2167},
    {lat: 28.6455, lng: 77.2200},
    {lat: 28.6460, lng: 77.2250},
    {lat: 28.6470, lng: 77.2300},
    {lat: 28.6480, lng: 77.2350},
    {lat: 28.6490, lng: 77.2400},
    {lat: 28.6500, lng: 77.2450},
    {lat: 28.6510, lng: 77.2500},
    {lat: 28.6520, lng: 77.2550},
    {lat: 28.6530, lng: 77.2600},
  ];
  let currentDriverIndex = 0;
  const driverStatuses = [
    "Driver is starting from the current location.",
    "Driver is en route to pickup location.",
    "Driver has arrived at pickup location.",
    "Driver is picking up passenger.",
    "Driver is en route to destination.",
    "Driver has completed the trip."
  ];

  function initializeMap() {
    const startCoord = ol.proj.fromLonLat([driverPath[0].lng, driverPath[0].lat]);
    map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: startCoord,
        zoom: 14
      })
    });

    const driverFeature = new ol.Feature({
      geometry: new ol.geom.Point(startCoord)
    });

    driverFeature.setStyle(new ol.style.Style({
      image: new ol.style.Circle({
        radius: 8,
        fill: new ol.style.Fill({color: 'orange'}),
        stroke: new ol.style.Stroke({color: 'white', width: 2})
      })
    }));

    const vectorSource = new ol.source.Vector({
      features: [driverFeature]
    });
    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    map.addLayer(vectorLayer);

    driverMarker = driverFeature;
  }

  function animateMarker(marker, fromLatLng, toLatLng, duration) {
    const start = performance.now();
    const fromCoord = ol.proj.fromLonLat([fromLatLng.lng, fromLatLng.lat]);
    const toCoord = ol.proj.fromLonLat([toLatLng.lng, toLatLng.lat]);

    function easeInOutQuad(t) {
      return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    }

    function animate(time) {
      const elapsed = time - start;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeInOutQuad(t);

      const currentX = fromCoord[0] + (toCoord[0] - fromCoord[0]) * easedT;
      const currentY = fromCoord[1] + (toCoord[1] - fromCoord[1]) * easedT;

      marker.getGeometry().setCoordinates([currentX, currentY]);
      map.getView().setCenter([currentX, currentY]);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  }

  function startDriverSimulation() {
    if (simulationInterval) return;
    currentDriverIndex = 0;
    updateDriverStatus();

    function moveNext() {
      if (currentDriverIndex + 1 >= driverPath.length) {
        document.getElementById('driverStatusText').textContent = "Driver has completed the trip.";
        simulationInterval = null;
        return;
      }
      const from = driverPath[currentDriverIndex];
      const to = driverPath[currentDriverIndex + 1];
      animateMarker(driverMarker, from, to, 2800);
      currentDriverIndex++;
      updateDriverStatus();
      simulationInterval = setTimeout(moveNext, 3000);
    }
    moveNext();
  }

  function stopDriverSimulation() {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
      document.getElementById('driverStatusText').textContent = "Simulation stopped.";
    }
  }

  function updateDriverStatus() {
    let statusIndex = Math.min(currentDriverIndex, driverStatuses.length - 1);
    document.getElementById('driverStatusText').textContent = driverStatuses[statusIndex];
    const statusElem = document.getElementById('driverStatusText');
    statusElem.style.opacity = 0;
    setTimeout(() => {
      statusElem.style.transition = 'opacity 0.5s ease-in-out';
      statusElem.style.opacity = 1;
    }, 100);
  }

  function renderProfile(){
    const html = `
      <h2>User Profile</h2>
      <form id="profileForm" novalidate style="max-width: 400px;">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Enter your full name" style="width: 100%; padding: 0.5rem; border-radius: var(--border-radius); border: 1px solid var(--border-color);" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email address" style="width: 100%; padding: 0.5rem; border-radius: var(--border-radius); border: 1px solid var(--border-color);" />
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="tel" id="phone" placeholder="Enter your phone number" style="width: 100%; padding: 0.5rem; border-radius: var(--border-radius); border: 1px solid var(--border-color);" />
        </div>
        <div class="form-group">
          <label for="vehicle">Vehicle</label>
          <input type="text" id="vehicle" placeholder="Enter your vehicle details" style="width: 100%; padding: 0.5rem; border-radius: var(--border-radius); border: 1px solid var(--border-color);" />
        </div>
        <div class="btn-container" style="justify-content: flex-start;">
          <button type="button" class="submit-btn" onclick="saveProfile()">Save Profile</button>
        </div>
      </form>
      <div id="profileMessage" style="margin-top: 1rem; color: var(--primary-color); font-weight: 700;"></div>
    `;
    document.getElementById('pageContent').innerHTML = html;
    loadProfile();
  }

  function saveProfile(){
    const profile = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      vehicle: document.getElementById('vehicle').value.trim()
    };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    document.getElementById('profileMessage').textContent = "Profile saved successfully.";
  }

  function loadProfile(){
    const profileStr = localStorage.getItem('userProfile');
    if(profileStr){
      const profile = JSON.parse(profileStr);
      document.getElementById('name').value = profile.name || '';
      document.getElementById('email').value = profile.email || '';
      document.getElementById('phone').value = profile.phone || '';
      document.getElementById('vehicle').value = profile.vehicle || '';
    }
  }

  function setupMaterialTypesSelect(){
    // Assuming material types are predefined or fetched
    // For simplicity, using static
    const materialTypes = {
      'wet': ['Organic Waste', 'Food Scraps'],
      'dry': ['Paper', 'Plastic', 'Metal'],
      'plastic': ['Bottles', 'Bags'],
      'ewaste': ['Batteries', 'Wires'],
      'nonveg': ['Meat', 'Bones'],
      'hazardous': ['Chemicals', 'Paints']
    };
    // This function can be expanded
  }

  function populateMaterialTypes(wasteId){
    const container = document.getElementById('materialTypesContainer');
    const materials = {
      'wet': ['Organic Waste', 'Food Scraps'],
      'dry': ['Paper', 'Plastic', 'Metal'],
      'plastic': ['Bottles', 'Bags'],
      'ewaste': ['Batteries', 'Wires'],
      'nonveg': ['Meat', 'Bones'],
      'hazardous': ['Chemicals', 'Paints']
    };
    const options = materials[wasteId] || [];
    container.innerHTML = options.map(m => `<label><input type="checkbox" name="materialTypes" value="${m}" /> ${m}</label>`).join('<br/>');
  }

  function validateForm(){
    const desc = document.getElementById('description').value.trim();
    const loc = document.getElementById('location').value.trim();
    const locType = document.querySelector('input[name="locationType"]:checked');
    const photoInput = document.getElementById('photoInput');
    const submitBtn = document.querySelector('#submitComplaintBtn');
    const isValid = selectedWasteType && desc && loc && locType && photoInput.files.length > 0;
    submitBtn.disabled = !isValid;
  }

  function openSignInModal() {
    document.getElementById('signInModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('signInModal').style.display = 'none';
  }

  function switchTab(tab) {
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    if (tab === 'signIn') {
      signInTab.classList.add('active');
      signUpTab.classList.remove('active');
      signInForm.classList.add('active');
      signUpForm.classList.remove('active');
    } else {
      signUpTab.classList.add('active');
      signInTab.classList.remove('active');
      signUpForm.classList.add('active');
      signInForm.classList.remove('active');
    }
  }

  function toggleRiderOptions() {
    const role = document.getElementById('signUpRole').value;
    const riderOptions = document.getElementById('riderOptions');
    if (role === 'rider') {
      riderOptions.style.display = 'block';
    } else {
      riderOptions.style.display = 'none';
    }
  }

  function signIn() {
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    alert('Sign In successful!');
    closeModal();
  }

  function signUp() {
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const role = document.getElementById('signUpRole').value;
    const riderType = document.getElementById('riderType').value;
    if (!name || !email || !password || !role) {
      alert('Please fill in all fields.');
      return;
    }
    if (role === 'rider' && !riderType) {
      alert('Please select rider type.');
      return;
    }
    alert('Sign Up successful!');
    closeModal();
  }

  // Initialize the app
  document.addEventListener('DOMContentLoaded', () => {
    navigateTo('report'); // Default page
  });


