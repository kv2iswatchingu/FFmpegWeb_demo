import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-collapse',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapse.html',
  styleUrls: ['./collapse.scss']
})
export class Collapse {
  expanded = false;
  toggle() {
    this.expanded = !this.expanded;
  }
}