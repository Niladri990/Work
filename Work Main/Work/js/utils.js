// utils.js - Common utility functions for the Nirmal app

// API Configuration
const API_BASE = 'http://localhost:8080';

// Common data structures
const WASTE_TYPES = [
    {id:'wet', name:'Wet Waste', icon:'https://img.icons8.com/ios-filled/50/004085/wet.png', category:'biodegradable'},
    {id:'dry', name:'Dry Waste', icon:'https://img.icons8.com/ios-filled/50/004085/empty-box.png', category:'non-biodegradable'},
    {id:'plastic', name:'Plastic Waste', icon:'https://img.icons8.com/ios-filled/50/004085/plastic.png', category:'non-biodegradable'},
    {id:'ewaste', name:'E-Waste', icon:'https://img.icons8.com/ios-filled/50/004085/electronics.png', category:'non-biodegradable'},
    {id:'nonveg', name:'Non-Veg Waste', icon:'https://freesvg.org/img/1531813245.png', category:'biodegradable'},
    {id:'hazardous', name:'Hazardous Waste', icon:'https://tse1.mm.bing.net/th/id/OIP.2oCpxXrQyDdgQhe0AWNRhgAAAA?r=0&w=416&h=416&rs=1&pid=ImgDetMain&o=7&rm=3', category:'non-biodegradable'},
];

const RECYCLING_CENTERS = [
    {name: "Sunrise Recycling Center", lat: 28.6448, lng: 77.2167},
    {name: "GreenEarth Waste Processing", lat: 28.5355, lng: 77.3910},
    {name: "EcoCycle Hub", lat: 28.4089, lng: 77.3178},
];

const POLY_FUEL_CENTERS = [
    {name: "PolyFuel Plant A", lat: 28.7041, lng: 77.1025},
    {name: "PolyFuel Plant B", lat: 28.6139, lng: 77.2090},
];

// Utility Functions
const Utils = {
    // LocalStorage management with error handling
    storage: {
        setItem(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                return false;
            }
        },
        
        getItem(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },
        
        removeItem(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        }
    },
    
    // Form validation
    validation: {
        email(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        password(password) {
            return password && password.length >= 6;
        },
        
        required(value) {
            return value && value.trim().length > 0;
        },
        
        coordinates(lat, lng) {
            return !isNaN(lat) && !isNaN(lng) && 
                   lat >= -90 && lat <= 90 && 
                   lng >= -180 && lng <= 180;
        }
    },
    
    // Distance calculation using Haversine formula
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in km
    },
    
    // Find nearest center
    findNearestCenter(userLat, userLng, centers) {
        let minDistance = Infinity;
        let nearest = null;
        
        centers.forEach(center => {
            const distance = this.calculateDistance(userLat, userLng, center.lat, center.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = center;
            }
        });
        
        return nearest ? { center: nearest, distance: minDistance } : null;
    },
    
    // Parse coordinates from string
    parseCoordinates(coordString) {
        if (!coordString) return null;
        
        const parts = coordString.split(',').map(p => p.trim());
        if (parts.length !== 2) return null;
        
        const lat = parseFloat(parts[0]);
        const lng = parseFloat(parts[1]);
        
        if (this.validation.coordinates(lat, lng)) {
            return { lat, lng };
        }
        
        return null;
    },
    
    // Get current location
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                error => {
                    reject(new Error('Unable to retrieve your location.'));
                },
                { timeout: 15000 }
            );
        });
    },
    
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format date for display
    formatDate(date) {
        return new Date(date).toLocaleString();
    },
    
    // Generate unique ID
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },
    
    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem;
            border-radius: 4px;
            color: white;
            z-index: 10000;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    },
    
    // API call wrapper with error handling
    async apiCall(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            const data = await response.json().catch(() => ({}));
            
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, WASTE_TYPES, RECYCLING_CENTERS, POLY_FUEL_CENTERS, API_BASE };
}
