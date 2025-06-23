import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrls: ['./icon.scss']
})
export class Icon {
  @Input() name: string = '';
  @Input() size: string = '1em';
  @Input() color: string = 'inherit';

  // 可选：支持自定义svg属性
}