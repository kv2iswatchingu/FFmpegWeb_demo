import { Routes } from '@angular/router';
import { Homepage } from '../core/pages/homepage/homepage';
import { VideoConvert } from '../core/pages/video-convert/video-convert';

export const routes: Routes = [
  { 
    path: '', component: Homepage 
  },
  {
    path: 'video-convert',component: VideoConvert 
  }
];
