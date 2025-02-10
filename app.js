const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "dist",
        "gettry001",
        "browser",
        "index.html"
      ),
      protocol: "file",
      slashes: true,
    })
  );

  mainWindow.webContents.openDevTools();
  mainWindow.webContents.on("console-message", (event, level, message) => {
    if (message.includes("Autofill.enable") || message.includes("Autofill.setAddresses")) {
      return;
    }
    console.log(`[${level}] ${message}`);
  });
  
};

app.whenReady().then(() => {
  createWindow();
});
