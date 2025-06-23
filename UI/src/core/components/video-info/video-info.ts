import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-video-info',
  imports: [CommonModule],
  templateUrl: './video-info.html',
  styleUrls: ['./video-info.scss']
})
export class VideoInfo {
  @Input() mediaInfo: any;
  
   formatBitrate(bitRate: string | number | undefined): string {
    const n = Number(bitRate);
    if (!n || isNaN(n)) return '';
    if (n >= 1000000) return (n / 1000000).toFixed(2) + ' Mbps';
    if (n >= 1000) return (n / 1000).toFixed(2) + ' Kbps';
    return n + ' bps';
  }

  formatSize(size: string | number | undefined): string {
    const n = Number(size);
    if (!n || isNaN(n)) return '';
    if (n >= 1024 * 1024 * 1024) return (n / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    if (n >= 1024 * 1024) return (n / (1024 * 1024)).toFixed(2) + ' MB';
    if (n >= 1024) return (n / 1024).toFixed(2) + ' KB';
    return n + ' 字节';
  }
  
}
