const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("electronAPI", {
  convertPngToJpeg: (inputPath, outputPath) =>
    ipcRenderer.invoke("convert-png-to-jpeg", inputPath, outputPath),
  runFfmpeg: (args, inputPath, outputPath) =>
    ipcRenderer.invoke("run-ffmpeg", args, inputPath, outputPath),
  onFfmpegProgress: (callback) =>
    ipcRenderer.on("ffmpeg-progress", (event, data) => callback(data)),
  selectFile: () => ipcRenderer.invoke("select-file"),
  getMediaInfo: (inputPath) => ipcRenderer.invoke("get-media-info", inputPath),
});
