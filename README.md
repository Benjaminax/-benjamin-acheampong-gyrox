# 🏋️ Gyrox — Fitness & Wellness Application

**Gyrox** is a high-performance, modern fitness & wellness desktop and web application featuring real-time exercise routines powered by **ExerciseDB**, animated exercise GIFs, dynamic dark/light mode, smooth micro-animations, interactive workout tracking, progress analytics, and custom modals.

---

## 💻 Windows Executable (.exe)

The application is pre-packaged and ready to run on Windows without needing Node.js or any dependencies installed:

📍 **Executable File Path:**
```
dist/Gyrox-win32-x64/Gyrox.exe
```

### Quick Run:
1. Open the repository folder.
2. Go to **`dist/Gyrox-win32-x64/`**.
3. Double-click **`Gyrox.exe`** to launch the standalone desktop app!

---

## ⚡ Features & Capabilities

- **🏋️ Live ExerciseDB API & Animated GIFs**: Fetches 1,500+ real exercises across 6 major body part categories (Chest, Abs & Core, Arms, Back, Legs, Shoulders) complete with target muscle descriptions and step-by-step demonstration GIFs.
- **🌙 Dark Mode & Light Mode**: Toggle seamlessly between dark and light themes with saved preference in `localStorage`.
- **✨ Lucide Icons**: Modern SVG icon integration across top header, navigation bar, and settings.
- **📱 Responsive & Skeleton Loading**: Smooth shimmer loading states while fetching exercise data and routines.
- **💧 Hydration Tracker**: Real-time water intake logging (+250ml quick add) with visual progress updates.
- **📊 Progress & Analytics**: Interactive workout completion metrics, weekly history, step tracking, and streak logs.
- **🚀 Electron Desktop Desktop App**: Fast, native desktop shell powered by Electron.

---

## 🚀 How to Launch & Build

### Option 1: Run Pre-Built Windows Executable (.exe)
Double-click **`dist/Gyrox-win32-x64/Gyrox.exe`** or execute via terminal:
```powershell
.\dist\Gyrox-win32-x64\Gyrox.exe
```

---

### Option 2: Run Desktop App in Development Mode (Electron)
```bash
# 1. Install dependencies
npm install

# 2. Start the Gyrox Desktop Application
npm start
```

---

### Option 3: Launch Web Version
Open **`index.html`** in any modern web browser or serve locally:
```bash
npx serve -p 3000 .
```

---

### Option 4: Re-Package / Re-Build Executable (.exe)
To package code updates into `dist/Gyrox-win32-x64/Gyrox.exe`:
```bash
npm run build:exe
```

---

## 📁 Repository Structure

```
├── index.html              # Core application UI, ExerciseDB integration, dark mode
├── main.js                 # Electron main process entry point
├── package.json            # Build scripts & dependencies
├── dist/                   # Built desktop application
│   └── Gyrox-win32-x64/
│       └── Gyrox.exe       # Standalone Windows Executable (.exe)
└── README.md               # Documentation & usage guide
```

---

## 🛠️ Built With

- **Core Application**: HTML5, CSS3 Custom Properties, Modern Vanilla JavaScript (ES6+)
- **Data & Media**: ExerciseDB API & Free Animated Exercise GIFs
- **Icons**: Lucide Icons
- **Desktop Engine**: Electron v44
- **Packaging**: `@electron/packager`

