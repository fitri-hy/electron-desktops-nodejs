const { app } = require('electron');
const express = require('express');
const path = require('path');
const webRoutes = require('./routes/WebRoute');
const { createWindow } = require('./app/Window');

const expressApp = express();
const port = 3000;

expressApp.set('view engine', 'ejs');
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.use(express.static(path.join(__dirname, 'public')));
expressApp.use(express.urlencoded({ extended: true }));

expressApp.use('/', webRoutes);

expressApp.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});

app.whenReady().then(() => {
  createWindow(port);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(port);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
