import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {
  progress = 0;
  remain = 0;
  items = [ "my","name", "is", "notitle" ];

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

  async convert() {
    // 这里的路径请根据实际情况获取，比如通过文件选择器
    const inputPath = '/Users/zijian/Desktop/test.png';
    const outputPath = '/Users/zijian/Desktop/test.jpg';
    // @ts-ignore
    const result = await window.electronAPI.convertPngToJpeg(
      inputPath,
      outputPath
    );
    if (result.success) {
      alert('转换成功');
    } else {
      alert('转换失败: ' + result.message);
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
