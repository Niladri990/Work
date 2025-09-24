// ConservancyRider.js
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

  // Garbage orders data
  let garbageOrders = [
    { id: 1, address: "123 Main St, Delhi", lat: 28.6448, lng: 77.2167, time: "10:00 AM", status: "Pending", type: "Household Waste" },
    { id: 2, address: "456 Oak Ave, Delhi", lat: 28.6455, lng: 77.2200, time: "11:30 AM", status: "Pending", type: "Recyclables" },
    { id: 3, address: "789 Pine Rd, Delhi", lat: 28.6460, lng: 77.2250, time: "2:00 PM", status: "Pending", type: "Organic Waste" }
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
      localStorage.setItem('conservency_notification', JSON.stringify({
        message: "Conservency Driver is now online and ready for waste collection.",
        timestamp: new Date()
      }));
    } else {
      button.textContent = 'Go Online';
      button.classList.add('offline');
      button.setAttribute('aria-pressed', 'false');
      document.body.style.backgroundColor = 'var(--uber-gray)';
      // Notify Green Center
      localStorage.setItem('conservency_notification', JSON.stringify({
        message: "Conservency Driver has gone offline.",
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



  // Home page with map and orders
  function renderHome() {
    let ordersHtml = '<h3>Garbage Collection Orders</h3><ul>';
    garbageOrders.forEach(order => {
      ordersHtml += `<li onclick="handleOrderClick(${order.id})" style="cursor:pointer; padding:0.5rem; border-bottom:1px solid #ddd;">
        <strong>${order.address}</strong> - ${order.time} - ${order.type} - <span style="color:${order.status === 'Pending' ? 'orange' : 'green'};">${order.status}</span>
      </li>`;
    });
    ordersHtml += '</ul>';

    document.getElementById('pageContent').innerHTML = `
      <h2>Home</h2>
      <div style="display:flex; gap:2rem; flex-wrap:wrap;">
        <div style="flex:1; min-width:300px;">
          <p>Track your location on the map.</p>
          <div id="map" style="width: 100%; height: 400px; border-radius: var(--border-radius); box-shadow: var(--box-shadow); margin-top: 1rem;"></div>
          <div id="driverStatus" style="margin-top: 1rem; font-weight: bold; font-size: 1.1rem; color: var(--gov-blue);">
            Driver status: <span id="driverStatusText">Ready for waste collection.</span>
          </div>
          <button onclick="startDriverSimulation()" class="submit-btn" style="margin-top: 1rem;">Start Driver Simulation</button>
          <button onclick="stopDriverSimulation()" class="submit-btn" style="margin-top: 1rem; margin-left: 1rem;">Stop Simulation</button>
        </div>
        <div style="flex:1; min-width:300px;">
          ${ordersHtml}
        </div>
      </div>
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
    "Driver is starting from the depot.",
    "Driver is en route to waste pickup location.",
    "Driver has arrived at waste pickup location.",
    "Driver is picking up waste.",
    "Driver is en route to green center.",
    "Waste delivered to green center."
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

    const features = [driverFeature];

    // Add order markers
    garbageOrders.forEach(order => {
      const orderCoord = ol.proj.fromLonLat([order.lng, order.lat]);
      const orderFeature = new ol.Feature({
        geometry: new ol.geom.Point(orderCoord),
        orderId: order.id
      });
      orderFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
          src: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="' + (order.status === 'Pending' ? 'red' : 'green') + '" stroke="white" stroke-width="2"/></svg>'),
          scale: 1
        })
      }));
      features.push(orderFeature);
    });

    const vectorSource = new ol.source.Vector({
      features: features
    });
    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    map.addLayer(vectorLayer);

    driverMarker = driverFeature;

    // Add click event for order markers
    map.on('click', function(evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
      });
      if (feature && feature.get('orderId')) {
        handleOrderClick(feature.get('orderId'));
      }
    });
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
      document.getElementById('driverStatusText').textContent = "Waste delivered to green center.";
      // Notify Green Center
      localStorage.setItem('conservency_notification', JSON.stringify({
        message: "Conservency Driver has completed waste collection and delivered to green center.",
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
      document.getElementById('driverStatusText').textContent = "Waste collection simulation stopped.";
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

  // Initialize app
  window.onload = () => {
    updateNotificationBadge();
    renderNotifications();
    navigateTo('home');
  };
