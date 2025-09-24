// Conservancy.JS
        // Green Centers data (simulated real-time data)
        const greenCenters = [
            // Delhi
            { name: "Delhi Sunrise Recycling Center", lat: 28.6448, lng: 77.2167, type: "Recycling", state: "Delhi" },
            { name: "Delhi GreenEarth Waste Processing", lat: 28.5355, lng: 77.3910, type: "Processing", state: "Delhi" },
            { name: "Delhi EcoCycle Hub", lat: 28.4089, lng: 77.3178, type: "Hub", state: "Delhi" },
            { name: "Delhi Nature's Recycle Point", lat: 28.6139, lng: 77.2090, type: "Recycle", state: "Delhi" },
            { name: "Delhi Sustainable Waste Center", lat: 28.7041, lng: 77.1025, type: "Sustainable", state: "Delhi" },
            // Uttar Pradesh
            { name: "Uttar Pradesh EcoWaste Center", lat: 26.8467, lng: 80.9462, type: "Processing", state: "Uttar Pradesh" },
            { name: "Uttar Pradesh Green Recycle Hub", lat: 25.3176, lng: 82.9739, type: "Hub", state: "Uttar Pradesh" },
            { name: "Lucknow Green Center", lat: 26.8467, lng: 80.9462, type: "Recycling", state: "Uttar Pradesh" },
            { name: "Kanpur Waste Management", lat: 26.4499, lng: 80.3319, type: "Processing", state: "Uttar Pradesh" },
            // Haryana
            { name: "Haryana Sustainable Waste Point", lat: 28.4595, lng: 77.0266, type: "Sustainable", state: "Haryana" },
            { name: "Gurugram Eco Hub", lat: 28.4595, lng: 77.0266, type: "Hub", state: "Haryana" },
            // Maharashtra
            { name: "Mumbai Green Recycle Center", lat: 19.0760, lng: 72.8777, type: "Recycling", state: "Maharashtra" },
            { name: "Pune Waste Processing Plant", lat: 18.5204, lng: 73.8567, type: "Processing", state: "Maharashtra" },
            // Karnataka
            { name: "Bangalore Eco Hub", lat: 12.9716, lng: 77.5946, type: "Hub", state: "Karnataka" },
            { name: "Mysore Sustainable Center", lat: 12.2958, lng: 76.6394, type: "Sustainable", state: "Karnataka" },
            // Tamil Nadu
            { name: "Chennai Recycle Point", lat: 13.0827, lng: 80.2707, type: "Recycle", state: "Tamil Nadu" },
            { name: "Coimbatore Waste Management", lat: 11.0168, lng: 76.9558, type: "Processing", state: "Tamil Nadu" },
            // West Bengal
            { name: "Kolkata Green Center", lat: 22.5726, lng: 88.3639, type: "Recycling", state: "West Bengal" },
            { name: "Howrah Eco Hub", lat: 22.5958, lng: 88.2636, type: "Hub", state: "West Bengal" },
            // Additional states
            // Gujarat
            { name: "Ahmedabad Green Center", lat: 23.0225, lng: 72.5714, type: "Recycling", state: "Gujarat" },
            { name: "Surat Waste Processing", lat: 21.1702, lng: 72.8311, type: "Processing", state: "Gujarat" },
            // Rajasthan
            { name: "Jaipur Eco Hub", lat: 26.9124, lng: 75.7873, type: "Hub", state: "Rajasthan" },
            { name: "Udaipur Sustainable Center", lat: 24.5854, lng: 73.7125, type: "Sustainable", state: "Rajasthan" },
            // Punjab
            { name: "Amritsar Recycle Point", lat: 31.6340, lng: 74.8723, type: "Recycle", state: "Punjab" },
            { name: "Ludhiana Waste Management", lat: 30.9010, lng: 75.8573, type: "Processing", state: "Punjab" },
            // Bihar
            { name: "Patna Green Center", lat: 25.5941, lng: 85.1376, type: "Recycling", state: "Bihar" },
            { name: "Gaya Eco Hub", lat: 24.7954, lng: 85.0000, type: "Hub", state: "Bihar" },
            // Odisha
            { name: "Bhubaneswar Sustainable Center", lat: 20.2961, lng: 85.8245, type: "Sustainable", state: "Odisha" },
            { name: "Cuttack Waste Processing", lat: 20.4625, lng: 85.8828, type: "Processing", state: "Odisha" },
            // Kerala
            { name: "Kochi Green Recycle Center", lat: 9.9312, lng: 76.2673, type: "Recycling", state: "Kerala" },
            { name: "Thiruvananthapuram Eco Hub", lat: 8.5241, lng: 76.9366, type: "Hub", state: "Kerala" },
            // Jharkhand
            { name: "Ranchi Sustainable Center", lat: 23.3441, lng: 85.3096, type: "Sustainable", state: "Jharkhand" },
            { name: "Jamshedpur Waste Management", lat: 22.8046, lng: 86.2029, type: "Processing", state: "Jharkhand" },
            // Assam
            { name: "Guwahati Green Center", lat: 26.1445, lng: 91.7362, type: "Recycling", state: "Assam" },
            { name: "Dibrugarh Eco Hub", lat: 27.4728, lng: 95.0160, type: "Hub", state: "Assam" },
            // Chhattisgarh
            { name: "Raipur Sustainable Center", lat: 21.2514, lng: 81.6296, type: "Sustainable", state: "Chhattisgarh" },
            { name: "Bhilai Waste Processing", lat: 21.2140, lng: 81.3500, type: "Processing", state: "Chhattisgarh" },
            // Himachal Pradesh
            { name: "Shimla Green Center", lat: 31.1048, lng: 77.1734, type: "Recycling", state: "Himachal Pradesh" },
            { name: "Dharamshala Eco Hub", lat: 32.2190, lng: 76.3234, type: "Hub", state: "Himachal Pradesh" },
            // Uttarakhand
            { name: "Dehradun Sustainable Center", lat: 30.3165, lng: 78.0322, type: "Sustainable", state: "Uttarakhand" },
            { name: "Haridwar Waste Management", lat: 29.9457, lng: 78.1642, type: "Processing", state: "Uttarakhand" },
            // Tripura
            { name: "Agartala Green Center", lat: 23.8315, lng: 91.2868, type: "Recycling", state: "Tripura" },
            { name: "Udaipur Eco Hub", lat: 23.5465, lng: 91.4960, type: "Hub", state: "Tripura" },
            // Meghalaya
            { name: "Shillong Sustainable Center", lat: 25.5788, lng: 91.8933, type: "Sustainable", state: "Meghalaya" },
            { name: "Tura Waste Processing", lat: 25.5167, lng: 90.2167, type: "Processing", state: "Meghalaya" },
            // Manipur
            { name: "Imphal Green Center", lat: 24.8170, lng: 93.9368, type: "Recycling", state: "Manipur" },
            { name: "Churachandpur Eco Hub", lat: 23.3540, lng: 93.3540, type: "Hub", state: "Manipur" },
            // Nagaland
            { name: "Kohima Sustainable Center", lat: 25.6740, lng: 94.1100, type: "Sustainable", state: "Nagaland" },
            { name: "Dimapur Waste Management", lat: 26.9044, lng: 93.7266, type: "Processing", state: "Nagaland" },
            // Goa
            { name: "Panaji Green Center", lat: 15.4909, lng: 73.8278, type: "Recycling", state: "Goa" },
            { name: "Margao Eco Hub", lat: 15.2993, lng: 74.1240, type: "Hub", state: "Goa" },
            // Arunachal Pradesh
            { name: "Itanagar Sustainable Center", lat: 27.0844, lng: 93.6053, type: "Sustainable", state: "Arunachal Pradesh" },
            { name: "Tawang Waste Processing", lat: 27.5860, lng: 91.8640, type: "Processing", state: "Arunachal Pradesh" },
            // Mizoram
            { name: "Aizawl Green Center", lat: 23.7271, lng: 92.7176, type: "Recycling", state: "Mizoram" },
            { name: "Lunglei Eco Hub", lat: 22.9056, lng: 92.7280, type: "Hub", state: "Mizoram" },
            // Sikkim
            { name: "Gangtok Sustainable Center", lat: 27.3314, lng: 88.6132, type: "Sustainable", state: "Sikkim" },
            { name: "Namchi Waste Management", lat: 27.1667, lng: 88.3500, type: "Processing", state: "Sikkim" },
            // Jammu and Kashmir
            { name: "Srinagar Green Center", lat: 34.0837, lng: 74.7973, type: "Recycling", state: "Jammu and Kashmir" },
            { name: "Jammu Eco Hub", lat: 32.7266, lng: 74.8570, type: "Hub", state: "Jammu and Kashmir" }
        ];

// Dummy data for trucks and drivers
const truckOwners = [
    { name: "Rajesh Kumar", truckId: "TRK001", status: "Active", location: "Delhi" },
    { name: "Priya Sharma", truckId: "TRK002", status: "On Route", location: "Uttar Pradesh" },
    { name: "Amit Singh", truckId: "TRK003", status: "Idle", location: "Haryana" },
    { name: "Sunita Patel", truckId: "TRK004", status: "Maintenance", location: "Maharashtra" }
];

const drivers = [
    { name: "Vikram Rao", license: "DL123456", experience: "5 years", rating: 4.5 },
    { name: "Anjali Gupta", license: "DL789012", experience: "3 years", rating: 4.2 },
    { name: "Ravi Kumar", license: "DL345678", experience: "7 years", rating: 4.8 },
    { name: "Meera Joshi", license: "DL901234", experience: "4 years", rating: 4.3 },
    { name: "Suresh Nair", license: "DL567890", experience: "6 years", rating: 4.6 },
    { name: "Kavita Singh", license: "DL234567", experience: "2 years", rating: 4.1 }
];

        let map;
        let userLocation;
        let selectedCenter;
        let routeLayer;
        let userMarker;
        let centerMarkers = [];
        let simulationMarker;
        let simulationInterval;
        let routeCoordinates = [];

        function initMap() {
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
            populateStates();
            populateTrucks();
            populateDrivers();
            checkNotifications();

            // Check for notifications every 5 seconds
            setInterval(checkNotifications, 5000);
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

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        document.getElementById('locationStatus').textContent = `Location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`;

                        if (userMarker) map.removeLayer(userMarker);
                        userMarker = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([userLocation.lng, userLocation.lat]))
                                    })
                                ]
                            }),
                            style: new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff9500" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
                                    scale: 1
                                })
                            })
                        });
                        map.addLayer(userMarker);
                        map.getView().setCenter(ol.proj.fromLonLat([userLocation.lng, userLocation.lat]));
                        map.getView().setZoom(12);
                    },
                    (error) => {
                        document.getElementById('locationStatus').textContent = 'Error getting location';
                        console.error(error);
                    }
                );
            } else {
                document.getElementById('locationStatus').textContent = 'Geolocation not supported';
            }
        }

        function populateStates() {
            const states = [...new Set(greenCenters.map(center => center.state))];
            const select = document.getElementById('stateSelect');
            select.innerHTML = '<option value="">All States</option>';
            states.forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                select.appendChild(option);
            });
            select.addEventListener('change', filterCenters);
            filterCenters(); // Initial load
        }

        function filterCenters() {
            const selectedState = document.getElementById('stateSelect').value;
            const filteredCenters = selectedState ? greenCenters.filter(center => center.state === selectedState) : greenCenters;
            displayCenters(filteredCenters);
        }

        function displayCenters(centers) {
            const list = document.getElementById('centerList');
            list.innerHTML = '';
            centers.forEach(center => {
                const item = document.createElement('div');
                item.className = 'center-item';
                item.textContent = `${center.name} (${center.type})`;
                item.addEventListener('click', (e) => selectCenter(center, e));
                list.appendChild(item);
            });
        }

        function selectCenter(center, event) {
            selectedCenter = center;
            document.querySelectorAll('.center-item').forEach(item => item.classList.remove('selected'));
            event.target.classList.add('selected');
            document.getElementById('calculateRouteBtn').disabled = false;
            document.getElementById('routeInfo').textContent = `Selected: ${center.name}`;
            map.getView().setCenter(ol.proj.fromLonLat([center.lng, center.lat]));
            map.getView().setZoom(14);
        }

        async function calculateRoute() {
            if (!userLocation || !selectedCenter) return;

            try {
                const response = await fetch(`https://router.project-osm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${selectedCenter.lng},${selectedCenter.lat}?overview=full&geometries=geojson`);
                const data = await response.json();
                if (data.routes && data.routes.length > 0) {
                    const route = data.routes[0];
                    routeCoordinates = route.geometry.coordinates.map(coord => ol.proj.fromLonLat(coord));

                    if (routeLayer) map.removeLayer(routeLayer);
                    routeLayer = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [
                                new ol.Feature({
                                    geometry: new ol.geom.LineString(routeCoordinates)
                                })
                            ]
                        }),
                        style: new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: '#ff9500',
                                width: 4
                            })
                        })
                    });
                    map.addLayer(routeLayer);

                    const distance = (route.distance / 1000).toFixed(2); // km
                    const duration = Math.round(route.duration / 60); // minutes
                    document.getElementById('routeInfo').textContent = `Distance: ${distance} km, Time: ${duration} min`;

                    // Time alert
                    const timeAlert = document.getElementById('timeAlert');
                    if (duration > 60) {
                        timeAlert.innerHTML = '<div class="alert danger">Warning: Journey may take over 1 hour. Plan accordingly!</div>';
                    } else if (duration > 30) {
                        timeAlert.innerHTML = '<div class="alert warning">Note: Journey time is moderate. Monitor traffic.</div>';
                    } else {
                        timeAlert.innerHTML = '<div class="alert success">Great! Journey is short and feasible.</div>';
                    }
                } else {
                    // Fallback mock route if API fails
                    routeCoordinates = [
                        ol.proj.fromLonLat([userLocation.lng, userLocation.lat]),
                        ol.proj.fromLonLat([selectedCenter.lng, selectedCenter.lat])
                    ];

                    if (routeLayer) map.removeLayer(routeLayer);
                    routeLayer = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [
                                new ol.Feature({
                                    geometry: new ol.geom.LineString(routeCoordinates)
                                })
                            ]
                        }),
                        style: new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: '#ff9500',
                                width: 4
                            })
                        })
                    });
                    map.addLayer(routeLayer);

                    const distance = 10; // mock 10 km
                    const duration = 15; // mock 15 min
                    document.getElementById('routeInfo').textContent = `Distance: ${distance} km, Time: ${duration} min`;

                    const timeAlert = document.getElementById('timeAlert');
                    timeAlert.innerHTML = '<div class="alert success">Route calculated (mock data).</div>';
                }
            } catch (error) {
                console.error('Error calculating route:', error);
                // Fallback mock route
                routeCoordinates = [
                    ol.proj.fromLonLat([userLocation.lng, userLocation.lat]),
                    ol.proj.fromLonLat([selectedCenter.lng, selectedCenter.lat])
                ];

                if (routeLayer) map.removeLayer(routeLayer);
                routeLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [
                            new ol.Feature({
                                geometry: new ol.geom.LineString(routeCoordinates)
                            })
                        ]}),
                        style: new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: '#ff9500',
                                width: 4
                            })
                        })
                    });
                map.addLayer(routeLayer);

                const distance = 10; // mock 10 km
                const duration = 15; // mock 15 min
                document.getElementById('routeInfo').textContent = `Distance: ${distance} km, Time: ${duration} min`;

                const timeAlert = document.getElementById('timeAlert');
                timeAlert.innerHTML = '<div class="alert success">Route calculated (mock data).</div>';
            }
        }

        function startSimulation() {
            if (!routeCoordinates.length) return;

            document.getElementById('startSimulationBtn').disabled = true;
            document.getElementById('stopSimulationBtn').disabled = false;

            if (simulationMarker) map.removeLayer(simulationMarker);
            simulationMarker = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [
                        new ol.Feature({
                            geometry: new ol.geom.Point(routeCoordinates[0])
                        })
                    ]
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        src: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#dc3545" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'),
                        scale: 1
                    })
                })
            });
            map.addLayer(simulationMarker);

            let index = 0;
            simulationInterval = setInterval(() => {
                if (index < routeCoordinates.length) {
                    simulationMarker.getSource().getFeatures()[0].getGeometry().setCoordinates(routeCoordinates[index]);
                    map.getView().setCenter(routeCoordinates[index]);
                    document.getElementById('progressFill').style.width = `${(index / routeCoordinates.length) * 100}%`;
                    index++;
                } else {
                    stopSimulation();
                }
            }, 100); // Adjust speed as needed
        }

        function stopSimulation() {
            clearInterval(simulationInterval);
            document.getElementById('startSimulationBtn').disabled = false;
            document.getElementById('stopSimulationBtn').disabled = true;
            document.getElementById('progressFill').style.width = '0%';
        }

        function populateTrucks() {
            const list = document.getElementById('truckList');
            list.innerHTML = '';
            truckOwners.forEach(truck => {
                const item = document.createElement('div');
                item.className = 'center-item';
                item.innerHTML = `<strong>${truck.name}</strong><br>Truck: ${truck.truckId}<br>Status: ${truck.status}<br>Location: ${truck.location}`;
                list.appendChild(item);
            });
        }

        function populateDrivers() {
            const list = document.getElementById('driverList');
            list.innerHTML = '';
            drivers.forEach(driver => {
                const item = document.createElement('div');
                item.className = 'center-item';
                item.innerHTML = `<strong>${driver.name}</strong><br>License: ${driver.license}<br>Experience: ${driver.experience}<br>Rating: ${driver.rating}/5`;
                list.appendChild(item);
            });
        }

        function checkNotifications() {
            const ngoNotification = JSON.parse(localStorage.getItem('ngo_notification')) || null;
            const conservencyNotification = JSON.parse(localStorage.getItem('conservency_notification')) || null;

            const notificationList = document.getElementById('notificationList');
            notificationList.innerHTML = '';

            if (ngoNotification) {
                const item = document.createElement('div');
                item.className = 'center-item';
                item.innerHTML = `
                    <strong>NGO Driver Notification</strong><br>
                    ${ngoNotification.message}<br>
                    <small>${new Date(ngoNotification.timestamp).toLocaleTimeString()}</small>
                `;
                notificationList.appendChild(item);
            }

            if (conservencyNotification) {
                const item = document.createElement('div');
                item.className = 'center-item';
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

        // Event listeners
        document.getElementById('getLocationBtn').addEventListener('click', getLocation);
        document.getElementById('calculateRouteBtn').addEventListener('click', calculateRoute);
        document.getElementById('startSimulationBtn').addEventListener('click', startSimulation);
        document.getElementById('stopSimulationBtn').addEventListener('click', stopSimulation);

        // Initialize map on load
        window.onload = initMap;
