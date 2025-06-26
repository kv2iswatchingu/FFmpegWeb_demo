import { ChangeDetectorRef, Component } from '@angular/core';
import { UiButton } from '../../components/ui-button/ui-button';
import { CommonModule } from '@angular/common';
import { VideoInfo } from '../../components/video-info/video-info';
import {
  AspectRatioOptions,
  FormatOptions,
  FramePerSecond,
  RateControlOptions,
  VideoRatesOptions,
  VideoResolutionOptions,
} from './convert-codec';
import { UiForm } from '../../components/ui-form/ui-form';
import { UiSelect } from '../../components/ui-select/ui-select';
import { UiInput } from '../../components/ui-input/ui-input';
import { UiCheckbox } from '../../components/ui-checkbox/ui-checkbox';
import { withDebugTracing } from '@angular/router';

@Component({
  selector: 'app-video-convert',
  imports: [
    UiButton,
    CommonModule,
    VideoInfo,
    UiForm,
    UiSelect,
    UiCheckbox,
    UiInput,
  ],
  templateUrl: './video-convert.html',
  styleUrl: './video-convert.scss',
})
export class VideoConvert {
  inputPath: string = '';
  outputPath: string = '';
  outputFileBaseName: string = ''; // 不带后缀的文件名
  outputFileExt: string = ''; // 当前后缀

  test = true;
  mediaInfo: any = null;
  progress = 0;
  remain = 0;

  formatOptions = FormatOptions;
  videoResolutionOptions = VideoResolutionOptions;
  rateControlOptions = RateControlOptions;
  videoRatesOptions = VideoRatesOptions 
  framePerSecond = FramePerSecond
  aspectRatioOptions = AspectRatioOptions

  changeFormat = false;
  changeResolution = false;
  customResolution= false
  copyStreams = false;
  noRatesLimit = true;
  changeFPS = false;
  pixelAspectRatio = true;

  formData = {
    format: '',
    videoCodec: '',
    audioCodec: '',
    videoResolution: '',
    height: 0,
    width: 0,
    fps: 24,  
    aspectRatio:'',
    rateControl: 'crf',
    crf: 23,
    maxBitrate: 1024,
    minBitrate: 1024,
    bufsize: 1024,
  };

  // 获取格式选项（用于下拉框）
  get formatSelectOptions() {
    const a = this.formatOptions.map((f) => ({
      label: f.format.toUpperCase(),
      value: f.format,
    }));
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

    // 码率控制参数
    // if (this.formData.rateControl === 'crf') {
    //   args.push('-crf', String(this.formData.crf));
    // } else if (this.formData.rateControl === 'vbr') {
    //   args.push('-b:v', `${this.formData.bitrate}k`);
    //   args.push('-maxrate', `${this.formData.bitrate}k`);
    //   args.push('-bufsize', `${this.formData.bitrate * 2}k`);
    // } else if (this.formData.rateControl === 'abr') {
    //   args.push('-b:v', `${this.formData.bitrate}k`);
    // } else if (this.formData.rateControl === 'cbr') {
    //   args.push('-b:v', `${this.formData.bitrate}k`);
    //   args.push('-minrate', `${this.formData.bitrate}k`);
    //   args.push('-maxrate', `${this.formData.bitrate}k`);
    //   args.push('-bufsize', `${this.formData.bitrate * 2}k`);
    // }
    //args.push(this.outputPath);
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
    this.formData.videoCodec = '';
    this.formData.audioCodec = '';
    if (this.outputPath) {
      // 替换 outputPath 的后缀
      this.outputPath = this.outputPath.replace(/\.\w+$/, `.${ext}`);
    } else if (this.outputFileBaseName) {
      // 如果还没选过输出路径，则生成一个默认路径
      this.outputPath = `${this.outputFileBaseName}_out.${ext}`;
    }
    this.cdr.detectChanges();
  }

  setCrfWarning(e:any){
    console.log(e)
    const crfValue = e;
    if(crfValue> 28){
      alert('CRF值过大会导致视频质量下降');
    }else if( crfValue < 18 ){
      alert('CRF值过小会导致视频压缩效率变慢');
    }
  }

  submitToDialog() {
    console.log('????');
  }
}
