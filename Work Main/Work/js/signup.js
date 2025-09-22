// signup.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();
      const userType = document.querySelector('input[name="userType"]:checked').value;
      const regNumber = document.getElementById('regNumber').value.trim();
      const ownerName = document.getElementById('ownerName').value.trim();
      const conservencyRegNumber = document.getElementById('conservencyRegNumber').value.trim();
      const conservencyOwnerName = document.getElementById('conservencyOwnerName').value.trim();
      const riderType = document.getElementById('riderType').value.trim();
      const errorMsg = document.getElementById('errorMsg');

      if (!email || !password || !confirmPassword) {
        errorMsg.textContent = 'Please fill in all fields.';
        return;
      }
      if (userType === 'rider' && !riderType) {
        errorMsg.textContent = 'Please select rider type.';
        return;
      }
      if ((userType === 'greenCenter' || userType === 'ngo') && (!regNumber || !ownerName)) {
        errorMsg.textContent = 'Please fill in Registration Number and Owner Name for Green Center or NGO.';
        return;
      }
      if (userType === 'conservency' && (!conservencyRegNumber || !conservencyOwnerName)) {
        errorMsg.textContent = 'Please fill in Registration Number and Owner Name for Conservency.';
        return;
      }
      if (password !== confirmPassword) {
        errorMsg.textContent = 'Passwords do not match.';
        return;
      }

      // Simple demo sign-up: store user info in localStorage (not secure, for demo only)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        errorMsg.textContent = 'Email already registered.';
        return;
      }
      const userData = { email, password, userType };
      if (userType === 'rider') {
        userData.riderType = riderType;
      } else if (userType === 'greenCenter' || userType === 'ngo') {
        userData.regNumber = regNumber;
        userData.ownerName = ownerName;
      } else if (userType === 'conservency') {
        userData.regNumber = conservencyRegNumber;
        userData.ownerName = conservencyOwnerName;
      }
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto-login after signup
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userType', userType);
      if (userType === 'rider') {
        localStorage.setItem('riderType', riderType);
      }

      // Redirect to main page based on user type
      if(userType === 'greenCenter' || userType === 'ngo' || userType === 'rider'){
        window.location.href = 'GreenCenterDriverMonitor.html';
      } else if(userType === 'conservency'){
        window.location.href = 'Driver Monitor/ConservancyMonitoringDriver.html';
      } else {
        window.location.href = 'User.html';
      }
    });

    // Show/hide fields based on user type
    document.querySelectorAll('input[name="userType"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const greenCenterFields = document.getElementById('greenCenterFields');
        const conservencyFields = document.getElementById('conservencyFields');
        const riderOptions = document.getElementById('riderOptions');
        if (this.value === 'rider') {
          riderOptions.style.display = 'block';
          greenCenterFields.style.display = 'none';
          conservencyFields.style.display = 'none';
        } else if (this.value === 'greenCenter' || this.value === 'ngo') {
          greenCenterFields.style.display = 'block';
          conservencyFields.style.display = 'none';
          riderOptions.style.display = 'none';
        } else if (this.value === 'conservency') {
          conservencyFields.style.display = 'block';
          greenCenterFields.style.display = 'none';
          riderOptions.style.display = 'none';
        } else {
          greenCenterFields.style.display = 'none';
          conservencyFields.style.display = 'none';
          riderOptions.style.display = 'none';
        }
      });
    });
});