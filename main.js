const { app, BrowserWindow } = require('electron');
const path = require('path');

/**
 * Gyrox Desktop Application Entry
 * Lead Architect: Tariq St. Patrick
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 460,
    height: 920,
    minWidth: 380,
    minHeight: 700,
    resizable: true,
    autoHideMenuBar: true,
    title: 'Gyrox',
    backgroundColor: '#121212',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
