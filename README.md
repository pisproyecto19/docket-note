# 📓 Docket Notes

A lightweight, offline-first **note-taking web app** built with **HTML, SCSS/CSS, and Vanilla JavaScript**.  
It comes with **user authentication, colorful notes, pin/unpin support, persistent storage, and live weather integration**.  

---

## ✨ Features

### ✅ Current Features
- **Authentication**
  - Register with validation (name, email, password, confirm password).
  - Login with saved credentials.
  - Error handling with user-friendly messages.
  - LocalStorage for persistent user accounts, SessionStorage for active sessions.
  - Logout support.

- **Notes Management**
  - Create colorful notes (with palette).
  - Inline editing with auto-save.
  - Pin/unpin notes (separate "Pinned" and "Other" sections).
  - Delete individual notes.
  - Notes stored in LocalStorage for persistence.

- **UI/UX**
  - Preloader animation before load.
  - Sidebar with expandable color palette.
  - Profile menu with quick actions.
  - Responsive layout.
  - Notification system for errors and warnings.

- **Weather Widget**
  - Detects location via Geolocation API.
  - Fetches live weather using [WeatherAPI](https://www.weatherapi.com/).
  - °C/°F toggle on click.
  - Graceful error handling when location or API fails.

---

### 🚀 Upcoming (Planned Features)
- **Search**
  - Search notes in real-time.
  - Search history (stored locally).
  - Option to clear search history.

- **Profile Management**
  - Edit username, email, and password.
  - Delete user account.

- **Settings**
  - Clear all notes at once.
  - Manage saved searches.
  - Dark/light theme (planned).

- **Weather**
  - More Information of weather

---

## 📂 Project Structure

docket-notes/
├── assets/
│ ├── css/
│ │ └── style.css
│ │ └── style.map.css
│ │ └── style.scss
│ ├── js/
│ │ └── script.js
│ ├── img/
│ │ └── profile_img.jpeg
│
├── utilities/
│ └── utilities.mjs
│
├── index.html
└── README.md


---

## ⚙️ Getting Started

### Prerequisites
- Modern browser (Chrome, Firefox, Edge, Safari).
- [Node.js](https://nodejs.org/) (optional, if compiling SCSS).

### Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/asfand522004/docket-note.git
   cd docket-notes

2. Open index.html in your browser OR run on with live server


---

## 🔑 API Key Setup

The weather widget requires a free WeatherAPI key.
Replace the placeholder key in script.js:

    const API_KEY = "your_api_key_here";


---


🔗 Live Demo

Once deployed, your app will be available at:
  
    https://docket-notes.vercel.app


---

📸 Screenshots



---


## 🤝 Contributing
  - Fork this repository
  - Create a new branch: git checkout -b feature-name
  - Commit your changes: git commit -m "Added feature XYZ"
  - Push to your fork: git push origin feature-name
  - Open a Pull Request 🚀

---

## 📜 License
  This project is licensed under the MIT License. See LICENSE for details.

---

## 👨‍💻 Author
Developed by **Asfand** ✨
If you have ideas or improvements, feel free to open an issue or PR!


---

