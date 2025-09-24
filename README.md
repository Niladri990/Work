## Nirmal App (Frontend Only)

Lightweight HTML/CSS/JS app for waste reporting and routing. Authentication is now handled locally (no backend required) using localStorage with optional demo users for quick testing.


## 🚀 Quick Start

1. Open `index.html` in your browser
2. From the landing page, click “Get Started”
3. Use either Sign Up or the demo credentials below to Sign In


## 🔐 Authentication (Offline)

- Sign In and Sign Up are implemented with localStorage
- Registered users are stored under the `registeredUsers` key
- On first load, a set of demo users is created automatically for testing

Demo credentials page (open in browser):
- `Work Main/Work/demo-credentials.html`

Summary of demo users (all with password `password123`):
- Green Center: `admin@greencenter.com`
- NGO: `admin@ngo.com`
- Conservency: `admin@conservency.com`
- Rider (NGO): `rider@ngo.com`
- Rider (Conservancy): `rider@conservency.com`
- User: `user@test.com`


## ✅ Current Features

- Sign In for all user types (Green Center, NGO, Conservency, Rider, User)
- Sign Up with validation and duplicate-email protection
- User-type redirects after auth
- Persistent data in localStorage (complaints, bookings, schedules, profile)
- In-app notifications for success and errors


## 📂 Frontend Structure

Root app: `Work Main/Work/`

Pages:
- `Signin.html`, `Signup.html`, `User.html`, `GreenCenter.html`, `NGO.html`

Scripts:
- `js/signin.js` – Sign In (localStorage-based)
- `js/signup.js` – Sign Up (localStorage-based)
- `js/User.js` – Main user flows (Report, Booking, Schedule, Dashboard, etc.)
- `js/utils.js` – Shared utilities (storage, validation, distance calc, notifications)

Styles:
- `css/*.css`


## ⚙️ Backend (Optional)

If you later connect a real backend, set your API base in these files and replace the mock logic with fetch calls:
- `Work Main/Work/js/signin.js`
- `Work Main/Work/js/signup.js`

Currently, API calls are mocked; no server is required.


## 🧪 How to Test Auth Quickly

1. Open `Work Main/Work/demo-credentials.html`
2. Go to `Work Main/Work/Signin.html`
3. Select a user type matching the email you use
4. Enter the email and `password123`
5. Click Sign In (you’ll be redirected to the correct dashboard)


## ❓ Troubleshooting

- “Failed to fetch” no longer applies: the app doesn’t call a server by default
- If nothing happens on Sign In, ensure the selected user type matches the email
- To reset demo data, clear site storage (localStorage) in your browser and reload


## 📌 Notes

- This project is intentionally framework-free for easy embedding and offline demos
- Code has been refactored for clarity and reusability; see `js/utils.js` and `js/User.js`

 ## Demo Credentials for Testing:
 
 | User Type    | Email                 | Password    | Additional Info   |
 |--------------|-----------------------|-------------|-------------------|
 | Green Center | admin@greencenter.com | password123 | Reg: GC001        |
 | NGO          | admin@ngo.com         | password123 | Reg: NGO001       |
 | Conservency  | admin@conservency.com | password123 | Reg: CONS001      |
 | Rider (NGO)  | rider@ngo.com         | password123 | Type: NGO Rider   |
 | Rider (Conservancy) | rider@conservency.com | password123 | Type: Conservancy Rider |
 | User         | user@test.com         | password123 | Regular user      |
 
 --------------------------------------------------------------------------
## 👥 Contributors

Thanks goes to these wonderful people ✨  

[![Contributors](https://contrib.rocks/image?repo=your-username/your-repo)](https://github.com/your-username/your-repo/graphs/contributors)

Made with [contrib.rocks](https://contrib.rocks).

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
