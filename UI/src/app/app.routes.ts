import { Routes } from '@angular/router';
import { Homepage } from '../core/pages/homepage/homepage';
import { Testpage } from '../core/pages/testpage/testpage';
import { VideoConvert } from '../core/pages/video-convert/video-convert';

export const routes: Routes = [
  { 
    path: '', component: Homepage 
  },
  { 
    path: 'test', component: Testpage 
  },
  {
    path: 'video-convert',component: VideoConvert 
  }
];
