import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { UiButton } from '../core/components/ui-button/ui-button';
import { UiCollapse } from '../core/components/ui-collapse/ui-collapse';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, UiCollapse,RouterModule, UiButton],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
   items = [ "my","name", "is", "notitle" ];

   layout = [
    {
      title: '视频转换',
      detail: [
        {
          name: '格式转换',
          route: 'video-convert'
        },
        {
          name: '合并'
        },
        //
      ]
    },
    {
      title: '音频转换',
      detail: [
        {
          name: '格式转换',
        },
        {
          name: '合并'
        },
        //
      ]
    },
    {
      title: '图片转换',
      detail: [
        {
          name: '格式转换',
        },
      ]
    },
    {
      title: '其他设置',
      detail: [
        {
          name: 'GPU设置',
        },
        {
          name: '高级选项'
        },
        {
          name:'我觉得你写的太垃圾了我要自己输入命令行'
        },
        {
          name: '关于'
        }
      ]
    }
   ]
}
