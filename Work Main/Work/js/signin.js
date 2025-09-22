// signup.js
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const userType = document.querySelector('input[name="userType"]:checked').value;
      const riderType = document.getElementById('riderType').value.trim();
      const errorMsg = document.getElementById('errorMsg');

      if (!email || !password) {
        errorMsg.textContent = 'Please fill in all fields.';
        return;
      }
      if (userType === 'rider' && !riderType) {
        errorMsg.textContent = 'Please select rider type.';
        return;
      }

      // Simple demo login: any non-empty email/password works
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userType', userType);
      if (userType === 'rider') {
        localStorage.setItem('riderType', riderType);
      }

      if (userType === 'greenCenter') {
        window.location.href = 'Driver Monitor/GreenCenterDriverMonitor.html';
      } else if (userType === 'ngo') {
        window.location.href = 'Driver Monitor/NGODriverMonitor.html';
      } else if (userType === 'conservency') {
        window.location.href = 'Driver Monitor/ConservancyMonitoringDriver.html';
      } else if (userType === 'rider') {
        if (riderType === 'ngo') {
          window.location.href = 'Driver/NGODriver.html';
        } else {
          window.location.href = 'Driver/ConservencyDriver.html';
        }
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
