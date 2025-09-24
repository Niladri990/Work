// NGO Rider.js
  let isOnline = false;
  let totalEarnings = 350;
  let trips = [
    { date: '2024-06-10', location: '123 Main St', amount: 150 },
    { date: '2024-06-11', location: '456 Oak Ave', amount: 200 }
  ];
  let notifications = [
    { id: 1, message: "New booking assigned: Pickup at 123 Main St.", read: false },
    { id: 2, message: "Schedule updated for tomorrow.", read: false },
    { id: 3, message: "Reminder: Vehicle maintenance due next week.", read: true }
  ];

  function toggleOnlineStatus() {
    isOnline = !isOnline;
    const button = document.getElementById('onlineToggle');
    if (isOnline) {
      button.textContent = 'Go Offline';
      button.classList.remove('offline');
      button.setAttribute('aria-pressed', 'true');
      document.body.style.backgroundColor = '#f0f8ff';
      // Notify Green Center
      localStorage.setItem('ngo_notification', JSON.stringify({
        message: "NGO Driver is now online and ready for assignments.",
        timestamp: new Date()
      }));
    } else {
      button.textContent = 'Go Online';
      button.classList.add('offline');
      button.setAttribute('aria-pressed', 'false');
      document.body.style.backgroundColor = 'var(--uber-gray)';
      // Notify Green Center
      localStorage.setItem('ngo_notification', JSON.stringify({
        message: "NGO Driver has gone offline.",
        timestamp: new Date()
      }));
    }
  }

  function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
      markAllNotificationsRead();
    }
  }

  function renderNotifications() {
    const list = document.getElementById('notificationList');
    list.innerHTML = '';
    notifications.forEach(n => {
      const li = document.createElement('li');
      li.textContent = n.message;
      li.className = n.read ? '' : 'unread';
      li.tabIndex = 0;
      li.onclick = () => {
        n.read = true;
        renderNotifications();
        updateNotificationBadge();
      };
      list.appendChild(li);
    });
  }

  function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    const unreadCount = notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
      badge.style.display = 'inline-block';
      badge.textContent = unreadCount;
    } else {
      badge.style.display = 'none';
    }
  }

  function markAllNotificationsRead() {
    notifications.forEach(n => n.read = true);
    renderNotifications();
    updateNotificationBadge();
  }

  // Navigation and page rendering
  function navigateTo(page) {
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('nav button')).find(b => b.textContent.toLowerCase() === page.toLowerCase());
    if (btn) btn.classList.add('active');

    switch(page) {
      case 'home': renderHome(); break;
      case 'earnings': renderEarnings(); break;
      case 'trips': renderTrips(); break;
      case 'account': renderAccount(); break;
      default: renderHome();
    }
  }

  // Earnings page showing total earnings and trips
  function renderEarnings() {
    let html = `<h2>Earnings</h2>`;
    html += `<p><strong>Total Earnings:</strong> ₹${totalEarnings.toFixed(2)}</p>`;
    if (trips.length === 0) {
      html += `<p>No trips recorded yet.</p>`;
    } else {
      html += `<ul>`;
      trips.forEach(trip => {
        html += `<li>${trip.date} - ₹${trip.amount.toFixed(2)}</li>`;
      });
      html += `</ul>`;
    }
    document.getElementById('pageContent').innerHTML = html;
  }

  // Trips page showing list of trips
  function renderTrips() {
    let html = `<h2>Trips</h2>`;
    if (trips.length === 0) {
      html += `<p>No trips recorded yet.</p>`;
    } else {
      html += `<ul>`;
      trips.forEach(trip => {
        html += `<li>${trip.date} - Pickup at ${trip.location} - ₹${trip.amount.toFixed(2)}</li>`;
      });
      html += `</ul>`;
    }
    document.getElementById('pageContent').innerHTML = html;
  }

  // Account page showing profile form
  function renderAccount() {
    const storedProfile = JSON.parse(localStorage.getItem('driverProfile')) || {};
    let html = `<h2>Account</h2>`;
    html += `<p><strong>Today's Earnings:</strong> ₹${totalEarnings.toFixed(2)}</p>`;
    html += `<form id="profileForm" autocomplete="on">`;
    html += `<label for="fullName">Full Name</label>`;
    html += `<input type="text" id="fullName" placeholder="Your name" value="${storedProfile.fullName || ''}" required>`;
    html += `<label for="email">Email</label>`;
    html += `<input type="email" id="email" placeholder="Your email address" value="${storedProfile.email || ''}" required>`;
    html += `<label for="phone">Phone</label>`;
    html += `<input type="tel" id="phone" placeholder="Mobile number" value="${storedProfile.phone || ''}" required>`;
    html += `<label for="vehicle">Vehicle</label>`;
    html += `<input type="text" id="vehicle" placeholder="Vehicle model or number" value="${storedProfile.vehicle || ''}" required>`;
    html += `<label for="rating">Rating</label>`;
    html += `<input type="number" id="rating" placeholder="4.5" value="${storedProfile.rating || 4.5}" min="1" max="5" step="0.1" required readonly>`;
    html += `<div style="margin-top:2.7rem;">`;
    html += `<button type="button" onclick="saveProfile()" class="submit-btn">Save Profile</button>`;
    html += `<button type="button" onclick="generateQRCode()" class="submit-btn">Generate QR Code</button>`;
    html += `<button type="button" onclick="logout()" class="submit-btn">Logout</button>`;
    html += `<button type="button" onclick="withdrawMoney()" class="submit-btn">Withdraw Money</button>`;
    html += `</div>`;
    html += `</form>`;
    html += `<div id="qrcode" style="margin-top: 2rem;"></div>`;
    document.getElementById('pageContent').innerHTML = html;
  }

  // Home page with map
  function renderHome() {
    document.getElementById('pageContent').innerHTML = `
      <h2>Home</h2>
      <p>Track your location on the map.</p>
      <div id="map" style="width: 100%; height: 400px; border-radius: var(--border-radius); box-shadow: var(--box-shadow); margin-top: 1rem;"></div>
      <div id="driverStatus" style="margin-top: 1rem; font-weight: bold; font-size: 1.1rem; color: var(--gov-blue);">
        Driver status: <span id="driverStatusText">Waiting for driver update...</span>
      </div>
      <button onclick="startDriverSimulation()" class="submit-btn" style="margin-top: 1rem;">Start Driver Simulation</button>
      <button onclick="stopDriverSimulation()" class="submit-btn" style="margin-top: 1rem; margin-left: 1rem;">Stop Simulation</button>
    `;
    initializeMap();
  }

  // Driver tracking page with map and status
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
        // Notify Green Center
        localStorage.setItem('ngo_notification', JSON.stringify({
          message: "NGO Driver has completed the trip and delivered waste.",
          timestamp: new Date()
        }));
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

  // Profile functions
  function saveProfile() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const vehicle = document.getElementById('vehicle').value;
    const rating = document.getElementById('rating').value;
    const profile = { fullName, email, phone, vehicle, rating, totalEarnings };
    localStorage.setItem('driverProfile', JSON.stringify(profile));
    alert('Profile saved successfully!');
  }

  function generateQRCode() {
    const storedProfile = JSON.parse(localStorage.getItem('driverProfile')) || {};
    const qrData = `Name: ${storedProfile.fullName}\nEmail: ${storedProfile.email}\nPhone: ${storedProfile.phone}\nVehicle: ${storedProfile.vehicle}\nRating: ${storedProfile.rating}`;
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';
    QRCode.toCanvas(qrData, { width: 200 }, function (error, canvas) {
      if (error) console.error(error);
      qrcodeDiv.appendChild(canvas);
    });
  }

  function logout() {
    localStorage.removeItem('driverProfile');
    window.location.href = 'Signin.html';
  }

  function withdrawMoney() {
    const amount = prompt('Enter amount to withdraw:');
    if (amount && !isNaN(amount) && amount > 0) {
      const withdrawAmount = parseFloat(amount);
      if (withdrawAmount <= totalEarnings) {
        totalEarnings -= withdrawAmount;
        const profile = JSON.parse(localStorage.getItem('driverProfile')) || {};
        profile.totalEarnings = totalEarnings;
        localStorage.setItem('driverProfile', JSON.stringify(profile));
        alert(`Withdrawn ₹${withdrawAmount.toFixed(2)}. Remaining earnings: ₹${totalEarnings.toFixed(2)}`);
        renderAccount();
      } else {
        alert('Insufficient earnings.');
      }
    } else {
      alert('Invalid amount.');
    }
  }

  // Initialize app
  window.onload = () => {
    updateNotificationBadge();
    renderNotifications();
    navigateTo('home');
  };
