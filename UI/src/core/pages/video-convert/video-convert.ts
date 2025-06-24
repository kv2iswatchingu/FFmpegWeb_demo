import { ChangeDetectorRef, Component } from '@angular/core';
import { UiButton } from '../../components/ui-button/ui-button';
import { CommonModule } from '@angular/common';
import { VideoInfo } from '../../components/video-info/video-info';
import { FormatOptions } from './convert-codec';
import { UiForm } from '../../components/ui-form/ui-form';
import { UiSelect } from '../../components/ui-select/ui-select';
import { UiInput } from '../../components/ui-input/ui-input';

@Component({
  selector: 'app-video-convert',
  imports: [UiButton, CommonModule, VideoInfo, UiForm, UiSelect],
  templateUrl: './video-convert.html',
  styleUrl: './video-convert.scss',
})
export class VideoConvert {
  inputPath: string = '';
  outputPath: string = '';
  outputFileBaseName: string = ''; // 不带后缀的文件名
  outputFileExt: string = ''; // 当前后缀

  mediaInfo: any = null;
  progress = 0;
  remain = 0;

  formatOptions = FormatOptions;

  formData = {
    format: '',
    videoCodec: '',
    audioCodec: '',
  };

  // 获取格式选项（用于下拉框）

  get formatSelectOptions() {
    const a = this.formatOptions.map((f) => ({
      label: f.format.toUpperCase(),
      value: f.format,
    }));
    console.log(
      'formatSelectOptions:',
      this.formatOptions,
      this.formData.format
    );
    console.log(a);
    return a;
  }

  // 根据当前格式获取视频编码器选项
  get videoCodecOptions() {
    const fmt = FormatOptions.find((f) => f.format === this.formData.format);
    return fmt
      ? fmt.video.map((v) => ({ label: v.toUpperCase(), value: v }))
      : [];
  }

  // 根据当前格式获取音频编码器选项
  get audioCodecOptions() {
    const fmt = FormatOptions.find((f) => f.format === this.formData.format);
    return fmt
      ? fmt.audio.map((a) => ({ label: a.toUpperCase(), value: a }))
      : [];
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // @ts-ignore
    window.electronAPI.onFfmpegProgress((data) => {
      this.progress = data.percent;
      console.log('Progress:', this.progress);
      console.log('Remain:', data.remain);
      this.remain = data.remain;
      this.cdr.detectChanges();
    });
  }

  async selectInputFile() {
    // @ts-ignore
    const filePath = await window.electronAPI.selectFile();
    if (filePath) {
      this.inputPath = filePath;
      const match = filePath.match(/([^\\/]+)\.(\w+)$/);
      if (match) {
        this.outputFileBaseName = match[1];
        this.outputFileExt = match[2];
        if (!this.formData.format) {
          this.formData.format = match[2]; // 只在首次赋值
        }
      }
      // @ts-ignore
      this.mediaInfo = await window.electronAPI.getMediaInfo(filePath);
      this.cdr.detectChanges();
    }
  }

  async convert2() {
    if (!this.inputPath || !this.outputPath) {
      alert('请选择输入和输出文件');
      return;
    }
    const args = [
      '-y',
      '-i',
      this.inputPath,
      '-c:v',
      'libx264',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      this.outputPath,
    ];
    // @ts-ignore
    const result = await window.electronAPI.runFfmpeg(
      args,
      this.inputPath,
      this.outputPath
    );
    if (result.success) {
      alert('转换成功');
    } else {
      alert('转换失败: ' + result.message);
    }
  }

  async selectOutputFile() {
    const ext = this.formData.format || this.outputFileExt;
    const defaultName = this.outputFileBaseName
      ? `${this.outputFileBaseName}_out.${ext}`
      : `output.${ext}`;
    // @ts-ignore
    const filePath = await window.electronAPI.selectSavePath({
      defaultPath: defaultName,
      filters: [{ name: ext.toUpperCase(), extensions: [ext] }],
    });
    if (filePath) {
      this.outputPath = filePath;
    }
  }

  setExt(ext: string) {
    if (this.outputPath) {
      // 替换 outputPath 的后缀
      this.outputPath = this.outputPath.replace(/\.\w+$/, `.${ext}`);
    } else if (this.outputFileBaseName) {
      // 如果还没选过输出路径，则生成一个默认路径
      this.outputPath = `${this.outputFileBaseName}_out.${ext}`;
    }
    this.cdr.detectChanges();
  }

  submitToDialog() {
    console.log('????');
  }
}
