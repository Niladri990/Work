// signin.js
document.addEventListener('DOMContentLoaded', function() {
    const API_BASE = 'http://localhost:8080';
    
    // Initialize demo users if none exist
    initializeDemoUsers();
    
    // Initialize demo users for testing
    function initializeDemoUsers() {
        const existingUsers = localStorage.getItem('registeredUsers');
        if (!existingUsers) {
            const demoUsers = [
                {
                    id: 1,
                    email: 'admin@greencenter.com',
                    password: 'password123',
                    userType: 'greenCenter',
                    regNumber: 'GC001',
                    ownerName: 'Green Center Admin',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    email: 'admin@ngo.com',
                    password: 'password123',
                    userType: 'ngo',
                    regNumber: 'NGO001',
                    ownerName: 'NGO Admin',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    email: 'admin@conservency.com',
                    password: 'password123',
                    userType: 'conservency',
                    conservencyRegNumber: 'CONS001',
                    conservencyOwnerName: 'Conservency Admin',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    email: 'rider@ngo.com',
                    password: 'password123',
                    userType: 'rider',
                    riderType: 'ngo',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 5,
                    email: 'user@test.com',
                    password: 'password123',
                    userType: 'user',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('registeredUsers', JSON.stringify(demoUsers));
        }
    }
    
    // Form submission handler
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        try {
            const formData = getFormData();
            const validationResult = validateFormData(formData);
            
            if (!validationResult.isValid) {
                showError(validationResult.error);
                return;
            }
            
            authenticateUser(formData);
        } catch (error) {
            console.error('Signin error:', error);
            showError('An unexpected error occurred. Please try again.');
        }
    });
    
    // Get form data
    function getFormData() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const userType = document.querySelector('input[name="userType"]:checked')?.value;
        const riderType = document.getElementById('riderType').value.trim();
        
        return { email, password, userType, riderType };
    }
    
    // Validate form data
    function validateFormData(data) {
        if (!data.email || !data.password) {
            return { isValid: false, error: 'Please fill in all fields.' };
        }
        
        if (data.userType === 'rider' && !data.riderType) {
            return { isValid: false, error: 'Please select rider type.' };
        }
        
        return { isValid: true };
    }
    
    // Show error message
    function showError(message) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }
    
    // Authenticate user
    async function authenticateUser(formData) {
        const { email, password, userType, riderType } = formData;
        
        try {
            // Mock authentication - check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = users.find(u => u.email === email && u.password === password && u.userType === userType);
            
            if (!user) {
                throw new Error('Invalid email, password, or user type.');
            }
            
            // Store user data
            storeUserData(email, userType, riderType);
            
            // Redirect based on user type
            redirectUser(userType, riderType);
            
        } catch (error) {
            console.error('Authentication error:', error);
            showError(error.message || 'Signin failed');
        }
    }
    
    // Store user data in localStorage
    function storeUserData(email, userType, riderType) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', userType);
        
        if (userType === 'rider' && riderType) {
            localStorage.setItem('riderType', riderType);
        }
    }
    
    // Redirect user based on type
    function redirectUser(userType, riderType) {
        const redirectMap = {
            'greenCenter': 'GreenCenter.html',
            'ngo': 'NGO.html',
            'conservency': 'ConservancyMonitor.html',
            // 'rider' will be handled below
            'user': 'User.html'
        };

        if (userType === 'rider') {
            if (riderType === 'ngo') {
                window.location.href = 'NGO Rider.html';
                return;
            } else if (riderType === 'conservancy') {
                window.location.href = 'ConservancyRider.html';
                return;
            } else {
                window.location.href = 'User.html';
                return;
            }
        }

        const redirectUrl = redirectMap[userType] || 'User.html';
        window.location.href = redirectUrl;
    }

    // Show/hide fields based on user type
    document.querySelectorAll('input[name="userType"]').forEach(radio => {
        radio.addEventListener('change', function() {
            toggleUserTypeFields(this.value);
        });
    });
    
    // Toggle fields based on user type
    function toggleUserTypeFields(userType) {
        const greenCenterFields = document.getElementById('greenCenterFields');
        const conservencyFields = document.getElementById('conservencyFields');
        const riderOptions = document.getElementById('riderOptions');
        
        // Hide all fields first
        [greenCenterFields, conservencyFields, riderOptions].forEach(field => {
            if (field) field.style.display = 'none';
        });
        
        // Show relevant fields based on user type
        switch (userType) {
            case 'rider':
                if (riderOptions) riderOptions.style.display = 'block';
                break;
            case 'greenCenter':
            case 'ngo':
                if (greenCenterFields) greenCenterFields.style.display = 'block';
                break;
            case 'conservency':
                if (conservencyFields) conservencyFields.style.display = 'block';
                break;
            default:
                // All fields remain hidden for 'user' type
                break;
        }
    }
});
