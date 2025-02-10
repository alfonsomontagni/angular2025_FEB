const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const Database = require("better-sqlite3");

let mainWindow;

//Inizializza il database SQLite
const db = new Database("database.sqlite");

// Crea la tabella utenti (se non esiste)
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )
`).run();

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../dist/gettry001/browser/index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  mainWindow.webContents.openDevTools();
};

// Gestione delle richieste da Angular via IPC
ipcMain.handle("get-users", () => {
  return db.prepare("SELECT * FROM users").all();
});

ipcMain.handle("add-user", (_, name, email) => {
  const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  stmt.run(name, email);
  return { success: true };
});

app.whenReady().then(() => {
  createWindow();
});
