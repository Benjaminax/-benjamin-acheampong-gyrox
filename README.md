# Gyrox — Fitness & Wellness Application

**Gyrox** is a high-performance, industry-standard fitness and wellness desktop & mobile application built with a modern dark theme, smooth micro-animations, interactive workout tracking, progress analytics, and custom modals.

---

## ⚡ Features

- **Gyrox Splash Screen**: Clean, animated startup splash screen (`GYROX — TRAIN • TRACK • OVERCOME`).
- **Interactive Workout Hub**: Search workouts by name/category, filter by activity, view routine breakdowns, and launch live timer sessions.
- **Progress & Analytics**: Interactive weekly/monthly/yearly charts, distance tracking, step goals, and streak metrics.
- **Hydration Tracker**: Real-time water logging (+250ml quick add) with dynamic progress ring updates.
- **User Profile & Account Sheets**: Edit profile details, view personal specs, track fitness goals, and inspect achievements.
- **Glassmorphism Navigation**: Glassmorphic bottom navigation bar with top edge light beams and custom dark theme scrollbars.

---

## 🚀 How to Launch Gyrox

### Option 1: Run Pre-Built Windows Executable (.exe)
You can launch the standalone desktop app directly without installing Node.js or dependencies:

1. Navigate to `dist/Gyrox-win32-x64/`
2. Double-click **`Gyrox.exe`** (or run `.\dist\Gyrox-win32-x64\Gyrox.exe` in PowerShell/CMD).

---

### Option 2: Run Desktop App in Development Mode (Electron)
If you want to run or modify the application locally:

```bash
# 1. Clone the repository
git clone https://github.com/Benjaminax/-benjamin-acheampong-gyrox.git
cd -benjamin-acheampong-gyrox

# 2. Install dependencies
npm install

# 3. Start the Gyrox Desktop Application
npm start
```

---

### Option 3: Launch Web Browser Version
You can run the web version directly in any web browser:

1. Open **`index.html`** in your favorite browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, serve it via Python or Node:
   ```bash
   python -m http.server 8085
   ```
   Then open `http://localhost:8085/index.html`.

---

### Option 4: Build Desktop Executable (.exe) from Source
To package the app into a standalone Windows `.exe` bundle:

```bash
npm run build:exe
```
The output executable will be created at `dist/Gyrox-win32-x64/Gyrox.exe`.

---

## 📁 Repository Structure

```
├── index.html              # Main web application & mobile UI (Architect: Tariq St. Patrick)
├── main.js                 # Electron main process entry point
├── package.json            # Dependencies and npm scripts
├── dist/                   # Packaged Windows desktop app (.exe)
│   └── Gyrox-win32-x64/
│       └── Gyrox.exe
└── README.md               # Instructions & documentation
```

---

## 🛠️ Built With

- **Core**: HTML5, Vanilla CSS3 (Custom Design System), Modern JavaScript (ES6+)
- **Desktop Framework**: Electron.js v44
- **Packaging**: `@electron/packager`
