const { BrowserWindow, Menu, screen } = require('electron');
const path = require('path');

function createWindow(port) {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Membuat jendela utama
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, '../assets/logo.ico'),
    webPreferences: {
      preload: path.join(__dirname, './renderer.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
    frame: true,
    fullscreen: false,
  });

  // Menangani kesalahan saat memuat URL
  mainWindow.loadURL(`http://localhost:${port}`)
    .then(() => {
      console.log('URL loaded successfully');
    })
    .catch(err => {
      console.error('Error loading URL:', err);
      // Menampilkan jendela error jika gagal memuat URL
      const errorWindow = new BrowserWindow({
        width: 400,
        height: 300,
        title: 'Error',
        modal: true,
        parent: mainWindow,
        autoHideMenuBar: true,
        webPreferences: {
          contextIsolation: true,
          enableRemoteModule: false,
          nodeIntegration: false,
        }
      });

      errorWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { font-size: 24px; color: red; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          <h1>Error</h1>
          <p>There was an error loading the application. Please check the console for more details.</p>
          <p>Error Message: ${err.message}</p>
        </body>
        </html>
      `));
    });

  // Membuat menu aplikasi
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            require('electron').app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click() {
            mainWindow.reload();
          }
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'CmdOrCtrl+I',
          click() {
            mainWindow.webContents.toggleDevTools();
          }
        },
        { type: 'separator' },
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus',
          click() {
            const zoomFactor = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(zoomFactor + 0.1);
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click() {
            const zoomFactor = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(zoomFactor - 0.1);
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'CmdOrCtrl+0',
          click() {
            mainWindow.webContents.setZoomFactor(1);
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Full Screen',
          accelerator: 'F11',
          click() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          accelerator: 'CmdOrCtrl+D',
          click() {
            require('electron').shell.openExternal('https://your-docs-url.com');
          }
        },
        {
          label: 'About',
          click() {
            const aboutWindow = new BrowserWindow({
              width: 400,
              height: 300,
              title: 'About',
              modal: true,
              parent: mainWindow,
              autoHideMenuBar: true,
              webPreferences: {
                contextIsolation: true,
                enableRemoteModule: false,
                nodeIntegration: false,
              }
            });

            aboutWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>About</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 20px; }
                  h1 { font-size: 24px; }
                  p { font-size: 16px; }
                </style>
              </head>
              <body>
                <h1>About MyApp</h1>
                <p>Version 1.0.0</p>
                <p>MyApp is a sample Electron application.</p>
              </body>
              </html>
            `));
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

module.exports = { createWindow };
