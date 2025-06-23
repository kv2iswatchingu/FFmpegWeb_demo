import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.html',
  imports: [CommonModule, Icon, Button],
  styleUrls: ['./dialog.scss'],
  standalone: true
})
export class Dialog {
  @Input() title: string = '提示';
  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  confirmText: string = '确定';
  cancelText: string = '取消';

  onConfirm() {
    this.confirm.emit();
  }
  onClose() {
    this.close.emit();
  }
}
