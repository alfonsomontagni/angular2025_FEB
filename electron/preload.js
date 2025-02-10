

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getUsers: async () => ipcRenderer.invoke("get-users"),
  addUser: async (name, email) => ipcRenderer.invoke("add-user", name, email),
});
