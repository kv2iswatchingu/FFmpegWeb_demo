import { ChangeDetectorRef, Component } from '@angular/core';
import { Button } from '../../components/button/button';
import { CommonModule } from '@angular/common';
import { VideoInfo } from '../../components/video-info/video-info';

@Component({
  selector: 'app-video-convert',
   imports: [Button,CommonModule, VideoInfo],
  templateUrl: './video-convert.html',
  styleUrl: './video-convert.scss'
})
export class VideoConvert {
    inputPath: string = '';
  mediaInfo: any = null;
  progress = 0;
  remain = 0;

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
      // @ts-ignore
      this.mediaInfo = await window.electronAPI.getMediaInfo(filePath);
      console.log('Media Info:', this.mediaInfo);
      this.cdr.detectChanges();
    }
  }


  async convert2() {
    const inputPath = '/Users/zijian/Desktop/test.mov';
    const outputPath = '/Users/zijian/Desktop/test.mp4';
    const args = [
      '-y',
      '-i',
      inputPath,
      '-c:v',
      'libx265',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      outputPath,
    ];
    // @ts-ignore
    const result = await window.electronAPI.runFfmpeg(args, inputPath, outputPath);
    if (result.success) {
      alert('转换成功');
    } else {
      alert('转换失败: ' + result.message);
    }
    
  }
}
