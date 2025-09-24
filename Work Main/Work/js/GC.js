// GC.js - Green Center Driver Monitor App
                

        // Green Centers data (same as Main3.html)
        const greenCenters = [
            { name: "Delhi Sunrise Recycling Center", lat: 28.6448, lng: 77.2167, type: "Recycling", state: "Delhi" },
            { name: "Delhi GreenEarth Waste Processing", lat: 28.5355, lng: 77.3910, type: "Processing", state: "Delhi" },
            { name: "Delhi EcoCycle Hub", lat: 28.4089, lng: 77.3178, type: "Hub", state: "Delhi" },
            { name: "Delhi Nature's Recycle Point", lat: 28.6139, lng: 77.2090, type: "Recycle", state: "Delhi" },
            { name: "Delhi Sustainable Waste Center", lat: 28.7041, lng: 77.1025, type: "Sustainable", state: "Delhi" },
            { name: "Uttar Pradesh EcoWaste Center", lat: 26.8467, lng: 80.9462, type: "Processing", state: "Uttar Pradesh" },
            { name: "Uttar Pradesh Green Recycle Hub", lat: 25.3176, lng: 82.9739, type: "Hub", state: "Uttar Pradesh" },
            { name: "Lucknow Green Center", lat: 26.8467, lng: 80.9462, type: "Recycling", state: "Uttar Pradesh" },
            { name: "Kanpur Waste Management", lat: 26.4499, lng: 80.3319, type: "Processing", state: "Uttar Pradesh" },
            { name: "Haryana Sustainable Waste Point", lat: 28.4595, lng: 77.0266, type: "Sustainable", state: "Haryana" },
            { name: "Gurugram Eco Hub", lat: 28.4595, lng: 77.0266, type: "Hub", state: "Haryana" },
            { name: "Mumbai Green Recycle Center", lat: 19.0760, lng: 72.8777, type: "Recycling", state: "Maharashtra" },
            { name: "Pune Waste Processing Plant", lat: 18.5204, lng: 73.8567, type: "Processing", state: "Maharashtra" },
            { name: "Bangalore Eco Hub", lat: 12.9716, lng: 77.5946, type: "Hub", state: "Karnataka" },
            { name: "Mysore Sustainable Center", lat: 12.2958, lng: 76.6394, type: "Sustainable", state: "Karnataka" },
            { name: "Chennai Recycle Point", lat: 13.0827, lng: 80.2707, type: "Recycle", state: "Tamil Nadu" },
            { name: "Coimbatore Waste Management", lat: 11.0168, lng: 76.9558, type: "Processing", state: "Tamil Nadu" },
            { name: "Kolkata Green Center", lat: 22.5726, lng: 88.3639, type: "Recycling", state: "West Bengal" },
            { name: "Howrah Eco Hub", lat: 22.5958, lng: 88.2636, type: "Hub", state: "West Bengal" }
        ];

        // Load driver data from localStorage
        let drivers = [];

        function loadDriversFromStorage() {
            const ngoDrivers = JSON.parse(localStorage.getItem('ngo_drivers')) || [];
            const conservencyDrivers = JSON.parse(localStorage.getItem('conservency_drivers')) || [];

            drivers = [];

            // Add NGO drivers
            ngoDrivers.forEach((driverData, index) => {
                drivers.push({
                    id: driverData.id || `ngo_${index + 1}`,
                    name: driverData.name || `NGO Driver ${index + 1}`,
                    license: driverData.license || 'N/A',
                    experience: driverData.experience || 'N/A',
                    rating: driverData.rating || 4.0,
                    status: driverData.status || 'free',
                    lat: driverData.lat || 28.6139 + (Math.random() - 0.5) * 0.01,
                    lng: driverData.lng || 77.2090 + (Math.random() - 0.5) * 0.01,
                    lastUpdate: driverData.lastUpdate ? new Date(driverData.lastUpdate) : new Date(),
                    allocatedCenter: driverData.allocatedCenter || null,
                    eta: driverData.eta || null,
                    speed: driverData.speed || 0
                });
            });

            // Add Conservency drivers
            conservencyDrivers.forEach((driverData, index) => {
                drivers.push({
                    id: driverData.id || `conservency_${index + 1}`,
                    name: driverData.name || `Conservency Driver ${index + 1}`,
                    license: driverData.license || 'N/A',
                    experience: driverData.experience || 'N/A',
                    rating: driverData.rating || 4.0,
                    status: driverData.status || 'free',
                    lat: driverData.lat || 28.5355 + (Math.random() - 0.5) * 0.01,
                    lng: driverData.lng || 77.3910 + (Math.random() - 0.5) * 0.01,
                    lastUpdate: driverData.lastUpdate ? new Date(driverData.lastUpdate) : new Date(),
                    allocatedCenter: driverData.allocatedCenter || null,
                    eta: driverData.eta || null,
                    speed: driverData.speed || 0
                });
            });

            // If no drivers loaded, use default data (5 NGO and 5 Conservency drivers)
            if (drivers.length === 0) {
                const defaultNGODrivers = [];
                const defaultConservencyDrivers = [];

                for (let i = 1; i <= 5; i++) {
                    let status = "free";
                    let allocatedCenter = null;
                    let eta = null;
                    let speed = 0;

                    if (i === 2 || i === 4) {
                        status = "allocated";
                        allocatedCenter = greenCenters[Math.floor(Math.random() * greenCenters.length)].name;
                        eta = `${Math.floor(Math.random() * 30) + 10} min`;
                        speed = Math.floor(Math.random() * 60) + 20;
                    } else if (i === 3) {
                        status = "busy";
                        allocatedCenter = greenCenters[Math.floor(Math.random() * greenCenters.length)].name;
                        eta = "On site";
                        speed = 0;
                    }

                    defaultNGODrivers.push({
                        id: `ngo_${i}`,
                        name: `NGO Driver ${i}`,
                        license: `DL${654321 + i}`,
                        experience: `${5 + i} years`,
                        rating: 4.0 + Math.random() * 1,
                        status: status,
                        lat: 28.6139 + (Math.random() - 0.5) * 0.02,
                        lng: 77.2090 + (Math.random() - 0.5) * 0.02,
                        lastUpdate: new Date(),
                        allocatedCenter: allocatedCenter,
                        eta: eta,
                        speed: speed
                    });

                    status = "free";
                    allocatedCenter = null;
                    eta = null;
                    speed = 0;

                    if (i === 1 || i === 5) {
                        status = "allocated";
                        allocatedCenter = greenCenters[Math.floor(Math.random() * greenCenters.length)].name;
                        eta = `${Math.floor(Math.random() * 30) + 10} min`;
                        speed = Math.floor(Math.random() * 60) + 20;
                    } else if (i === 2) {
                        status = "busy";
                        allocatedCenter = greenCenters[Math.floor(Math.random() * greenCenters.length)].name;
                        eta = "On site";
                        speed = 0;
                    }

                    defaultConservencyDrivers.push({
                        id: `conservency_${i}`,
                        name: `Conservency Driver ${i}`,
                        license: `DL${987654 + i}`,
                        experience: `${4 + i} years`,
                        rating: 4.0 + Math.random() * 1,
                        status: status,
                        lat: 28.5355 + (Math.random() - 0.5) * 0.02,
                        lng: 77.3910 + (Math.random() - 0.5) * 0.02,
                        lastUpdate: new Date(),
                        allocatedCenter: allocatedCenter,
                        eta: eta,
                        speed: speed
                    });
                }

                drivers = [...defaultNGODrivers, ...defaultConservencyDrivers];
            }
        }

        let map;
        let driverMarkers = [];
        let centerMarkers = [];
        let routeLayers = [];
        let selectedDriver = null;
        let updateInterval;

        function initMap() {
            loadDriversFromStorage();

            map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([78.9629, 20.5937]), // Center on India
                    zoom: 5
                })
            });

            addCenterMarkers();
            addDriverMarkers();
            populateDriverList();
            populateSelects();
            updateStats();
            startRealTimeUpdates();
        }

        function addCenterMarkers() {
            centerMarkers.forEach(marker => map.removeLayer(marker));
            centerMarkers = [];

            greenCenters.forEach(center => {
                const marker = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [
                            new ol.Feature({
                                geometry: new ol.geom.Point(ol.proj.fromLonLat([center.lng, center.lat]))
                            })
                        ]
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            src: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#28a745" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
                            scale: 1
                        })
                    })
                });
                map.addLayer(marker);
                centerMarkers.push(marker);
            });
        }

        function addDriverMarkers() {
            driverMarkers.forEach(marker => map.removeLayer(marker));
            driverMarkers = [];

            drivers.forEach(driver => {
                const marker = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [
                            new ol.Feature({
                                geometry: new ol.geom.Point(ol.proj.fromLonLat([driver.lng, driver.lat]))
                            })
                        ]
                    }),
                    style: getDriverMarkerStyle(driver.status)
                });
                map.addLayer(marker);
                driverMarkers.push(marker);
            });
        }

        function getDriverMarkerStyle(status) {
            let color;
            switch(status) {
                case 'free': color = '#28a745'; break;
                case 'allocated': color = '#ff9500'; break;
                case 'busy': color = '#dc3545'; break;
                default: color = '#6c757d';
            }

            return new ol.style.Style({
                image: new ol.style.Icon({
                    src: 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="${color}" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`),
                    scale: 1
                })
            });
        }

        function populateDriverList() {
            const list = document.getElementById('driverList');
            list.innerHTML = '';

            drivers.forEach(driver => {
                const item = document.createElement('div');
                item.className = `driver-item ${driver.status}`;
                item.innerHTML = `
                    <strong>${driver.name}</strong><br>
                    Status: <span class="status ${driver.status}">${driver.status.toUpperCase()}</span><br>
                    Rating: ${driver.rating}/5<br>
                    ${driver.allocatedCenter ? `Assigned: ${driver.allocatedCenter}<br>` : ''}
                    ${driver.eta ? `ETA: ${driver.eta}<br>` : ''}
                    Location: ${driver.lat.toFixed(4)}, ${driver.lng.toFixed(4)}
                `;
                item.addEventListener('click', () => selectDriver(driver));
                list.appendChild(item);
            });
        }

        function selectDriver(driver) {
            selectedDriver = driver;
            document.querySelectorAll('.driver-item').forEach(item => item.classList.remove('selected'));
            event.target.closest('.driver-item').classList.add('selected');

            updateDriverDetails(driver);
            map.getView().setCenter(ol.proj.fromLonLat([driver.lng, driver.lat]));
            map.getView().setZoom(14);
        }

        function updateDriverDetails(driver) {
            const details = document.getElementById('selectedDriverDetails');
            details.innerHTML = `
                <h4>${driver.name}</h4>
                <p><strong>License:</strong> ${driver.license}</p>
                <p><strong>Experience:</strong> ${driver.experience}</p>
                <p><strong>Rating:</strong> ${driver.rating}/5</p>
                <p><strong>Status:</strong> <span class="status ${driver.status}">${driver.status.toUpperCase()}</span></p>
                <p><strong>Current Location:</strong> ${driver.lat.toFixed(4)}, ${driver.lng.toFixed(4)}</p>
                <p><strong>Last Update:</strong> ${driver.lastUpdate.toLocaleTimeString()}</p>
                <p><strong>Speed:</strong> ${driver.speed} km/h</p>
                ${driver.allocatedCenter ? `<p><strong>Assigned Center:</strong> ${driver.allocatedCenter}</p>` : ''}
                ${driver.eta ? `<p><strong>ETA:</strong> ${driver.eta}</p>` : ''}
            `;
        }

        function populateSelects() {
            const driverSelect = document.getElementById('driverSelect');
            const centerSelect = document.getElementById('centerSelect');

            driverSelect.innerHTML = '<option value="">Choose Driver</option>';
            centerSelect.innerHTML = '<option value="">Choose Center</option>';

            drivers.forEach(driver => {
                const option = document.createElement('option');
                option.value = driver.id;
                option.textContent = `${driver.name} (${driver.status})`;
                driverSelect.appendChild(option);
            });

            greenCenters.forEach(center => {
                const option = document.createElement('option');
                option.value = center.name;
                option.textContent = center.name;
                centerSelect.appendChild(option);
            });

            driverSelect.addEventListener('change', updateAllocateButton);
            centerSelect.addEventListener('change', updateAllocateButton);
        }

        function updateAllocateButton() {
            const driverSelect = document.getElementById('driverSelect');
            const centerSelect = document.getElementById('centerSelect');
            const allocateBtn = document.getElementById('allocateBtn');
            const deallocateBtn = document.getElementById('deallocateBtn');

            const driverId = driverSelect.value;
            const centerName = centerSelect.value;

            if (driverId && centerName) {
                const driver = drivers.find(d => d.id == driverId);
                if (driver.status === 'free') {
                    allocateBtn.disabled = false;
                    deallocateBtn.disabled = true;
                } else if (driver.status === 'allocated') {
                    allocateBtn.disabled = true;
                    deallocateBtn.disabled = false;
                } else {
                    allocateBtn.disabled = true;
                    deallocateBtn.disabled = true;
                }
            } else {
                allocateBtn.disabled = true;
                deallocateBtn.disabled = true;
            }
        }

        function allocateDriver() {
            const driverId = document.getElementById('driverSelect').value;
            const centerName = document.getElementById('centerSelect').value;

            const driver = drivers.find(d => d.id == driverId);
            const center = greenCenters.find(c => c.name === centerName);

            if (driver && center) {
                driver.status = 'allocated';
                driver.allocatedCenter = centerName;
                driver.eta = calculateETA(driver, center);
                driver.speed = Math.floor(Math.random() * 60) + 20; // Random speed 20-80 km/h

                updateDriverMarkers();
                populateDriverList();
                populateSelects();
                updateStats();

                document.getElementById('allocationStatus').innerHTML =
                    '<div class="alert success">Driver allocated successfully!</div>';

                setTimeout(() => {
                    document.getElementById('allocationStatus').innerHTML = '';
                }, 3000);
            }
        }

        function deallocateDriver() {
            const driverId = document.getElementById('driverSelect').value;

            const driver = drivers.find(d => d.id == driverId);
            if (driver) {
                driver.status = 'free';
                driver.allocatedCenter = null;
                driver.eta = null;
                driver.speed = 0;

                updateDriverMarkers();
                populateDriverList();
                populateSelects();
                updateStats();

                document.getElementById('allocationStatus').innerHTML =
                    '<div class="alert warning">Driver deallocated successfully!</div>';

                setTimeout(() => {
                    document.getElementById('allocationStatus').innerHTML = '';
                }, 3000);
            }
        }

        function calculateETA(driver, center) {
            // Simple distance-based ETA calculation
            const distance = getDistance(driver.lat, driver.lng, center.lat, center.lng);
            const speed = driver.speed || 40; // Default 40 km/h
            const time = Math.round((distance / speed) * 60); // minutes

            if (time < 60) {
                return `${time} min`;
            } else {
                return `${Math.round(time / 60)} hr ${time % 60} min`;
            }
        }

        function getDistance(lat1, lng1, lat2, lng2) {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2 - lat1);
            const dLng = deg2rad(lng2 - lng1);
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const d = R * c; // Distance in km
            return d;
        }

        function deg2rad(deg) {
            return deg * (Math.PI/180);
        }

        function updateStats() {
            const total = drivers.length;
            const available = drivers.filter(d => d.status === 'free').length;
            const allocated = drivers.filter(d => d.status === 'allocated').length;
            const busy = drivers.filter(d => d.status === 'busy').length;

            document.getElementById('totalDrivers').textContent = total;
            document.getElementById('availableDrivers').textContent = available;
            document.getElementById('allocatedDrivers').textContent = allocated;
            document.getElementById('busyDrivers').textContent = busy;
        }

        function updateDriverMarkers() {
            driverMarkers.forEach((marker, index) => {
                const driver = drivers[index];
                const newStyle = getDriverMarkerStyle(driver.status);
                marker.setStyle(newStyle);

                // Update position (simulate movement for allocated drivers)
                if (driver.status === 'allocated' && Math.random() > 0.7) {
                    driver.lat += (Math.random() - 0.5) * 0.001;
                    driver.lng += (Math.random() - 0.5) * 0.001;
                    driver.lastUpdate = new Date();

                    const geometry = marker.getSource().getFeatures()[0].getGeometry();
                    geometry.setCoordinates(ol.proj.fromLonLat([driver.lng, driver.lat]));
                }
            });
        }

        function startRealTimeUpdates() {
            updateInterval = setInterval(() => {
                updateDriverMarkers();
                populateDriverList();
                updateStats();
                checkNotifications();

                // Simulate status changes
                drivers.forEach(driver => {
                    if (driver.status === 'allocated' && Math.random() > 0.95) {
                        driver.status = 'busy';
                        driver.eta = 'On site';
                        driver.speed = 0;
                    }
                });
            }, 5000); // Update every 5 seconds
        }

        function checkNotifications() {
            const ngoNotification = JSON.parse(localStorage.getItem('ngo_notification')) || null;
            const conservencyNotification = JSON.parse(localStorage.getItem('conservency_notification')) || null;

            const notificationList = document.getElementById('notificationList');
            notificationList.innerHTML = '';

            if (ngoNotification) {
                const item = document.createElement('div');
                item.className = 'driver-item';
                item.innerHTML = `
                    <strong>NGO Driver Notification</strong><br>
                    ${ngoNotification.message}<br>
                    <small>${new Date(ngoNotification.timestamp).toLocaleTimeString()}</small>
                `;
                notificationList.appendChild(item);
            }

            if (conservencyNotification) {
                const item = document.createElement('div');
                item.className = 'driver-item';
                item.innerHTML = `
                    <strong>Conservency Driver Notification</strong><br>
                    ${conservencyNotification.message}<br>
                    <small>${new Date(conservencyNotification.timestamp).toLocaleTimeString()}</small>
                `;
                notificationList.appendChild(item);
            }

            if (!ngoNotification && !conservencyNotification) {
                notificationList.innerHTML = '<p>No new notifications</p>';
            }
        }

        function refreshData() {
            loadDriversFromStorage();
            updateDriverMarkers();
            populateDriverList();
            populateSelects();
            updateStats();
            document.getElementById('systemStatus').textContent = 'Data Refreshed - ' + new Date().toLocaleTimeString();
        }

        function simulateLocationUpdate() {
            drivers.forEach(driver => {
                if (driver.status !== 'busy') {
                    driver.lat += (Math.random() - 0.5) * 0.002;
                    driver.lng += (Math.random() - 0.5) * 0.002;
                    driver.lastUpdate = new Date();
                }
            });

            updateDriverMarkers();
            populateDriverList();
            document.getElementById('systemStatus').textContent = 'Locations Updated - ' + new Date().toLocaleTimeString();
        }

        // Event listeners
        document.getElementById('allocateBtn').addEventListener('click', allocateDriver);
        document.getElementById('deallocateBtn').addEventListener('click', deallocateDriver);
        document.getElementById('refreshBtn').addEventListener('click', refreshData);
        document.getElementById('simulateUpdateBtn').addEventListener('click', simulateLocationUpdate);

        // Initialize map on load
        window.onload = initMap;

        // Cleanup on page unload
        window.onbeforeunload = () => {
            if (updateInterval) {
                clearInterval(updateInterval);
            }
        };
