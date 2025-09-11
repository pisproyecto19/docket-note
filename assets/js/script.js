// Import utilities
import { getDate, getSubtitle, emailRegex } from "../utilities/utilities.mjs";

/* -------------------------
   User-Friendly Messages
------------------------- */
const MESSAGES = {
  // Auth-related
  FULL_NAME_SHORT: "Full name must be at least 3 characters long.",
  INVALID_EMAIL: "Please enter a valid email address.",
  WEAK_PASSWORD: "Password must be at least 8 characters long.",
  PASSWORD_MISMATCH: "Your passwords do not match. Please try again.",
  INVALID_LOGIN:
    "The email or password you entered is incorrect. Please try again.",

  // Location & Weather
  GEO_NOT_SUPPORTED: "Your browser does not support location services.",
  GEO_DENIED:
    "Location access denied. Please enable location to see your local weather.",
  WEATHER_FETCH_ERROR:
    "Unable to retrieve weather data at the moment. Please try again later.",
};

/* -------------------------
   Preloader Handling
------------------------- */
const preLoader = document.getElementById("preLoader");

window.addEventListener("load", () => {
  if (preLoader) preLoader.style.display = "none";
});

/* -------------------------
   Authentication Logic
------------------------- */
const authHeading = document.getElementById("authHeading");
const subTitle = document.getElementById("subtitle");
const authForm = document.getElementById("authForm");
const loginPage = document.getElementById("loginPage");
const logoutBtn = document.getElementById("logoutBtn");

const existingUser = localStorage.getItem("user");
const sessionUser = sessionStorage.getItem("user");

/**
 * Show error notification with message
 */
const showError = (message) => {
  const errorNotification = document.getElementById("error-notification");
  const errorText = document.getElementById("error");

  if (!errorNotification || !errorText) return;

  errorNotification.style.display = "block";
  errorText.textContent = message;

  // Hide error after 5 seconds
  setTimeout(() => {
    errorNotification.style.display = "none";
    errorText.textContent = "";
  }, 5000);
};

/**
 * Handle Registration
 */
function setupRegistration() {
  if (!authHeading || !authForm) return;

  authHeading.textContent = "Register";
  subTitle.textContent = getSubtitle();

  authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(authForm);
    let fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("conformPassword");

    if (fullName.length < 3) return showError(MESSAGES.FULL_NAME_SHORT);
    if (!emailRegex.test(email)) return showError(MESSAGES.INVALID_EMAIL);
    if (password.length < 8) return showError(MESSAGES.WEAK_PASSWORD);
    if (password !== confirmPassword)
      return showError(MESSAGES.PASSWORD_MISMATCH);

    const userData = { fullName, email, password };

    localStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("user", JSON.stringify(userData));

    fullName = "";
    document.getElementById("password").value = "";

    if (loginPage) loginPage.style.display = "none";
  });
}

/**
 * Handle Login
 */
function setupLogin() {
  if (!authHeading) return;

  authHeading.textContent = "LogIn";
  subTitle.textContent = getSubtitle();

  // Hide fields not needed for login
  document.getElementById("fullName").style.display = "none";
  document.getElementById("conformPassword").style.display = "none";

  document.getElementById("AuthBtn")?.addEventListener("click", (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      !storedUser ||
      email !== storedUser.email ||
      password !== storedUser.password
    ) {
      return showError(MESSAGES.INVALID_LOGIN);
    }

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    sessionStorage.setItem("user", JSON.stringify(storedUser));
    if (loginPage) loginPage.style.display = "none";
  });
}

/**
 * Handle Logout
 */
logoutBtn?.addEventListener("click", () => {
  sessionStorage.removeItem("user");
  if (loginPage) loginPage.style.display = "flex";
});

// Initialize authentication flow
if (!existingUser) {
  setupRegistration();
} else if (!sessionUser) {
  setupLogin();
} else {
  if (loginPage) loginPage.style.display = "none";
}

/* -------------------------
   Profile Menu
------------------------- */
const profileImg = document.getElementById("profileImg");
const profileMenu = document.getElementById("profileMenu");

profileImg?.addEventListener("click", (e) => {
  e.stopPropagation();
  profileMenu?.classList.toggle("show");
});

document.addEventListener("click", () => {
  profileMenu?.classList.remove("show");
});

/* -------------------------
   Notes Handling
------------------------- */
const plusBtn = document.getElementById("plusBtn");
const colors = document.getElementById("colors");
const notes = document.getElementById("notes");
const pinnedNotes = document.getElementById("pinedNotes");
let notesData = JSON.parse(localStorage.getItem("notes")) || [];

// Expand color options on plus button click
plusBtn?.addEventListener("click", () => {
  plusBtn.classList.toggle("rotate");
  colors?.querySelectorAll("*").forEach((el) => el.classList.toggle("show"));
});

// Add new note
colors
  ?.querySelectorAll("*")
  .forEach((colorBtn) =>
    colorBtn.addEventListener("click", () => createNote(colorBtn.dataset.color))
  );

/**
 * Create and save a new note
 */
function createNote(bgColor) {
  const noteObj = {
    id: Date.now(),
    text: "This is a Docket Note.",
    color: bgColor,
    date: new Date(),
    isPined: false,
  };

  notesData.push(noteObj);
  saveNotes();
  renderNote(noteObj);
}

/**
 * Render a single note
 */
function renderNote(noteObj) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.style.backgroundColor = noteObj.color;

  note.innerHTML = `
    <textarea>${noteObj.text}</textarea>
    <div class="date-btn">
      <span>${getDate(noteObj.date)}</span>
      <div class="note-btn">
        <div class="primary-btn noteMenuBtn">
          <i class="fi fi-br-menu-dots"></i>
        </div>
        <ul class="menu noteMenu">
          <li class="pinBtn"><i class="fi fi-rr-thumbtack"></i> <span id="pinBtnText">${
            noteObj.isPined ? "Unpin" : "Pin"
          }</span></li>
          <li class="deleteBtn"><i class="fi fi-rr-trash"></i> <span>Delete</span></li>
        </ul>
      </div>
    </div>
    ${
      noteObj.isPined
        ? '<div class="pinIcon"><i class="fi fi-sr-thumbtack"></i></div>'
        : ""
    }
  `;

  // Append to correct container
  if (noteObj.isPined) {
    pinnedNotes.prepend(note);
  } else {
    notes.prepend(note);
  }

  requestAnimationFrame(() => note.classList.add("show"));

  // Text update
  note.querySelector("textarea").addEventListener("input", (e) => {
    noteObj.text = e.target.value;
    saveNotes();
  });

  // Menu toggle
  const noteMenuBtn = note.querySelector(".noteMenuBtn");
  const noteMenu = note.querySelector(".noteMenu");

  noteMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".noteMenu").forEach((menu) => {
      if (menu !== noteMenu) menu.classList.remove("show");
    });
    noteMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => noteMenu.classList.remove("show"));

  // Delete note
  note.querySelector(".deleteBtn").addEventListener("click", () => {
    notesData = notesData.filter((n) => n.id !== noteObj.id);
    note.remove();
    saveNotes();
  });

  // Pin note
  note.querySelector(".pinBtn").addEventListener("click", () => {
    noteObj.isPined = !noteObj.isPined;
    notesData = notesData.filter((n) => n.id !== noteObj.id);
    notesData.unshift(noteObj);
    saveNotes();
    renderAllNotes();
  });
}

/**
 * Render all notes
 */
function renderAllNotes() {
  notes.innerHTML = "";
  pinnedNotes.innerHTML = "";
  notesData.forEach((obj) => renderNote(obj));
}

/**
 * Save notes to localStorage
 */
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notesData));
}

// Initial render
renderAllNotes();

/* -------------------------
   Weather API Integration
------------------------- */
const API_KEY = "";
const weather = document.getElementById("weather");
if (!API_KEY || API_KEY === "your_api_key_here") {
  weather.textContent =
    "Weather unavailable (API key missing)";
} else {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather, geoError);
  } else {
    weather.textContent = MESSAGES.GEO_NOT_SUPPORTED;
  }

  async function fetchWeather(position) {
    const { latitude, longitude } = position.coords;

    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&eqi=no`
      );
      const data = await res.json();

      // Toggle between °C and °F on click
      weather.addEventListener("click", () => {
        const toggle = weather.classList.toggle("weatherIn");
        weather.innerHTML = `
        <img src=${data?.current?.condition?.icon} alt="weather-icon"/>
        <p>${
          toggle ? `${data?.current?.temp_f} °F` : `${data?.current?.temp_c} °C`
        }</p>
      `;
      });

      // Default °C
      weather.innerHTML = `
      <img src=${data?.current?.condition?.icon} alt="weather-icon"/>
      <p>${data?.current?.temp_c} °C</p>
    `;
    } catch (err) {
      weather.textContent = MESSAGES.WEATHER_FETCH_ERROR;
    }
  }

  function geoError() {
    weather.textContent = MESSAGES.GEO_DENIED;
  }
}
