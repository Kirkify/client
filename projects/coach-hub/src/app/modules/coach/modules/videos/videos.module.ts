import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './components/videos/videos.component';


@NgModule({
  declarations: [VideosComponent],
  imports: [
    CommonModule,
    VideosRoutingModule
  ]
})
export class VideosModule { }
