const { ipcMain } = require("electron/main");
const { execFile } = require("node:child_process");
const { spawn } = require("node:child_process");
const { dialog } = require('electron');

function parseDuration(str) {
  const parts = str.split(":");
  return (
    parseInt(parts[0]) * 3600 + // 小时转秒
    parseInt(parts[1]) * 60 + // 分钟转秒
    parseFloat(parts[2]) // 秒
  );
}

function getDuration(inputPath) {
  //const ffprobePath = '/usr/local/bin/ffprobe';
  return new Promise((resolve) => {
    const ffprobe = spawn("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      inputPath,
    ]);
    let output = "";
    ffprobe.stdout.on("data", (data) => (output += data.toString()));

    ffprobe.on("close", () => {
      const duration = parseFloat(output);
      resolve(isNaN(duration) ? 0 : duration);
    });
    ffprobe.on("error", () => resolve(0));
  });
}

function registerIpcHandlers() {
  //png - jpeg 图片demo
  ipcMain.handle(
    "convert-png-to-jpeg",
    async (event, inputPath, outputPath) => {
      return new Promise((resolve, reject) => {
        execFile(
          "ffmpeg",
          ["-y", "-i", inputPath, outputPath],
          (error, stdout, stderr) => {
            if (error) {
              resolve({ success: false, message: stderr || error.message });
            } else {
              resolve({ success: true, message: "转换成功" });
            }
          }
        );
      });
    }
  );

  // video 转码
  ipcMain.handle("run-ffmpeg", async (event, ffmpegArgs, inputPath) => {
    const duration = await getDuration(inputPath);
    const startTime = Date.now();
    return new Promise((resolve, reject) => {
      const ffmpeg = spawn("ffmpeg", ffmpegArgs);
      let stderr = "";
      ffmpeg.stderr.on("data", (data) => {
        const str = data.toString();
        stderr += str;

        // 匹配 ffmpeg 输出的当前时间
        const timeMatch = str.match(/time=(\d+:\d+:\d+\.\d+)/);

        if (timeMatch && duration > 0) {
          const current = parseDuration(timeMatch[1]);
          const percent = Math.min(100, (current / duration) * 100);
          const elapsed = (Date.now() - startTime) / 1000; // 已耗时（秒）
          // 预计总耗时 = 已耗时 / 已处理进度
          const progress = current / duration;
          const estimatedTotal = progress > 0 ? elapsed / progress : 0;
          const remain = estimatedTotal - elapsed;

          event.sender.send("ffmpeg-progress", {
            percent: percent.toFixed(1),
            //
            elapsed: elapsed.toFixed(1),
            remain: remain > 0 ? remain.toFixed(1) : "0",
          });
        }
      });
      ffmpeg.on("close", (code) => {
        if (code === 0) {
          event.sender.send("ffmpeg-progress", {
            percent: 100,
            elapsed: duration,
            remain: 0,
          });
          resolve({ success: true, message: "转换成功" });
        } else {
          resolve({ success: false, message: stderr });
        }
      });
      ffmpeg.on("error", (err) => {
        resolve({ success: false, message: err.message });
      });
    });
  });

  // 获取文件
  ipcMain.handle("select-file", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: "视频文件", extensions: ["mp4", "mov", "avi", "mkv"] },
        { name: "所有文件", extensions: ["*"] },
      ],
    });
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    return result.filePaths[0];
  });

  // 获取媒体信息
  ipcMain.handle("get-media-info", async (event, inputPath) => {
    return new Promise((resolve) => {
      const ffprobe = spawn("ffprobe", [
        "-v",
        "error",
        "-show_entries",
        "format:stream",
        "-of",
        "json",
        inputPath,
      ]);
      let output = "";
      ffprobe.stdout.on("data", (data) => (output += data.toString()));
      ffprobe.on("close", () => {
        try {
          const info = JSON.parse(output);
          resolve(info);
        } catch (e) {
          resolve(null);
        }
      });
      ffprobe.on("error", () => resolve(null));
    });
  });

  //选择保存位置
  ipcMain.handle('select-save-path', async (event, { defaultPath, filters }) => {
    const result = await dialog.showSaveDialog({
      title: '选择保存位置',
      defaultPath,
      filters
    });
    if (result.canceled) return null;
    return result.filePath;
  });
}

module.exports = { registerIpcHandlers };
