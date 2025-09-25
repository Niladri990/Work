// signup.js
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
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        try {
            const formData = getFormData();
            const validationResult = validateFormData(formData);
            
            if (!validationResult.isValid) {
                showError(validationResult.error);
                return;
            }
            
            registerUser(formData);
        } catch (error) {
            console.error('Signup error:', error);
            showError('An unexpected error occurred. Please try again.');
        }
    });
    
    // Get form data
    function getFormData() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const userType = document.querySelector('input[name="userType"]:checked')?.value;
        const regNumber = document.getElementById('regNumber').value.trim();
        const ownerName = document.getElementById('ownerName').value.trim();
        const conservencyRegNumber = document.getElementById('conservencyRegNumber').value.trim();
        const conservencyOwnerName = document.getElementById('conservencyOwnerName').value.trim();
        const riderType = document.getElementById('riderType').value.trim();
        
        return {
            email, password, confirmPassword, userType, regNumber, 
            ownerName, conservencyRegNumber, conservencyOwnerName, riderType
        };
    }
    
    // Validate form data
    function validateFormData(data) {
        const { email, password, confirmPassword, userType, regNumber, 
                ownerName, conservencyRegNumber, conservencyOwnerName, riderType } = data;
        
        if (!email || !password || !confirmPassword) {
            return { isValid: false, error: 'Please fill in all fields.' };
        }
        
        if (userType === 'rider' && !riderType) {
            return { isValid: false, error: 'Please select rider type.' };
        }
        
        if ((userType === 'greenCenter' || userType === 'ngo') && (!regNumber || !ownerName)) {
            return { isValid: false, error: 'Please fill in Registration Number and Owner Name for Green Center or NGO.' };
        }
        
        if (userType === 'conservency' && (!conservencyRegNumber || !conservencyOwnerName)) {
            return { isValid: false, error: 'Please fill in Registration Number and Owner Name for Conservency.' };
        }
        
        if (password !== confirmPassword) {
            return { isValid: false, error: 'Passwords do not match.' };
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, error: 'Please enter a valid email address.' };
        }
        
        // Password strength validation
        if (password.length < 6) {
            return { isValid: false, error: 'Password must be at least 6 characters long.' };
        }
        
        return { isValid: true };
    }
    
    // Show error message
    function showError(message) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }
    
    // Register user
    async function registerUser(formData) {
        const { email, password, userType, riderType, regNumber, ownerName, conservencyRegNumber, conservencyOwnerName } = formData;
        
        try {
            // Call backend API for registration
            const response = await fetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    confirmPassword: password,
                    userType: userType,
                    riderType: riderType,
                    regNumber: regNumber,
                    ownerName: ownerName,
                    conservancyRegNumber: conservencyRegNumber,
                    conservancyOwnerName: conservencyOwnerName
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            
            // Store JWT token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userType', data.userType);
            localStorage.setItem('userId', data.userId);
            
            if (data.riderType) {
                localStorage.setItem('riderType', data.riderType);
            }
            
            // Redirect based on user type
            redirectUser(userType);
            
        } catch (error) {
            console.error('Registration error:', error);
            showError(error.message || 'Signup failed');
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
    function redirectUser(userType) {
        const redirectMap = {
            'greenCenter': 'GreenCenter.html',
            'ngo': 'NGO.html',
            'conservency': 'GreenCenter.html',
            'rider': 'User.html',
            'user': 'User.html'
        };
        
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